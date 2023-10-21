import createApiClient from "./api.service";
import axios from 'axios';

class UserService {
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async login(data) {
     try {
      const resp =  await this.api.post("/auth/login", data);
      return resp.data;
    } catch (err) {
      alert(err);
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
  async getOneLessor(id) {
    try {
      return (await this.api.get(`/lessors/:${id}`)).data;
    } catch (error) {
      alert(err);
    }
  }
  async getCurrentUser(token) {
    return await axios.get("http://localhost:3000/api/users/me", {
      headers: {
        Authorization: token
      }
      }).then((res) => {
          return res.data;
    }).catch ((err) => {
     return err
    })
  }
  async signUpLessor(data) {
    try {
      return await this.api.post("/auth/signup-lessor", data);
    } catch (err) {
      console.log(err);
    }
  }
  async signUpTenant(data) {
    try {
      return await this.api.post("/auth/signup-tenant", data);
    } catch (err) {
      alert(err);
    }
  }
  async updateUser(data, token){
    return await axios.patch("http://localhost:3000/api/users/" + data.id, {
      headers: {
        Authorization: token
      }
      }).then((res) => {
          return res.data;
    }).catch ((err) => {
      console.log(err)
    })
  }
}

export default new UserService();