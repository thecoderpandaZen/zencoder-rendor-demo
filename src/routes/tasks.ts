import { Router } from 'express';
import Joi from 'joi';
import { TaskController } from '../controllers/TaskController';
import { validate } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  priority: Joi.string().valid('low', 'medium', 'high').optional(),
  dueDate: Joi.string().isoDate().optional(),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  status: Joi.string().valid('pending', 'in_progress', 'completed').optional(),
  priority: Joi.string().valid('low', 'medium', 'high').optional(),
  dueDate: Joi.string().isoDate().optional(),
});

router.post('/', validate(createTaskSchema), TaskController.createTask);
router.get('/', TaskController.getTasks);
router.get('/status/:status', TaskController.getTasksByStatus);
router.get('/:id', TaskController.getTask);
router.patch('/:id', validate(updateTaskSchema), TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

export default router;
