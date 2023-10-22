import createApiClient from "./api.service";

class RoomService {
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const rooms = (await this.api.get("/rooms")).data;
      return rooms.data;
    } catch (err) {
      console.log(err);
    }
  }
  async getAllByRoomingHouseID(id) {
    try {
      const rooms = (await this.api.get("/rooms?roomingHouseId=" + id)).data;
      return rooms.data;
    } catch (err) {
      console.log(err);
    }
  }
  async getOne(id) {
    try {
      const room = (await this.api.get("/rooms/" + id)).data;
      return room;
    } catch (err) {
      console.log(err);
    }
  }
}

export default new RoomService();