import createApiClient from "./api.service";

class LessorService {
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getOne(id) {
    try {
      const room = (await this.api.get("/lessors/"+id));
      return room;
    } catch (err) {
      console.log(err);
    }
  }
}

export default new RoomingSubscriptionService();