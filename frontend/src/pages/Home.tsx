import { Box, Container, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container maxWidth="sm">
        <Paper sx={{ p:20, mt: 20 }}>
      <Box sx={{ py: 4}}>
    <div style={{ padding: 16}} >
       <Typography variant="h5" component="h1" gutterBottom align="center">Document Ingestion - Home</Typography>

      <ul>
        <li>
           <Typography variant="body1">
           <Link to="/upload">דף העלאה</Link>     
           </Typography>
        
        </li>
        <li>
        <Typography variant="body1">
        <Link to="/documents">רשימת מסמכים</Link>
           </Typography>
          
        </li>
      </ul>
    </div>
    </Box>
    </Paper>
    </Container>
  );
};

export default Home;