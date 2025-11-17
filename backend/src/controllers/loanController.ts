import { Request, Response } from 'express';
import Loan from '../models/Loan.js';

export const getAllLoans = async (req: Request, res: Response) => {
  try {
    const loans = await Loan.find().populate('userId').populate('bookId');
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero dei prestiti', error });
  }
};

export const createLoan = async (req: Request, res: Response) => {
  try {
    const newLoan = new Loan({
      ...req.body,
      dataPrestito: new Date(),
      dataRestituzione: null
    });
    const savedLoan = await newLoan.save();
    const populatedLoan = await Loan.findById(savedLoan._id)
      .populate('userId')
      .populate('bookId');
    res.status(201).json(populatedLoan);
  } catch (error) {
    res.status(400).json({ message: 'Errore nella creazione del prestito', error });
  }
};

export const returnLoan = async (req: Request, res: Response) => {
  try {
    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      { dataRestituzione: new Date() },
      { new: true }
    ).populate('userId').populate('bookId');
    
    if (!loan) {
      return res.status(404).json({ message: 'Prestito non trovato' });
    }
    res.json(loan);
  } catch (error) {
    res.status(400).json({ message: 'Errore nella restituzione del libro', error });
  }
};

export const deleteLoan = async (req: Request, res: Response) => {
  try {
    const deletedLoan = await Loan.findByIdAndDelete(req.params.id);
    if (!deletedLoan) {
      return res.status(404).json({ message: 'Prestito non trovato' });
    }
    res.json({ message: 'Prestito eliminato con successo' });
  } catch (error) {
    res.status(500).json({ message: 'Errore nell\'eliminazione del prestito', error });
  }
};
