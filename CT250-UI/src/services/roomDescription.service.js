import createApiClient from "./api.service";
import axios from 'axios';

class RoomingDescriptionService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    }
    async getOne(id) {
        try {
            const roomingDescription = (await this.api.get("/room-descriptions/" + id));
            return roomingDescription;
        } catch (err) {
            throw err;
        }
    }
    async create(data, token) {
        return await axios.post(`http://localhost:3000/api/room-descriptions`, data, {
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
        return await axios.patch(`http://localhost:3000/api/room-descriptions/${id}`, data, {
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

export default new RoomingDescriptionService();