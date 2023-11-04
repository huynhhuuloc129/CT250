import createApiClient from "./api.service";
import axios from 'axios';

class ReviewService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    }
    async getAllByRoomId(roomId) {
        try {
            const roomReview = (await this.api.get(`/reviews/rooms/${roomId}`));
            return roomReview;
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

export default new ReviewService();