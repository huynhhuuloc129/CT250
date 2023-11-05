import createApiClient from "./api.service";
import axios from 'axios';

class TempTenantService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        try {
            const tempTenants = (await this.api.get(`/temporary-tenants`));
            return tempTenants.data;
        } catch (err) {
            throw err;
        }
    }
    async getAllByRoomingSubscriptionId(id) {
        try {
            const tempTenants = (await this.api.get(`/temporary-tenants?roomingSubscriptionId=${id}`));
            return tempTenants.data;
        } catch (err) {
            throw err;
        }
    }
    async create(roomId, data, token) {
        return await axios.post(`http://localhost:3000/api/reviews/rooms/${roomId}/me`, data, {
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

export default new TempTenantService();