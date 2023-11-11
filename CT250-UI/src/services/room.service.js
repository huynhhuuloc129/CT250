import createApiClient from "./api.service";
import axios from 'axios';

class RoomService {
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const rooms = (await this.api.get("/rooms?sortOrder=asc&limit=100")).data;
      return rooms.data;
    } catch (err) {
      throw err;
    }
  }
  async getAllByRoomingHouseID(id) {
    try {
      const rooms = (await this.api.get("/rooming-houses/" + id + "/rooms?sortOrder=asc&limit=100")).data;
      return rooms.data;
    } catch (err) {
      throw err;
    }
  }
  async getOne(id) {
    try {
      const room = (await this.api.get("/rooms/" + id)).data;
      return room;
    } catch (err) {
      throw err;
    }
  }
  async create(roomingHouseId, data, token) {
    return await axios.post(`http://localhost:3000/api/rooming-houses/${roomingHouseId}/rooms`, data, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then((res) => {
      return res.data;
    }).catch((err) => {
      throw err
    })
  }
  async delete(roomingHouseId, roomId, token) {
    return await axios.delete(`http://localhost:3000/api/rooming-houses/${roomingHouseId}/rooms/${roomId}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then((res) => {
      return res.data;
    }).catch((err) => {
      throw err
    })
  }
  async update(id, data, token) {
    return await axios.patch(`http://localhost:3000/api/rooms/${id}`, data, {
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

export default new RoomService();