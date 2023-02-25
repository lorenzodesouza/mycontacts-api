const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(request, response) {
    const categories = await CategoryRepository.findAll();

    response.json(categories);
  }

  async show(request, response) {
    const { id } = request.params;

    const category = await CategoryRepository.findById(id);

    if (!category) {
      // 404: not found (usuario nao encontrado)
      return response.status(404).json({ erro: 'Category not found' });
    }

    response.json(category);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ erro: 'name is required' });
    }

    const category = await CategoryRepository.create({ name });

    response.json(category);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const CategoryExist = await CategoryRepository.findById(id);

    if (!CategoryExist) {
      return response.status(400).json({ erro: 'This category not exist!' });
    }

    if (!name) {
      return response.status(400).json({ erro: 'Name is required' });
    }

    const category = await CategoryRepository.update(id, { name });

    response.json(category);
  }

  async delete(request, response) {
    const { id } = request.params;

    await CategoryRepository.delete(id);
    // 204: no content (deu certo, mas nao tem nenhum conteudo no corpo)
    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
