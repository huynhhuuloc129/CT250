import createApiClient from "./api.service";
import axios from 'axios';

class ReviewService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    }
    async getAllByRoomId(roomId) {
        try {
            const roomReview = (await this.api.get(`/reviews/rooms/${roomId}`));
            return roomReview.data;
        } catch (err) {
            throw err;
        }
    }
    async getMyReview(token) {
        return await axios.get(`http://localhost:3000/api/reviews/me`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            throw err
        })
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
    async update(reviewId, data, token) {
        return await axios.patch(`http://localhost:3000/api/reviews/${reviewId}/me`, data, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            throw new Error("Comment phải dài hơn 2 ký tự")
        })
    }
}

export default new ReviewService();