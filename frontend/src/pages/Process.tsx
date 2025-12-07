import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetProcessedDataQuery, useGetDocumentStatusQuery } from "../features/files/filesApi";
import { initSocket, getSocket } from "../services/socket/socketClient";

type DocumentStatus = "uploaded" | "processing" | "completed" | "failed" | undefined;

const Process = () => {
  const params = useParams();
  const id = params.id ?? "";
  const { data: rows, isLoading: loadingRows, error: rowsError, refetch } = useGetProcessedDataQuery(id, {
    skip: !id,
  });
  const { data: docStatus } = useGetDocumentStatusQuery(id, {
    skip: !id,
    pollingInterval: 2000,
  });
  const [status, setStatus] = useState<DocumentStatus>(docStatus?.status);

  useEffect(() => setStatus(docStatus?.status), [docStatus]);

  useEffect(() => {
    initSocket();
    const s = getSocket();
    if (!s) return;
    const handler = (payload: { id: string; status: string }) => {
      if (payload.id === id) {
        setStatus(payload.status as DocumentStatus);
        if (payload.status === "completed") {
          refetch();
        }
      }
    };
    s.on("status-update", handler);
    return () => {
      s.off("status-update", handler);
    };
  }, [id, refetch]);

  if (!id)
    return (
      <div style={{ padding: 16 }}>
        לא נבחר document id. <Link to="/upload">העלה קובץ</Link>
      </div>
    );

  return (
    <div style={{ padding: 16 }}>
      <h2>נתונים מעובדים - document {id}</h2>
      <div>סטטוס: {status ?? "טוען..."}</div>

      <div style={{ marginTop: 12 }}>
        {loadingRows && <div>טוען נתונים מעובדים...</div>}
        {rowsError && <div style={{ color: "red" }}>שגיאה בטעינת נתונים</div>}
        {!loadingRows && rows && rows.length === 0 && <div>אין שורות מעובדות להצגה עדיין.</div>}
        {!loadingRows && rows && rows.length > 0 && (
          <div>
            <h3>שורות (JSON):</h3>
            <pre style={{ maxHeight: 400, overflow: "auto", background: "#f6f6f6", padding: 8 }}>
              {JSON.stringify(rows, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div style={{ marginTop: 12 }}>
        <Link to="/documents">חזרה לרשימת מסמכים</Link>
      </div>
    </div>
  );
};

export default Process;