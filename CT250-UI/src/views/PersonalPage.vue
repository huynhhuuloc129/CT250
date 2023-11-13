<template>
    <div id="PersonalInformation-sessions">
        <div class="PersonalInformation-session" id="first-session">
            <img id="PersonalInformation-avatar" src="../assets/home-page-background.jpg" alt="">
            <div>
                <h2>{{ thatUser.fullName }}</h2>
                <div><font-awesome-icon :icon="['far', 'envelope']" /> {{ thatUser.email }}</div>
                <div><font-awesome-icon :icon="['fas', 'phone']" /> {{ thatUser.tel }}</div>
                <div><font-awesome-icon :icon="['fas', 'gift']" /> {{ thatUser.dob }}</div>
            </div>
        </div>
        <div class="PersonalInformation-session">
            <div>
                <div style="display: flex; justify-content: space-between;">
                    <h2>Giới thiệu bản thân</h2>
                    <button style="border: 0px; background-color: white;" data-bs-toggle="modal"
                        data-bs-target="#selfModal">
                    </button>
                </div>
                <hr>
                <div>{{ thatUser.summary }}</div>
            </div>
        </div>
        <div class="PersonalInformation-session">
            <div style="display: flex; justify-content: space-between;">
                <h2>Thông tin cá nhân</h2>
                <button style="border: 0px; background-color: white;" data-bs-toggle="modal" data-bs-target="#infoModal">
                </button>
            </div>

            <hr>
            <div>
                <h4>Họ và tên: </h4>
                <p>{{ thatUser.fullName }}</p>
            </div>
            <div>
                <h4>Email: </h4>
                <p>{{ thatUser.email }}</p>
            </div>
            <div>
                <h4>Số điện thoại: </h4>
                <p>{{ thatUser.tel }}</p>
            </div>
            <!-- <div>
                <h4>CCCD: </h4>
                <p>{{ thatUser.citizenID }}</p>
            </div> -->
            <div>
                <h4>Ngày sinh: </h4>
                <p>{{ thatUser.dob }}</p>
            </div>
            <div>
                <h4>Giới tính: </h4>
                <p>{{ genders }}</p>
            </div>
            <div>
                <h4>Địa chỉ hiện tại: </h4>
                <p>{{ thatUser.address }}</p>
            </div>
        </div>


        <div v-if="thatUser.role == 'tenant'" class="PersonalInformation-session">
            <h4>Các phòng trọ đã và đang ở: </h4>
            <br>
            <div class="card" v-for="(roomingSubscription, index) in roomingSubscriptions">
                <h5 class="card-header">{{ roomingSubscription.room.name }}</h5>
                <div class="card-body">
                    <h5 class="card-title">Mô tả</h5>
                    <p class="card-text">{{ roomingSubscription.room.summary }}</p>
                    <div style="display: flex; justify-content: space-between;">
                        <a :href="'http://localhost:3001/rooms/' + roomingSubscription.room.id"
                            style="background-color: #2c5596;" class="btn btn-primary">Xem chi tiết</a>
                        <span>Trạng thái: <span v-if="roomingSubscription.state == 'staying'" style="color: green;">Đang
                                ở</span>
                            <span v-else style="color: red;">Đã từng ở</span></span>
                    </div>
                </div>
            </div>
        </div>


        <div id="MyRoomingHouse" v-if="thatUser.role == 'lessor'" style="width: 80%;">
            <h4>Các khu trọ mà chủ trọ này sở hữu</h4>
            <div class="MyRoomingHouse-tabpanel" role="tabpanel">
                <div class="list-group" id="myList" role="tablist">
                    <a class="list-group-item list-group-item-action" v-for="roomingHouse in roomingHouses"
                        id="list-home-list {{ roomingHouse.id }}" data-bs-toggle="list"
                        v-bind:href="'#home' + roomingHouse.id" role="tab" aria-controls="home">{{ roomingHouse.name }}</a>
                </div>
            </div>

            <div class="tab-content">
                <div class="tab-pane fade" v-bind:id="'home' + roomingHouse.id"
                    v-for="(roomingHouse, index) in roomingHouses" role="tabpanel" style="margin-top: 5px;">
                    <div style="display: flex; justify-content: space-between;">
                        <h3>{{ roomingHouse.name }}</h3>
                        <div>
                            <button class="btn btn-primary" @click="goToRoomingHouseInfo(roomingHouse.id)"
                                style="background-color: #2c5596; margin-right: 5px;">Xem chi tiết</button>
                        </div>
                    </div>
                    <div>

                        <p style="font-weight: bold;">Mô tả:</p>
                        <span>{{ roomingHouse.description }}</span>
                    </div>

                    <div>
                        <span style="font-weight: bold;">Địa chỉ: </span>
                        <span>{{ roomingHouse.address }}</span>
                    </div>
                    <div>
                        <span style="font-weight: bold;">Số phòng:</span>
                        <span>{{ roomingHouse.totalRoomNumber }}</span>
                    </div>
                    <div>
                        <span style="font-weight: bold;">Số phòng còn trống:</span>
                        <span>{{ roomingHouse.availableRoomNumber }}</span>
                    </div>


                    <p>
                        <a class="btn btn-dark" data-bs-toggle="collapse" :href="'#collapseExample' + roomingHouse.id"
                            role="button" aria-expanded="false" :aria-controls="'collapseExample' + roomingHouse.id">
                            Các phòng
                        </a>
                    </p>
                    <div class="collapse" v-bind:id="'collapseExample' + roomingHouse.id" v-for="room in rooms[index]">
                        <div class="card card-body">
                            <div style="display: flex; justify-content: space-between;">
                                <h3>
                                    {{ room.name }}
                                </h3>
                                <div>
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
    </div>
</template>

<script>
import roomingSubscriptionService from '@/services/roomingSubscription.service';
import roomingHouseService from '@/services/roomingHouse.service'
import roomService from '@/services/room.service'
import userService from '@/services/user.service';
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            user: {},
            thatUser: {},
            buttonDisabled: false,
            token: "",
            dobString: "",
            roomingSubscriptions: [],
            userUpdateForm: {},
            genders: "Nam",
            totalPriceSpent: [],
            roomingHouses: [],
            rooms: [[]],
        };
    },
    components: {
    },
    computed: {
    },
    methods: {
        formatDate(date) {
            return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        },
        async getRoomingSubscriptions() {
            try {
                if (this.thatUser.role == 'tenant') {
                    this.roomingSubscriptions = await roomingSubscriptionService.getByTenantId(this.thatUser.tenant.id);
                    for (let i = 0; i < this.roomingSubscriptions.length; i++) {
                        this.roomingSubscriptions[i] = await roomingSubscriptionService.getOne(this.roomingSubscriptions[i].id)
                        this.totalPriceSpent[i] = 0
                        this.roomingSubscriptions[i].paymentRecords.forEach(element => {
                            // if (element.paidDate != null)
                            this.totalPriceSpent[i] += element.monthTotalPrice
                        });
                    }
                }

            } catch (err) {
                console.log(err)
                this.displayError(err)
            }
        },
        async checkLogin() {
            try {
                this.token = this.$cookies.get("Token");
                this.user = await userService.getCurrentUser(this.token);
            } catch (error) {
                this.$router.push({ name: "login" });
            }
        },
        async getThatUser() {
            try {
                this.token = this.$cookies.get("Token");
                this.thatUser = await userService.getOneUser(this.$route.params.id, this.token);
                if (this.thatUser.gender == 'male') this.genders = 'Nam'; else this.genders = 'Nữ'

                this.thatUser.dob = new Date(this.thatUser.dob);
                this.thatUser.dob = this.formatDate(this.thatUser.dob);
                this.dobString = this.thatUser.dob.toString();
            } catch (err) {
                console.log(err)
                this.displayError(err)
            }
        },
        async retrieveRoomingHouses() {
            try {
                if (this.thatUser.role == 'lessor') {
                    this.roomingHouses = await roomingHouseService.getByLessorId(this.thatUser.lessor.id);
                    console.log(this.roomingHouses)
                    for (var i = 0; i < this.roomingHouses.length; i++) {
                        let roomss = []
                        this.rooms[i] = []
                        roomss = await this.retrieveRooms(this.roomingHouses[i].id)
                        for (var j = 0; j < roomss.length; j++) {
                            this.rooms[i][j] = roomss[j]
                        }
                    }
                }
            } catch (err) {
                console.log(err)
                this.displayError(err)
            }
        },
        async retrieveRooms(id) {
            try {
                return await roomService.getAllByRoomingHouseID(id);
            } catch (err) {
                console.log(err)
                this.displayError(err)
            }
        },
        async goToRoomInfo(id) {
            this.$router.push({ name: "room info", params: { id: id } })
        },
        async goToRoomingHouseInfo(id) {
            this.$router.push({ name: "rooming house info", params: { id: id } })
        },
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        displaySuccess(message) {
            Swal.fire({
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
        showHeaderAndFooter() {
            this.$emit("isShowHeaderAndFooter", true);
        },
    },
    async mounted() {
        await this.checkLogin();
        await this.getThatUser();
        this.showHeaderAndFooter();
        this.getRoomingSubscriptions();
        this.retrieveRoomingHouses();
    }

}
</script>

<style>
.form-element {
    margin-bottom: 20px;
}

#registerButton {
    text-align: center;
}

.registerForm-button {
    color: #FFF0DC;
    background-color: #0F2C59;
}

#form2Example-textarea {
    word-wrap: break-word;
    height: 100px;
}

#first-session {
    display: flex;
}

#AppHeader {
    position: static;
    background-color: #0F2C59;
}

#PersonalInformation-avatar {
    border-radius: 50%;
    margin-right: 100px;
    width: 150px;
    height: 150px;
}

#PersonalInformation-sessions {
    justify-content: center;
    align-items: center;
    word-wrap: break-word;
    font-size: large;
    margin: 50px 150px 150px 150px;
    display: flex;
    flex-direction: column;
}

.PersonalInformation-session {
    width: 80%;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 30px;
}

.loginForm-button {
    color: #FFF0DC;
    background-color: #0F2C59;
}
</style>