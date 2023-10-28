import createApiClient from "./api.service";

class RoomingHouseService {
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const roomingHouses = (await this.api.get("/rooming-houses")).data;
      return roomingHouses.data;
    } catch (err) {
      return err;
    }
  }
  async getOne(id) {
    try {
      const roomingHouses = (await this.api.get("/rooming-houses/" + id)).data;
      return roomingHouses;
    } catch (err) {
      return err;
    }
  }
  async getByLessorId(id) {
    try {
      const roomingHouse = (await this.api.get("/rooming-houses?lessorId=" + id)).data;
      return roomingHouse.data;
    } catch (err) {
      return err;
    }
  }
}

export default new RoomingHouseService();