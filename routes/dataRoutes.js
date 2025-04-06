const express = require('express');
const router = express.Router();
const controller = require('../controllers/dataController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validateCreate, validateUpdate } = require('../middlewares/validationMiddleware');

// Rotas protegidas por autenticação JWT
router.get('/', authMiddleware, controller.getAll);
router.get('/:id', authMiddleware, controller.getOne);
router.post('/', authMiddleware, validateCreate, controller.create);
router.put('/:id', authMiddleware, validateUpdate, controller.update);
router.delete('/:id', authMiddleware, controller.remove);

module.exports = router;