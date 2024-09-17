import Account from "../BaseClasses/AccountCore.js";
import { RegisterModel } from "./RegisterModel.js";

export default class EditBook extends Account {
  constructor(body) {
    super(body)
  }

  static async updateBook(id, body) {
    const {_csrf, ...restan} = body;
    body = restan;

    return this.account = await RegisterModel.findOneAndUpdate({_id: id}, body, {new: true});
  }

  static async deleteBook(id) {
    await RegisterModel.findOneAndDelete({_id: id});
  }

  static async searchById(id) {
    return this.account = await RegisterModel.findById(id);
  }

  static async find() {
    return await RegisterModel.find();
  }
}