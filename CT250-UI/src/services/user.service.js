import createApiClient from "./api.service";
import axios from 'axios';

class UserService {
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async login(data) {
    try {
      const resp = await this.api.post("/auth/login", data);
      return resp.data;
    } catch (err) {
      throw new Error("Sai tên tài khoản hoặc mật khẩu!");
    }
  }
  async getOneTenant(tenantId) {
    try {
      const tenant = (await this.api.get("/tenants/" + tenantId)).data;
      return tenant;
    } catch (err) {
      throw err;
    }
  }
  async getOneTenantByUserId(userId) {
    try {
      return (await this.api.get(`/tenants?userId=${userId}`)).data;
    } catch (error) {
      throw error;

    }
  }
  async getOneLessor(id) {
    try {
      return (await this.api.get(`/lessors/${id}`)).data;
    } catch (error) {
      return error;
    }
  }
  async getCurrentUser(token) {
    return await axios.get("http://localhost:3000/api/users/me", {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then((res) => {
      return res.data;
    }).catch((err) => {
      throw err
    })
  }
  async signUpLessor(data) {
    try {
      return await this.api.post("/auth/signup-lessor", data);
    } catch (err) {
      throw err
    }
  }
  async signUpTenant(data) {
    try {
      return await this.api.post("/auth/signup-tenant", data);
    } catch (err) {
      throw err
    }
  }
  async updateUser(id, data, token) {
    return await axios.patch(`http://localhost:3000/api/users/${id}`, data, {
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

export default new UserService();