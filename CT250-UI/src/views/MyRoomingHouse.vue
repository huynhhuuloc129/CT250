<template>
    <div id="MyRoomingHouse">
        <div class="MyRoomingHouse-tabpanel" role="tabpanel">
            <div class="list-group" id="myList" role="tablist">
                <a class="list-group-item list-group-item-action" v-for="roomingHouse in roomingHouses"
                    id="list-home-list {{ roomingHouse.id }}" data-bs-toggle="list" v-bind:href="'#home' + roomingHouse.id"
                    role="tab" aria-controls="home">{{ roomingHouse.name }}</a>
            </div>
            <button type="button"
                style="width: 100%; margin-top: 2px; font-weight: bold; background-color: rgb(255, 190, 69);"
                class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addRoomingHouseModal">+</button>
        </div>

        <div class="tab-content">
            <div class="tab-pane fade" v-bind:id="'home' + roomingHouse.id" v-for="(roomingHouse, index) in roomingHouses"
                role="tabpanel">
                <div style="display: flex; justify-content: space-between;">
                    <h3>{{ roomingHouse.name }}</h3>
                    <div>
                        <button class="btn btn-danger" @click="deleteRoomingHouse(roomingHouse.id)"
                            style="margin-right: 5px;">Xóa</button>
                        <button class="btn btn-primary" @click="goToRoomingHouseInfo(roomingHouse.id)"
                            style="background-color: #2c5596;">Xem chi tiết</button>
                    </div>
                </div>
                <div>
                    <p style="font-weight: bold;">Mô tả:</p> {{ roomingHouse.description }}
                </div>
                <div><span style="font-weight: bold;">Địa chỉ:</span> {{ roomingHouse.address }}</div>
                <div><span style="font-weight: bold;">Số phòng:</span> {{ roomingHouse.totalRoomNumber }}</div>
                <div><span style="font-weight: bold;">Số phòng còn trống:</span> {{ roomingHouse.availableRoomNumber }}
                </div>

                <p>
                    <a class="btn btn-dark" data-bs-toggle="collapse" :href="'#collapseExample' + roomingHouse.id"
                        role="button" aria-expanded="false" :aria-controls="'collapseExample' + roomingHouse.id">
                        Các phòng
                    </a>
                </p>
                <button type="button"
                    style="width: 100%; margin-top: 2px; font-weight: bold; background-color: rgb(255, 190, 69);"
                    class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addRoomModal">
                    Thêm phòng</button>
                <div class="collapse" v-bind:id="'collapseExample' + roomingHouse.id" v-for="room in rooms[index]">
                    <div class="card card-body">
                        <div style="display: flex; justify-content: space-between;">
                            <h3>
                                {{ room.name }}
                            </h3>
                            <button class="btn btn-danger" @click="deleteRoom(room.id)"
                                style="margin-right: 5px;">Xóa</button>
                        </div>
                        <div>
                            <div class="container mt-4">
                                <div class="accordion" id="toggleExample">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="toggleHeader">
                                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                                :data-bs-target="'#toggleContent' + room.id" aria-expanded="true"
                                                aria-controls="toggleContent">
                                                Mô tả
                                            </button>
                                        </h2>
                                        <div :id="'toggleContent' + room.id" class="accordion-collapse collapse show"
                                            aria-labelledby="toggleHeader" data-bs-parent="#toggleExample">
                                            <div class="accordion-body">
                                                {{ room.summary }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <div style="margin: 20px;">Giá tiền: <div style="color: red;">{{
                                room.roomPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' }) }}</div>
                            </div>
                            <button class="btn btn-primary" style="margin: 20px; background-color: #2c5596;"
                                @click="goToRoomInfo(room.id)">Xem chi
                                tiết phòng</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div class="modal fade" id="addRoomModal" tabindex="-1" aria-labelledby="addRoomModalLabel" aria-hidden="true"
        data-backdrop="false">
        <div class="modal-dialog-centered modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="loginTitle">Thêm phòng</h5>
                    <button type="button" id="login-form-close-btn" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <addRoomForm />
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="addRoomingHouseModal" tabindex="-1" aria-labelledby="addRoomingHouseModalLabel"
        aria-hidden="true" data-backdrop="false">
        <div class="modal-dialog-centered modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="loginTitle">Thêm trọ</h5>
                    <button type="button" id="login-form-close-btn" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <addRoomingHouseForm />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import addRoomingHouseForm from '@/components/AddRoomingHouseForm.vue';
import addRoomForm from '@/components/AddRoomForm.vue';
import roomingHouseService from '@/services/roomingHouse.service.js';
import roomService from '@/services/room.service.js';
import userService from '@/services/user.service';
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            user: {},
            lessor: {},
            roomingHouses: [],
            rooms: [[]]
        }
    },
    components: {
        addRoomingHouseForm,
        addRoomForm
    },
    methods: {
        async checkLogin() {
            try {
                var tokenBearer = this.$cookies.get("Token");
                this.user = await userService.getCurrentUser(tokenBearer);
                this.lessor = user.lessor;
            } catch (error) {
                // alert(error);
                this.$router.push({ name: "login" });
            }
        },
        async retrieveRoomingHouses() {
            try {
                this.roomingHouses = await roomingHouseService.getByLessorId(this.lessor.id);
                for (var i = 0; i < this.roomingHouses.length; i++) {
                    let roomss = []
                    this.rooms[i] = []
                    roomss = await this.retrieveRooms(this.roomingHouses[i].id)
                    for (var j = 0; j < roomss.length; j++) {
                        this.rooms[i][j] = roomss[j]
                    }
                }
            } catch (err) {
                console.log(err);
            }
        },
        async retrieveRooms(id) {
            try {
                return await roomService.getAllByRoomingHouseID(id);
            } catch (err) {
                console.log(err);
            }
        },
        async goToRoomInfo(id) {
            this.$router.push({ name: "room info", params: { id: id } })
        },
        async goToRoomingHouseInfo(id) {
            this.$router.push({ name: "rooming house info", params: { id: id } })
        },
        async deleteRoomingHouse(id) {
            Swal.fire({
                title: 'Bạn có chắc chắn muốn xóa khu trọ này không?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Xóa',
                denyButtonText: `Hủy`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire('Đã xóa!', '', 'success')
                } else if (result.isDenied) {
                    Swal.fire('Đã hủy thao tác xóa', '', 'info')
                }
            })
        },
        async deleteRoom(id) {
            Swal.fire({
                title: 'Bạn có chắc chắn muốn xóa phòng trọ này không?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Xóa',
                denyButtonText: `Hủy`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire('Đã xóa!', '', 'success')
                } else if (result.isDenied) {
                    Swal.fire('Đã hủy thao tác xóa', '', 'info')
                }
            })
        },
        showHeaderAndFooter() {
            this.$emit("isShowHeaderAndFooter", true);
        },
    },
    mounted() {
        this.showHeaderAndFooter();
        this.retrieveRoomingHouses();
    }
}
</script>

<style>
.MyRoomingHouse-tabpanel,
.tab-content {
    margin: 10px;
}

#MyRoomingHouse {
    width: 80%;
    margin: auto;
    margin-top: 50px;
}

#AppHeader {
    position: static;
    background-color: #0F2C59;
}
</style>