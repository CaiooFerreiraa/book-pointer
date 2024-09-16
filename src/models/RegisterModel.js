import mongoose from 'mongoose';
import Account from '../BaseClasses/AccountCore.js';

const RegisterSchema = new mongoose.Schema({
  titulo: {type: String, required: true},
  autor: {type: String, required: false},
  genero: {type: String, required: false},
  inicio: {type: Date, required: true},
  fim: {type: Date, required: false},
  nota: {type: Number, required: true},
  citacao: {type: String, required: false},
  personagens: {type: String, required: false},
  dono: {type: String, required: true}
})

export const RegisterModel = mongoose.model('books', RegisterSchema);

export default class Register extends Account {
  constructor(body, user) {
    super(body);
    this.user = user;
  }

  async registrar() {
    await this.validate();
    
    if (this.errors.length > 0) return;

    return this.account = await RegisterModel.create(this.body);
  }

  async validate() {
    this.cleanUp();
    this.cleanUser();

    if (!this.body.titulo) this.errorMsg('O título do livro é obrigatório');
    if (!this.body.autor) this.errorMsg('O nome do autor é obrigatório');
    if (!this.body.inicio) this.errorMsg('O inicio da leitura é obrigatório');
    if (await this.compareBook()) this.errorMsg("O livro já foi cadastrado, você pode apenas alteralo");
  }

  cleanUser() {
    const {password, _id, __v, ...detailsUser} = this.user;
    this.user = detailsUser;

    this.body = {
      ...this.body,
      dono: this.user.email
    };
  }

  async compareBook() {
    return this.account = await RegisterModel.findOne({dono: this.user.email, titulo: this.body.titulo});
  }
}
