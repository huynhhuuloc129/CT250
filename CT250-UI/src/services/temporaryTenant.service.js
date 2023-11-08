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
    async create(roomingSubscriptionId, data, token) {
        return await axios.post(`http://localhost:3000/api/rooming-subscriptions/${roomingSubscriptionId}/temporary-tenant`, data, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            throw err
        })
    }
    async delete(tempTenantId, token) {
        return await axios.delete(`http://localhost:3000/api/temporary-tenants/${tempTenantId}`, {
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
        return await axios.patch(`http://localhost:3000/api/temporary-tenants/${id}`, data, {
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