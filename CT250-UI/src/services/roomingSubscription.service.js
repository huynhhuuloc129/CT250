import createApiClient from "./api.service";

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
      const roomingSubscription = (await this.api.get("/rooming-subscriptions?tenantId=" + id +"&sortOrder=asc")).data;
      return roomingSubscription.data;
    } catch (err) {
      throw err;
    }
  }
  async getByRoomId(id) {
    try {
      const roomingSubscription = (await this.api.get("/rooming-subscriptions?roomId=" + id +"&sortOrder=asc")).data;
      return roomingSubscription.data;
    } catch (err) {
      throw err;
    }
  }
  async getByRoomIdAndStaying(id) {
    try {
      const roomingSubscription = (await this.api.get("/rooming-subscriptions?roomId=" + id +"&sortOrder=asc&state=staying")).data;
      return roomingSubscription.data;
    } catch (err) {
      throw err;
    }
  }
}

export default new RoomingSubscriptionService();