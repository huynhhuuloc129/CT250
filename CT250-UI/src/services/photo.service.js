import createApiClient from "./api.service";
import axios from 'axios';

class PhotoService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    }
    async uploadRoomPhoto(roomId, data, token) {
        return await axios.post(`http://localhost:3000/api/photos/room/${roomId}`, data, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            throw err
        })
    }
    async uploadRoomingHousePhoto(roomingHouseId, data, token) {
        return await axios.post(`http://localhost:3000/api/photos/rooming-houses/${roomingHouseId}`, data, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            throw err
        })
    }
    async uploadUtilityPhoto(utilityId, data, token) {
        return await axios.post(`http://localhost:3000/api/photos/utilities/${utilityId}`, data, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            throw err
        })
    }
    async removeUtilityPhoto(utilityId, token) {
        return await axios.delete(`http://localhost:3000/api/photos/utilities/${utilityId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            throw err
        })
    }
    async removeRoomPhoto(photoId, token) {
        return await axios.delete(`http://localhost:3000/api/photos/${photoId}/room`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            if (err.response.status != 404) throw err
        })
    }
    async removeRoomingHousePhoto(photoId, token) {
        return await axios.delete(`http://localhost:3000/api/photos/${photoId}/rooming-houses`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            if (err.response.status != 404) throw err
        })
    }
    async userUploadPhoto(data, token) {
        return await axios.post(`http://localhost:3000/api/photos/users`, data, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            throw err
        })
    }
    async userRemovePhoto(token) {
        return await axios.delete(`http://localhost:3000/api/photos/users`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            if (err.response.status != 500) throw err
        })
    }
}

export default new PhotoService();