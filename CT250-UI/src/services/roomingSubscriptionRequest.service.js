import createApiClient from "./api.service";
import axios from 'axios';

class RoomingSubscriptionReqService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        try {
            const roomingSubscriptionReq = (await this.api.get("/rooming-subcription-requests?sortOrder=asc")).data;
            return roomingSubscriptionReq.data;
        } catch (err) {
            throw err;
        }
    }
    async getAllByRoomId(roomId) {
        try {
            const roomingSubscriptionReq = (await this.api.get("/rooming-subcription-requests?sortOrder=asc&roomId=" + roomId)).data;
            return roomingSubscriptionReq.data;
        } catch (err) {
            throw err;
        }
    }
    async create(roomingHouseId, roomId, token) {
        return await axios.post(`http://localhost:3000/api/rooming-houses/${roomingHouseId}/rooms/${roomId}/rooming-subscription-request`, "", {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            throw err
        })
    }
    async update(roomingHouseId, roomId, rsrId, state, token) {
        return await axios.patch(`http://localhost:3000/api/rooming-houses/${roomingHouseId}/rooms/${roomId}/rooming-subscription-request/${rsrId}`, {
            state: state
        }, {
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

export default new RoomingSubscriptionReqService();