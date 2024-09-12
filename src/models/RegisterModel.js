import mongoose from 'mongoose';
import Account from '../BaseClasses/AccountCore.js';

const RegisterSchema = new mongoose.Schema({
  titulo: {type: String, required: true},
  autor: {type: String, required: false},
  genero: {type: String, required: false},
  inicio: {type: Date, required: true},
  fim: {type: Date, required: false},
  avaliacao: {type: Number, required: true},
  melhorCitacao: {type: String, required: false},
  melhoresPersonagens: {type: String, required: false}
})

const RegisterModel = mongoose.model('books', RegisterSchema);

export default class Register extends Account {
  constructor(body) {
    super(body);
  }

  async registrar() {
    this.cleanUp();

    console.log(this.body)
  }
}
