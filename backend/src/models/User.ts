import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  nome: string;
  cognome: string;
  genere: string;
  eta: number;
  codiceFiscale?: string;
}

const UserSchema: Schema = new Schema({
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  genere: { type: String, required: true },
  eta: { type: Number, required: true, min: 0 },
  codiceFiscale: { type: String, required: false }
}, {
  timestamps: true,
  collection: 'utenti'
});

export default mongoose.model<IUser>('User', UserSchema);
