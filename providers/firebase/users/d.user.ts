import { Timestamp } from 'firebase/firestore';

class User {
  name: string;
  state: string;
  country: string;
  createDate: any;

  constructor(name: string, state: string, country: string) {
    this.name = name;
    this.state = state;
    this.country = country;
    this.createDate = Timestamp.fromDate(new Date());
  }
  getInfo() {
    return this.name + ', ' + this.state + ', ' + this.country;
  }
}

export default User;
