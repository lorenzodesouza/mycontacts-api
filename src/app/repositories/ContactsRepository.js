const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),// 'uuid -> Universal Unique ID'
    name: 'Lorenzo',
    email: 'lorenzo@email.com',
    phone: '123123123',
    category_id: v4(),
  },
  {
    id: v4(),// 'uuid -> Universal Unique ID'
    name: 'Joao',
    email: 'joao@email.com',
    phone: '321321321',
    category_id: v4(),
  }
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }
  findById(id) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.id === id),
    ));
  }
  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

module.exports = new ContactsRepository();
