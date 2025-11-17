import mongoose, { Schema, Document } from 'mongoose';

export interface ILoan extends Document {
  userId: mongoose.Types.ObjectId;
  bookId: mongoose.Types.ObjectId;
  dataPrestito: Date;
  dataRestituzione: Date | null;
}

const LoanSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  dataPrestito: { type: Date, required: true, default: Date.now },
  dataRestituzione: { type: Date, default: null }
}, {
  timestamps: true,
  collection: 'prestiti'
});

export default mongoose.model<ILoan>('Loan', LoanSchema);
