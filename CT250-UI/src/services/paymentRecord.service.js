import createApiClient from "./api.service";
import axios from 'axios';

class PaymentRecordService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        try {
            const paymentRecords = (await this.api.get(`/payment-records`));
            return paymentRecords.data;
        } catch (err) {
            throw err;
        }
    }
    async getAllByRoomingSubscriptionId(id) {
        try {
            const paymentRecords = (await this.api.get(`/payment-records?roomingSubscriptionId=${id}`));
            return paymentRecords.data;
        } catch (err) {
            throw err;
        }
    }
    async create(roomingSubscriptionId, data, token) {
        return await axios.post(`http://localhost:3000/api/rooming-subscriptions/${roomingSubscriptionId}/payment-records`, data, {
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
        return await axios.patch(`http://localhost:3000/api/payment-records/${id}`, data, {
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

export default new PaymentRecordService();