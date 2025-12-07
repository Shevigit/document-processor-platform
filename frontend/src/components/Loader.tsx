const Loader = ({ text = "טוען..." }: { text?: string }) => {
  return <div style={{ padding: 8 }}>{text}</div>;
};

export default Loader;