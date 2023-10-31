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
      const roomingSubscription = (await this.api.get("/rooming-subscriptions?tenantId=" + id)).data; //TODO: fix ternant??????
      return roomingSubscription.data;
    } catch (err) {
      throw err;
    }
  }
}

export default new RoomingSubscriptionService();