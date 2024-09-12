import mongoose from 'mongoose';
import Account from '../BaseClasses/AccountCore.js';
import validator from 'validator';
import bcryptjs from 'bcryptjs';

const LoginSchema = new mongoose.Schema({
  nome: {type: String, required: true},
  sobrenome: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true}
})

const LoginModel = mongoose.model('accounts', LoginSchema);

export class Create extends Account {
  constructor(body) {
    super(body);
  }

  async main() {
    await this.validate();

    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    return this.account = await LoginModel.create(this.body);
  }

  async validate() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email)) this.errors.push('Email inválido');
    if (!await LoginModel.findOne({ email: this.body.email })) this.errors.push('Usuário já existe');
    if (!this.lengthPassword(this.body.password)) this.errors.push('A senha deve ter entre 8 à 20 letras');
  }
}

export class Login extends Account {
  constructor(body) {
    super(body)
  }

  async login() {
    await this.validate();

    if (this.errors.length > 0) return;

    this.account = await LoginModel.findOne({email: this.body.email});
  }

  async validate() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email)) this.errors.push('Email ou senha inválidos');
    if (await this.accountExiste()) this.errors.push('Usuário não existe');
    if (!this.lengthPassword(this.body.password)) this.errors.push('Senha deve ter entre 8 e 20 caracteres');
    if (!bcryptjs.compareSync(this.body.password, this.account.password)) this.errors.push('Email ou senha inválidos');
  }

  async accountExiste() {
    this.account = await LoginModel.findOne({ email: this.body.email });
    return !this.account;
  }
}
