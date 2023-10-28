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
      return err;
    }
  }
  async getAllByRoomingHouseID(id) {
    try {
      const rooms = (await this.api.get("/rooming-houses/"+id+"/rooms")).data;
      return rooms.data;
    } catch (err) {
      return err;
    }
  }
  async getOne(id) {
    try {
      const room = (await this.api.get("/rooms/" + id)).data;
      return room;
    } catch (err) {
      return err;
    }
  }
}

export default new RoomService();