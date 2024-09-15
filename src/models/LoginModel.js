import mongoose from 'mongoose';
import Account from '../BaseClasses/AccountCore.js';
import validator from 'validator';
import bcryptjs from 'bcryptjs';

const LoginSchema = new mongoose.Schema({
  nome: {type: String, required: true},
  sobrenome: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  super: {type: Boolean, required: false}
})

const LoginModel = mongoose.model('accounts', LoginSchema);

export class Create extends Account {
  constructor(body) {
    super(body);
  }

  async main() {
    await this.validate();
    // this.isSuperUser();

    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    return this.account = await LoginModel.create(this.body);
  }

  async validate() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email) || !this.body.email) this.errorMsg('Email inválido')
    if (await this.accountExist()) this.errors.push('Usuário já existe');
    if (!this.lengthPassword(this.body.password) || !this.body.password) this.errors.push('A senha deve ter entre 8 à 20 letras');
  }
  
  async accountExist() {
    return this.account = await LoginModel.findOne({ email: this.body.email})
  }

  //Faz a verificação se esse usário é um super usuário
  // isSuperUser() {
  //   for (const user of this.superUser) {
  //     if (this.body.email == user) return this.body = {...this.body, super: true};
  //   }
  // }
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
    if (!this.body.password) return this.errors.push('Email ou senha inválidos')
    if (!this.lengthPassword(this.body.password)) return this.errors.push('Senha deve ter entre 8 e 20 caracteres');
    if (!await this.accountExist()) this.errors.push('Usuário não existe');
    if (!bcryptjs.compareSync(this.body.password, this.account.password)) this.errors.push('Email ou senha inválidos');
  }

  async accountExist() {
    return this.account = await LoginModel.findOne({ email: this.body.email });
  }
}
