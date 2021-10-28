export default class FriendClass {
  id: String;
  firstName: String;
  lastName: String;
  gender: String;
  email: String;
  age: Number;
  contacts: any;

  constructor(id: String, { firstName, lastName, gender, email, age, contacts }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.email = email;
    this.age = age;
    this.contacts = contacts;
  }
}
