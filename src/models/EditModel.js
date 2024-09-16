import Account from "../BaseClasses/AccountCore.js";
import { RegisterModel } from "./RegisterModel.js";

export default class EditBook extends Account {
  constructor(body) {
    super(body)
  }

  async edit() {
    console.log(await this.searchById());
  }

  async searchById() {
    return this.account = await RegisterModel.findById(this.body.id);
  }
}