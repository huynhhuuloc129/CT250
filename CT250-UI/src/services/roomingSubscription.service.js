import createApiClient from "./api.service";

class RoomingSubscriptionService {
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getByLessorId(id) {
    try {
      const room = (await this.api.get("/rooming-subcriptions?lessorId="+id)).data;
      return room.data;
    } catch (err) {
      console.log(err);
    }
  }
}

export default new RoomingSubscriptionService();