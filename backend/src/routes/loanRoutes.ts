import express from 'express';
import {
  getAllLoans,
  createLoan,
  returnLoan,
  deleteLoan
} from '../controllers/loanController.js';

const router = express.Router();

router.get('/', getAllLoans);
router.post('/', createLoan);
router.put('/:id/return', returnLoan);
router.delete('/:id', deleteLoan);

export default router;
