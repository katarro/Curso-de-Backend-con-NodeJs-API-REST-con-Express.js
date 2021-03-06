const express = require('express');
const router = express.Router();
const UsersService = require('../services/users');
const service = new UsersService();
const validatorHandler = require('../middlewares/validator.handler');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('../schemas/users');

// GET: PARAMETROS query (DINAMICOS)
router.get('/', (req, res) => {
  // limit y offset son OPCIONALES
  const { limit, offset } = req.query;
  const users = service.find(limit, offset);
  res.json(users);
});

// Método GET
router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.finOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

// Método POST
router.post('/', validatorHandler(createUserSchema, 'body'), (req, res) => {
  const body = req.body;
  const NewUser = service.create(body);
  res.status(201).json(NewUser);
});

// Método DELETE
router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedUser = service.delete(id);
      res.json(deletedUser);
    } catch (error) {
      next(error);
    }
  }
);

//Método PATCH
router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = service.update(id, body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
