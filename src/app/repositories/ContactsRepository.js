const { v4 } = require('uuid');

const db = require('../../database/index');

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
  findByEmail(email) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.email === email),
    ));
  }
  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
  async create({ name, email, phone, category_id }) {
    const [row] = await db.query(`
    INSERT INTO contacts(name, email, phone, category_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [name, email, phone, category_id]);

    return row;
  }
}

module.exports = new ContactsRepository();
