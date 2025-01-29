import express from 'express';
import {
  addGadget,
  deleteGadget,
  destroyGadget,
  filterGadgets,
  listGadgets,
  updateGadget,
} from '../controllers/gadgetController.js';
import authMiddleware from '../middleware/auth.js';

const gadgetRouter = express.Router();

gadgetRouter.get('/', listGadgets);
gadgetRouter.post('/filter', filterGadgets);
gadgetRouter.post('/', authMiddleware, addGadget);
gadgetRouter.patch('/', authMiddleware, updateGadget);
gadgetRouter.delete('/', authMiddleware, deleteGadget);
gadgetRouter.post('/self-destruct', authMiddleware, destroyGadget);

export default gadgetRouter;
