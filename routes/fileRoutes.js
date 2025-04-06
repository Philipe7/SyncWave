const express = require('express');
const multer = require('multer');
const path = require('path');
const fileController = require('../controllers/fileController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router(); // Adicionando a inicialização do router

// Configuração do multer para uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

// Limite de tamanho do arquivo (10MB)
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('application/')) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não suportado'), false);
    }
  }
});

// Rotas protegidas por autenticação JWT
router.get('/', authMiddleware, fileController.listFiles);
router.post('/', authMiddleware, upload.single('file'), fileController.uploadFile);
router.get('/:id/download', authMiddleware, fileController.downloadFile);
router.delete('/:id', authMiddleware, fileController.deleteFile);

module.exports = router;
