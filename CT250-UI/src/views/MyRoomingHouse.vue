<template>
    <h3 v-if="roomingHouses.length == 0" style="align-items: center; text-align: center; padding-top: 15px;">Hiện tại bạn
        chưa có phòng trọ nào</h3>
    <div id="MyRoomingHouse">
        <div class="MyRoomingHouse-tabpanel" role="tabpanel">
            <div class="list-group" id="myList" role="tablist">
                <a class="list-group-item list-group-item-action" v-for="roomingHouse in roomingHouses"
                    id="list-home-list {{ roomingHouse.id }}" data-bs-toggle="list" v-bind:href="'#home' + roomingHouse.id"
                    role="tab" aria-controls="home">{{ roomingHouse.name }}</a>
            </div>
            <button type="button" style="width: 100%; margin-top: 2px; font-weight: bold;" class="btn btn-secondary"
                data-bs-toggle="modal" data-bs-target="#addRoomingHouseModal">+</button>
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
                            style="background-color: #2c5596; margin-right: 5px;">Xem chi tiết</button>
                        <button class="btn btn-light" @click="enableEditRoomingHouse = !enableEditRoomingHouse">
                            <font-awesome-icon icon="pen-to-square" style="font-size: 23px;" />
                        </button>
                    </div>
                </div>
                <div>

                    <p style="font-weight: bold;">Mô tả:</p>
                    <textarea v-if="enableEditRoomingHouse" v-model="roomingHouse.description" style="width: 50%;"></textarea>
                    <span v-else>{{ roomingHouse.description }}</span>
                </div>

                <div>
                    <span style="font-weight: bold;">Địa chỉ: </span>
                    <input v-if="enableEditRoomingHouse" v-model="roomingHouse.address">
                    <span v-else>{{ roomingHouse.address }}</span>
                </div>
                <div>
                    <span style="font-weight: bold;">Số phòng:</span>
                    <span>{{ roomingHouse.totalRoomNumber }}</span>
                </div>
                <div>
                    <span style="font-weight: bold;">Số phòng còn trống:</span>
                    <span>{{ roomingHouse.availableRoomNumber }}</span>
                </div>

                <button v-if="enableEditRoomingHouse" @click="editRoomingHouse(roomingHouse)" class="btn btn-primary" style="margin-bottom: 5px;">Cập nhật</button>

                <p>
                    <a class="btn btn-dark" data-bs-toggle="collapse" :href="'#collapseExample' + roomingHouse.id"
                        role="button" aria-expanded="false" :aria-controls="'collapseExample' + roomingHouse.id">
                        Các phòng
                    </a>
                </p>
                <h3 v-if="rooms[index] != null && rooms[index].length == 0"
                    style="align-items: center; text-align: center; padding-top: 15px;">
                    Hiện tại bạn
                    chưa có phòng trọ nào</h3>
                <button type="button" style="width: 100%; margin-top: 2px; font-weight: bold;" class="btn btn-secondary"
                    data-bs-toggle="modal" data-bs-target="#addRoomModal" @click="roomingHouseId = roomingHouse.id">
                    Thêm phòng</button>
                <div class="collapse" v-bind:id="'collapseExample' + roomingHouse.id" v-for="room in rooms[index]">
                    <div class="card card-body">
                        <div style="display: flex; justify-content: space-between;">
                            <h3>
                                {{ room.name }}
                            </h3>
                            <div>
                                <button class="btn btn-danger" @click="deleteRoom(roomingHouse.id, room.id)">Xóa</button>
                                <button class="btn btn-primary" style="margin: 5px; background-color: #2c5596;"
                                    @click="goToRoomInfo(room.id)">Xem chi tiết phòng</button>
                            </div>
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
                    <addRoomForm @submit="onAddingRoom" />
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
                    <addRoomingHouseForm @submit="onAddingRoomingHouse" />
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
            rooms: [[]],
            roomingHouseId: "",
            enableEditRoomingHouse: false
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
                this.lessor = this.user.lessor;
                // console.log(this.lessor)

            } catch (error) {
                this.$router.push({ name: "login" });
            }
        },
        async onAddingRoomingHouse(addingRoomingHouseRequest) {
            try {
                var tokenBearer = this.$cookies.get("Token");
                await roomingHouseService.create(addingRoomingHouseRequest, tokenBearer)
                this.displaySuccess("Tạo trọ thành công")
                await this.sleep(1000)
                this.$router.go();
            } catch (err) {
                console.log(err)
                this.displayError(err)
            }
        },
        async onAddingRoom(addingRoomRequest) {
            try {
                this.validateAddRoomForm(addingRoomRequest)
                var tokenBearer = this.$cookies.get("Token");
                await roomService.create(this.roomingHouseId, addingRoomRequest, tokenBearer)
                this.displaySuccess("Tạo phòng trọ thành công")
                await this.sleep(1000)
                this.$router.go();
            } catch (err) {
                console.log(err)
                this.displayError(err)
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
                this.displayError(err)
            }
        },
        async retrieveRooms(id) {
            try {
                return await roomService.getAllByRoomingHouseID(id);
            } catch (err) {
                this.displayError(err)
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
                confirmButtonText: 'Hủy',
                denyButtonText: `Xóa`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) { //revert 2 case for color
                    Swal.fire('Đã hủy thao tác xóa', '', 'info')
                } else if (result.isDenied) {
                    Swal.fire('Đã xóa!', '', 'success')

                }
            })
        },
        async deleteRoom(roomingHouseId, id) {
            Swal.fire({
                title: 'Bạn có chắc chắn muốn xóa phòng trọ này không?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Hủy',
                denyButtonText: `Xóa`,
            }).then((result) => {
                if (result.isConfirmed) { //revert 2 function to get the correct color (delete should be red)
                    Swal.fire('Đã hủy thao tác xóa', '', 'info')
                } else if (result.isDenied) {
                    this.deleteRoomAPI(roomingHouseId, id)
                }
            })
        },
        async deleteRoomingHouseAPI(roomingHouseId) {
            try {
                var tokenBearer = this.$cookies.get("Token");
                await roomingHouseService.delete(roomingHouseId, tokenBearer)
                this.displaySuccess("Đã xóa trọ thành công")
                this.$router.go(0);
            } catch (err) {
                this.displayError(err)
            }
        },
        async deleteRoomAPI(roomingHouseId, id) {
            try {
                var tokenBearer = this.$cookies.get("Token");
                await roomService.delete(roomingHouseId, id, tokenBearer)
                this.displaySuccess("Đã xóa phòng thành công")
                this.$router.go(0);
            } catch (err) {
                this.displayError(err)
            }
        },
        async editRoomingHouse(roomingHouse) {
            // TODO: add code
        },
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        displaySuccess(message) {
            Swal.fire({
                // position: 'top-end',
                icon: 'success',
                title: message,
                showConfirmButton: false,
                timer: 1000
            })
        },
        displayError(message) {
            Swal.fire({
                title: 'Lỗi!',
                text: message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        },
        validateAddRoomForm(req) {
            if (req.name.length == 0) throw new Error("Tên trọ không được để trống")
            if (req.width <= 1) throw new Error("Chiều rộng trọ phải lớn hơn 0")
            if (req.height <= 1) throw new Error("Chiều cao trọ phải lớn hơn 0")
            if (req.roomPrice <= 1000) throw new Error("Giá trọ phải lớn hơn 1000")
            if (req.waterPrice <= 1000) throw new Error("Giá nước của trọ phải lớn hơn 1000")
            if (req.electricityPrice <= 1000) throw new Error("Giá điện của trọ phải lớn hơn 1000")
            if (req.summary.length <= 8) throw new Error("Mô tả trọ phải có độ dài lớn hơn 8")
        },
        showHeaderAndFooter() {
            this.$emit("isShowHeaderAndFooter", true);
        },
    },
    async mounted() {
        await this.checkLogin();
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