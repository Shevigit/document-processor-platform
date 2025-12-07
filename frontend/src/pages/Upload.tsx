import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useUploadFileMutation } from '../features/files/filesApi';

const Upload = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadFile, { isLoading: loading, isSuccess, data, error }] = useUploadFileMutation();
  const [errorState, setErrorState] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    if (!selectedFile.name.endsWith('.xlsx')) {
      setErrorState('Only .xlsx files are allowed');
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setErrorState(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorState('Please select a file first');
      return;
    }

    setErrorState(null);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await uploadFile(fd).unwrap();
      setFile(null);
      // navigate to process page
      navigate(`/process/${res.id}`);
    } catch (e: any) {
      setErrorState(e?.data?.error || e?.message || 'Upload failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Upload Excel File
        </Typography>

        <Paper sx={{ p: 3, mt: 3 }}>
          <Box
            sx={{
              border: '2px dashed #ccc',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
              '&:hover': {
                borderColor: '#1976d2',
                backgroundColor: '#f5f5f5',
              },
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <CloudUploadIcon sx={{ fontSize: 48, color: '#1976d2', mb: 1 }} />
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            <Typography variant="body1">
              {file ? file.name : 'Click to select an Excel file (.xlsx)'}
            </Typography>
          </Box>

          {errorState && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorState}
            </Alert>
          )}
          {isSuccess && data && (
            <Alert severity="success" sx={{ mt: 2 }}>
              File uploaded successfully! Document ID: {data.id}
            </Alert>
          )}

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!file || loading}
            sx={{ mt: 3 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Upload'}
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Upload;