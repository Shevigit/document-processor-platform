const StatusBadge = ({ status = "unknown" }: { status?: string }) => {
  const color =
    status === "uploaded"
      ? "#6c757d"
      : status === "processing"
      ? "#0a84ff"
      : status === "completed"
      ? "#198754"
      : status === "failed"
      ? "#dc3545"
      : "#666";

  return (
    <span style={{ color: "#fff", background: color, padding: "4px 8px", borderRadius: 6 }}>
      {status}
    </span>
  );
};

export default StatusBadge;