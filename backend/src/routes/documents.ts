import { Router } from 'express';
import upload from '../config/multer.js';
import {
  uploadDocument,
  getDocumentStatus,
  getProcessedData,
  getDocuments,
} from '../controllers/documentController.js';

const router = Router();

/**
 * POST /api/documents/upload
 * Upload an Excel file and create a document record
 */
router.post('/upload', upload.single('file'), uploadDocument);

/**
 * GET /api/documents
 * List documents
 */
router.get('/', getDocuments);

/**
 * GET /api/documents/status/:id
 * Get the current status of a document
 */
router.get('/status/:id', getDocumentStatus);

/**
 * GET /api/documents/:id/data
 * Get processed data for a document
 */
router.get('/:id/data', getProcessedData);

export default router;
