import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ padding: 16 }}>
      <h1>Document Ingestion - Home</h1>
      <ul>
        <li>
          <Link to="/upload">דף העלאה</Link>
        </li>
        <li>
          <Link to="/documents">רשימת מסמכים</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;