import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetDocumentsQuery } from "../features/files/filesApi";
import StatusBadge from "../components/StatusBadge";
import { initSocket, getSocket } from "../services/socket/socketClient";

const Documents = () => {
  const { data: docs, isLoading, error, refetch } = useGetDocumentsQuery();
  const [localDocs, setLocalDocs] = useState(docs ?? []);

  useEffect(() => {
    setLocalDocs(docs ?? []);
  }, [docs]);

  useEffect(() => {
    initSocket();
    const s = getSocket();
    if (!s) return;
    const handler = (payload: { id: string; status: "uploaded" | "processing" | "completed" | "failed" }) => {
      setLocalDocs((prev) =>
        prev.map((d) => (d.id === payload.id ? { ...d, status: payload.status } : d))
      );
    };
    s.on("status-update", handler);
    return () => {
      s.off("status-update", handler);
    };
  }, []);

  if (isLoading) return <div style={{ padding: 16 }}>טוען...</div>;
  if (error) return <div style={{ color: "red", padding: 16 }}>שגיאה בטעינת מסמכים</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>רשימת המסמכים</h2>
      <button onClick={() => refetch()}>ריענון</button>
      <table style={{ width: "100%", marginTop: 12, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>שם קובץ</th>
            <th style={{ textAlign: "left" }}>זמן העלאה</th>
            <th style={{ textAlign: "left" }}>סטטוס</th>
            <th style={{ textAlign: "left" }}>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {(localDocs ?? []).map((d) => (
            <tr key={d.id}>
              <td>{d.filename}</td>
              <td>{d.upload_time ? new Date(d.upload_time).toLocaleString() : "-"}</td>
              <td>
                <StatusBadge status={d.status} />
              </td>
              <td>
                <Link to={`/process?id=${d.id}`}>הצג נתונים</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Documents;