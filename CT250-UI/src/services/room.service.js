import createApiClient from "./api.service";

class RoomService {
  constructor(baseUrl = "http://localhost:3000/api/rooms") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const rooms = (await this.api.get("/")).data;
      return rooms.data;
    } catch (err) {
      console.log(err);
    }
  }
  async getOne(id) {
    try {
      const room = (await this.api.get("/"+id)).data;
      return room;
    } catch (err) {
      console.log(err);
    }
  }
}

export default new RoomService();