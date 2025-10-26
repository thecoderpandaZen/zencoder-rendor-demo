import { Router } from 'express';
import Joi from 'joi';
import { AuthController } from '../controllers/AuthController';
import { validate } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = Router();

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);
router.get('/profile', authenticateToken, AuthController.getProfile);

export default router;
