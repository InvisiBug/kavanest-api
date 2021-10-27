export default class FriendClass {
  id: Number;
  firstName: String;
  lastName: String;
  gender: String;
  email: String;

  constructor(id: Number, { firstName, lastName, gender, email }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.email = email;
  }
}
