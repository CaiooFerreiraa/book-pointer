export default class Account {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.account = null;
  }

  cleanUp() {
    for (const key in this.body) {
      if(typeof key !== 'string') {
        key = ''
      }
    }

    const {_csrf, ...accountDetails} = this.body;

    this.body = accountDetails;
  }

  lengthPassword(password) {
    return password.length >= 8 && password.length <= 20;
  }
}
