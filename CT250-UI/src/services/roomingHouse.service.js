import createApiClient from "./api.service";
import axios from 'axios';

class RoomingHouseService {
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const roomingHouses = (await this.api.get("/rooming-houses?sortOrder=asc")).data;
      return roomingHouses.data;
    } catch (err) {
      throw err;
    }
  }
  async getOne(id) {
    try {
      const roomingHouses = (await this.api.get("/rooming-houses/" + id)).data;
      return roomingHouses;
    } catch (err) {
      throw err;
    }
  }
  async getByLessorId(id) {
    try {
      const roomingHouse = (await this.api.get("/rooming-houses?lessorId=" + id + "&sortOrder=asc")).data;
      return roomingHouse.data;
    } catch (err) {
      throw err;
    }
  }
  async create(data, token) {
    // var header = {
    // }
    return await axios.post("http://localhost:3000/api/rooming-houses", data, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then((res) => {
      return res.data;
    }).catch((err) => {
      throw err
    })
  }
  async update(roomingHouseId, data, token) {
    return await axios.patch(`http://localhost:3000/api/rooming-houses/${roomingHouseId}`, data, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then((res) => {
      return res.data;
    }).catch((err) => {
      throw err
    })
  }
  async delete(roomingHouseId, token) {
    return await axios.delete(`http://localhost:3000/api/rooming-houses/${roomingHouseId}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then((res) => {
      return res.data;
    }).catch((err) => {
      throw err
    })
  }
}

export default new RoomingHouseService();