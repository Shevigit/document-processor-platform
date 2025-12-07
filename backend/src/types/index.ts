export interface Document {
  id: string;
  filename: string;
  filepath: string;
  upload_time: string;
  status: 'uploaded' | 'processing' | 'completed' | 'failed';
}

export interface ProcessedData {
  id: number;
  document_id: string;
  row_data: Record<string, any>;
  inserted_at: string;
}

export interface StatusResponse {
  id: string;
  filename: string;
  status: string;
  upload_time: string;
}

export interface UploadResponse {
  id: string;
  filename: string;
  status: string;
}

export interface DataResponse {
  document_id: string;
  data: Array<Record<string, any>>;
}
