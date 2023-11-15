import createApiClient from "./api.service";
import axios from 'axios';

class UtilityService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        try {
            const utilities = (await this.api.get(`/utility`));
            return utilities.data;
        } catch (err) {
            throw err;
        }
    }
    async getOne(id) {
        try {
            const utilities = (await this.api.get(`/utility/${id}`));
            return utilities.data;
        } catch (err) {
            throw err;
        }
    }
    // async create(roomId, data, token) {
    //     return await axios.post(`http://localhost:3000/api/reviews/rooms/${roomId}/me`, data, {
    //         headers: {
    //             Authorization: 'Bearer ' + token
    //         }
    //     }).then((res) => {
    //         return res.data;
    //     }).catch((err) => {
    //         throw err
    //     })
    // }
}

export default new UtilityService();