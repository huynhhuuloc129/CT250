import createApiClient from "./api.service";
import axios from 'axios';

class NotificationService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        try {
            const notifications = (await this.api.get("/notifications?sortOrder=desc&limit=100"));
            return notifications.data;
        } catch (err) {
            throw err;
        }
    }
    async getAllByRoomingHouseId(roomingHouseId) {
        try {
            const notifications = (await this.api.get("/notifications?sortOrder=desc&limit=100&roomingHouseId=" + roomingHouseId));
            return notifications.data;
        } catch (err) {
            throw err;
        }
    }
    async getAllByRoomId(roomId) {
        try {
            const notifications = (await this.api.get("/notifications?sortOrder=desc&limit=100&roomId=" + roomId));
            return notifications.data;
        } catch (err) {
            throw err;
        }
    }
    async getOne(notificationId) {
        try {
            const notification = (await this.api.get("/notifications/" + notificationId)).data;
            return notification;
        } catch (err) {
            throw err;
        }
    }
    async create(data, token) {
        return await axios.post(`http://localhost:3000/api/notifications`, data, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            throw err
        })
    }
    async delete(notificationId, token) {
        return await axios.delete(`http://localhost:3000/api/notifications/${notificationId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            throw err
        })
    }
    async update(notificationId, data, token) {
        return await axios.patch(`http://localhost:3000/api/notifications/${notificationId}`, data, {
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

export default new NotificationService();