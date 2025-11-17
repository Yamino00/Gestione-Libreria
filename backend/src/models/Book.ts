import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  titolo: string;
  autore: string;
  anno: number;
  genere: string;
  isbn: string;
}

const BookSchema: Schema = new Schema({
  titolo: { type: String, required: true },
  autore: { type: String, required: true },
  anno: { type: Number, required: true },
  genere: { type: String, required: true },
  isbn: { type: String, required: true, unique: true }
}, {
  timestamps: true,
  collection: 'libri'
});

export default mongoose.model<IBook>('Book', BookSchema);
