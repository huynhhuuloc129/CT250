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
  async getOneTenant(token) {
    // return await axios.get("http://localhost:3000/api/tenants/me", {
    //   headers: {
    //     Authorization: token
    //   }
    //   }).then((res) => {
    //       return res.data;
    // }).catch ((err) => {
    //   console.log(err)
    // })
  }
  async getOneTenantByUserId(userId) {
    try {
      return (await this.api.get(`/tenants?userId=${userId}`)).data;
    } catch (error) {
      return error;

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
        Authorization: token
      }
    }).then((res) => {
      return res.data;
    }).catch((err) => {
      return err
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
      return err;

    }
  }
  async updateUser(id, data, token) {
    return await this.api.patch("/users/" + id, data);

    // return await axios.patch("http://localhost:3000/api/users/" + data.id, {
    //   headers: {
    //     Authorization: token
    //   }
    //   }).then((res) => {
    //       return res.data;
    // }).catch ((err) => {
    //   console.log(err)
    // })
  }
}

export default new UserService();