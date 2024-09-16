import Account from "../BaseClasses/AccountCore.js";
import { LoginModel } from "./LoginModel.js";
import validator from "validator";

export default class UpdateUser extends Account{
  constructor(body) {
    super(body)
  }

  async update() {
    await this.validate();

    if (this.errors.length > 0) return;

    this.body.add && await LoginModel.findOneAndUpdate({email: this.body.emailAd}, {super: true});
    this.body.remove && await LoginModel.findOneAndUpdate({email: this.body.emailAd}, {super: false});
  }

  async validate() {
    this.cleanUp();
    await this.searchUser();

    if (!validator.isEmail(this.body.emailAd) || !this.body.emailAd) return this.errorMsg('Email inválido');
    if (this.checkDoubleCheckbox()) return this.errorMsg('Escolha uma opção para atualizar o usuário');
    if (!await this.searchUser()) this.errorMsg('A conta não está cadastrada');
    if (this.account.super === true && this.body.add) this.errorMsg('O usuário já tem o super user');
    if (this.account.super === false && this.body.remove) this.errorMsg('O usuário já não conta com o super user');
  }

  checkDoubleCheckbox() {
    return this.body.add === this.body.remove;
  }

  async searchUser() {
    return this.account = await LoginModel.findOne({email: this.body.emailAd});
  }

}