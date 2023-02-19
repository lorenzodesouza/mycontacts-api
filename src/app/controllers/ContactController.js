const { response } = require('express');
const ContactsRepository = require('../repositories/ContactsRepository')

class ContactController {
  async index(request, response) {
    // Listar todos os registros
    const contacts = await ContactsRepository.findAll();

    response.json(contacts);
  }

  async show(request, response) {
    // Obter um registro
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: not found (usuario nao encontrado)
      return response.status(404).json({ erro: 'User not found' });
    }

    response.json(contact);
  }

  store() {
    // Criar novo registro
  }

  update() {
    // Editar um registro
  }

  async delete(request, response) {
    // Deletar um registro
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: not found (usuario nao encontrado)
      return response.status(404).json({ erro: 'User not found' });
    }

    await ContactsRepository.delete(id);
    // 204: no content (deu certo, mas nao tem nenhum conteudo no corpo)
    response.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
