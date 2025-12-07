import type { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import pool from '../config/database.js';
import { emitStatusUpdate } from '../config/socket.js';
import type { UploadResponse, StatusResponse, DataResponse } from '../types/index.js';

export const uploadDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file provided' });
      return;
    }

    const documentId = uuidv4();
    const filepath = path.join('/uploads', req.file.filename);

    // Insert document record with 'uploaded' status
    await pool.query(
      'INSERT INTO documents (id, filename, filepath, status) VALUES ($1, $2, $3, $4)',
      [documentId, req.file.originalname, filepath, 'uploaded']
    );

    // Emit event to notify that a document was uploaded
    emitStatusUpdate(documentId, 'uploaded');

    const response: UploadResponse = {
      id: documentId,
      filename: req.file.originalname,
      status: 'uploaded'
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
};

export const getDocumentStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT id, filename, status, upload_time FROM documents WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Document not found' });
      return;
    }

    const doc = result.rows[0];
    const response: StatusResponse = {
      id: doc.id,
      filename: doc.filename,
      status: doc.status,
      upload_time: doc.upload_time
    };

    res.json(response);
  } catch (error) {
    console.error('Status error:', error);
    res.status(500).json({ error: 'Failed to get status' });
  }
};

export const getProcessedData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT row_data, inserted_at FROM processed_data WHERE document_id = $1 ORDER BY id ASC',
      [id]
    );

    const response: DataResponse = {
      document_id: id ?? '',
      data: (result.rows as any[]).map((row: any) => ({
        ...row.row_data,
        inserted_at: row.inserted_at
      }))
    };

    res.json(response);
  } catch (error) {
    console.error('Data error:', error);
    res.status(500).json({ error: 'Failed to get data' });
  }
};

export const getDocuments = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query(
      'SELECT id, filename, status, upload_time FROM documents ORDER BY upload_time DESC'
    );

    const documents = result.rows.map((row: any) => ({
      id: row.id,
      filename: row.filename,
      status: row.status,
      upload_time: row.upload_time,
    }));

    res.json(documents);
  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({ error: 'Failed to get documents' });
  }
};
