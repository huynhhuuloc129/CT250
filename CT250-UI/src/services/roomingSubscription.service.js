import createApiClient from "./api.service";
import axios from 'axios';

class RoomingSubscriptionService {
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getOne(id) {
    try {
      const roomingSubscription = (await this.api.get("/rooming-subscriptions/" + id)).data;
      return roomingSubscription;
    } catch (err) {
      throw err;
    }
  }
  async getByTenantId(id) {
    try {
      const roomingSubscription = (await this.api.get("/rooming-subscriptions?tenantId=" + id + "&sortOrder=asc")).data;
      return roomingSubscription.data;
    } catch (err) {
      throw err;
    }
  }
  async getByRoomId(id) {
    try {
      const roomingSubscription = (await this.api.get("/rooming-subscriptions?roomId=" + id + "&sortOrder=asc")).data;
      return roomingSubscription.data;
    } catch (err) {
      throw err;
    }
  }
  async getByTenantIdAndRoomId(tenantId, roomId) {
    try {
      const roomingSubscription = (await this.api.get("/rooming-subscriptions?roomId=" + roomId + "&tenantId=" + tenantId + "&sortOrder=asc")).data;
      return roomingSubscription.data;
    } catch (err) {
      throw err;
    }
  }
  async getByRoomIdAndStaying(id) {
    try {
      const roomingSubscription = (await this.api.get("/rooming-subscriptions?roomId=" + id + "&sortOrder=asc&state=staying")).data;
      return roomingSubscription.data;
    } catch (err) {
      throw err;
    }
  }
  async getByRoomIdAndWantLeave(id) {
    try {
      const roomingSubscription = (await this.api.get("/rooming-subscriptions?roomId=" + id + "&sortOrder=asc&state=want_leave")).data;
      return roomingSubscription.data;
    } catch (err) {
      throw err;
    }
  }
  async update(roomingHouseId, roomId, rsId, data, token) {
    return await axios.patch(`http://localhost:3000/api/rooming-houses/${roomingHouseId}/rooms/${roomId}/rooming-subscription/${rsId}`, data, {
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

export default new RoomingSubscriptionService();