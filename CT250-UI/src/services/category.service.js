import createApiClient from "./api.service";

class CategoryService {
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const categories = (await this.api.get("/categories?sortOrder=asc"));
      return categories.data;
    } catch (err) {
      throw err;
    }
  }

  async getOne(id) {
    try {
      const category = (await this.api.get("/categories/" + id)).data;
      return category;
    } catch (err) {
      throw err;
    }
  }
}

export default new CategoryService();