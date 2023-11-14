<template>
    <div id="PersonalInformation-sessions">
        <div class="PersonalInformation-session" id="first-session">
            <div style="display: flex; flex-direction: row; justify-content: space-between;">
                <img v-if="this.user.photo != null" id="PersonalInformation-avatar" :src="this.user.photo.url"
                    style="cursor: pointer; border: 1px solid rgb(178, 175, 175);" @click="updatePicture = !updatePicture"
                    alt="">

                <div v-if="updatePicture || this.user.photo == null" class="container col-md-6">
                    <div class="mb-5">
                        <label for="Image" class="form-label">Cập nhật ảnh đại diện</label>
                        <input class="form-control" type="file" id="formFile" @change="preview">
                        <button @click="updateImage" class="btn btn-primary mt-3">Cập nhật</button>
                    </div>
                    <img id="frame" src="" class="img-fluid" />
                </div>
            </div>

            <div>
                <h2>{{ user.fullName }}</h2>
                <div><font-awesome-icon :icon="['far', 'envelope']" /> {{ user.email }}</div>
                <div><font-awesome-icon :icon="['fas', 'phone']" /> {{ user.tel }}</div>
                <div><font-awesome-icon :icon="['fas', 'gift']" /> {{ user.dob }}</div>
            </div>
        </div>
        <div class="PersonalInformation-session">
            <div>
                <div style="display: flex; justify-content: space-between;">
                    <h2>Giới thiệu bản thân</h2>
                    <button style="border: 0px; background-color: white;" data-bs-toggle="modal"
                        data-bs-target="#selfModal">
                        <h2><font-awesome-icon icon="pen-to-square" /></h2>
                    </button>
                </div>
                <hr>
                <div>{{ user.summary }}</div>
            </div>
        </div>
        <div class="PersonalInformation-session">
            <div style="display: flex; justify-content: space-between;">
                <h2>Thông tin cá nhân</h2>
                <button style="border: 0px; background-color: white;" data-bs-toggle="modal" data-bs-target="#infoModal">
                    <h2><font-awesome-icon icon="pen-to-square" /></h2>
                </button>
            </div>

            <hr>
            <div>
                <h4>Họ và tên: </h4>
                <p>{{ user.fullName }}</p>
            </div>
            <div>
                <h4>Email: </h4>
                <p>{{ user.email }}</p>
            </div>
            <div>
                <h4>Số điện thoại: </h4>
                <p>{{ user.tel }}</p>
            </div>
            <div>
                <h4>CCCD: </h4>
                <p>{{ user.citizenID }}</p>
            </div>
            <div>
                <h4>Ngày sinh: </h4>
                <p>{{ user.dob }}</p>
            </div>
            <div>
                <h4>Giới tính: </h4>
                <p>{{ genders }}</p>
            </div>
            <div>
                <h4>Địa chỉ hiện tại: </h4>
                <p>{{ user.address }}</p>
            </div>
        </div>


        <div v-if="user.role == 'tenant'" class="PersonalInformation-session">
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
                    <div v-if="totalPriceSpent[index] != null" style="text-align: right;">
                        Tổng tiền đã trả:
                        <span style="color: red; ">{{ totalPriceSpent[index].toLocaleString('vi', {
                            style: 'currency',
                            currency: 'VND'
                        }) }}</span>
                    </div>
                </div>
                <div class="container mt-5" style="margin-bottom: 20px;">
                    <div class="accordion" id="toggleExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="toggleHeader">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#toggleContent" aria-expanded="true" aria-controls="toggleContent">
                                    <div id="listRoomsHeader">Hóa đơn hàng tháng</div>
                                </button>
                            </h2>
                            <div id="toggleContent" style="width: 100%;" class="accordion-collapse collapse show"
                                aria-labelledby="toggleHeader" data-bs-parent="#toggleExample">
                                <div class="accordion-body">
                                    <div class="card card-body room-body" style="margin-bottom: 30px;  width: 100%;"
                                        v-for="paymentRecord in roomingSubscription.paymentRecords">

                                        <div style="display: flex; justify-content: space-between; width: 100%;">
                                            <div style="display: flex; flex-direction: column; width: 100%;">
                                                <div style="font-weight: bold;">Tháng {{ paymentRecord.month }}, năm {{
                                                    paymentRecord.year }}
                                                </div>
                                                <div style="display: flex; justify-content: space-between;">
                                                    <span>Giá nước: </span>
                                                    <span>{{ paymentRecord.monthWaterPrice.toLocaleString('vi', {
                                                        style:
                                                            'currency', currency: 'VND'
                                                    }) }}</span>
                                                </div>
                                                <div style="display: flex; justify-content: space-between;">
                                                    <span>Giá điện: </span>
                                                    <span>{{ paymentRecord.monthElectricityPrice.toLocaleString('vi', {
                                                        style: 'currency', currency: 'VND'
                                                    }) }}</span>
                                                </div>
                                                <div style="display: flex; justify-content: space-between;">
                                                    <span>Số nước: </span>
                                                    <span>{{ paymentRecord.waterAmount }}</span>
                                                </div>
                                                <div style="display: flex; justify-content: space-between;">
                                                    <span>Số điện: </span>
                                                    <span>{{ paymentRecord.electricityAmount }}</span>
                                                </div>
                                                <div style="display: flex; justify-content: space-between;">
                                                    <span>Tiền phòng: </span>
                                                    <span>{{ paymentRecord.monthRoomPrice.toLocaleString('vi', {
                                                        style:
                                                            'currency', currency: 'VND'
                                                    }) }}</span>
                                                </div>
                                                <div style="display: flex; justify-content: space-between;">
                                                    <span>Tiền nước:</span>
                                                    <span>{{ paymentRecord.waterPrice.toLocaleString('vi', {
                                                        style:
                                                            'currency', currency: 'VND'
                                                    }) }}</span>
                                                </div>
                                                <div style="display: flex; justify-content: space-between;">
                                                    <span>Tiền điện:</span>
                                                    <span>{{ paymentRecord.electricityPrice.toLocaleString('vi', {
                                                        style:
                                                            'currency', currency: 'VND'
                                                    }) }}</span>
                                                </div>
                                                <div style="display: flex; justify-content: space-between;">
                                                    <span>Phụ thu:</span>
                                                    <span v-if="paymentRecord.surcharge != null">{{
                                                        paymentRecord.surcharge.toLocaleString('vi', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })
                                                    }}</span>
                                                    <span v-else>0</span>
                                                </div>
                                                <div style="display: flex; justify-content: space-between;">
                                                    <span>Tổng tiền:</span>
                                                    <span>{{ paymentRecord.monthTotalPrice.toLocaleString('vi', {
                                                        style:
                                                            'currency', currency: 'VND'
                                                    }) }}</span>
                                                </div>
                                                <div style="display: flex; justify-content: space-between;">
                                                    <span>Trạng thái:</span>
                                                    <span v-if="paymentRecord.paidDate == null" style="color: red;">Chưa
                                                        đóng</span>
                                                    <span v-else style="color: blue;">Đã đóng</span>
                                                </div>
                                                <div v-if="paymentRecord.paidDate != null"
                                                    style="display: flex; justify-content: space-between;">
                                                    <span>Ngày đóng:</span>
                                                    <span>{{ paymentRecord.paidDate }}</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


        <div class="modal fade" id="selfModal" tabindex="-1" aria-labelledby="selfModalLabel" aria-hidden="true"
            data-backdrop="false">
            <div class="modal-dialog-centered modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="loginTitle">Giới thiệu bản thân</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="self-form">
                            <div class="form-outline mb-4">
                                <textarea id="form2Example-textarea" class="form-control" v-model="user.summary"
                                    @focus="buttonDisabled = false"></textarea>
                                <label class="form-label" for="form2Example-textarea"></label>
                            </div>

                            <div class="text-center">
                                <button type="button" class=" btn btn-primary btn-block mb-4 loginForm-button"
                                    @click="onUpdateSummary" :disabled="buttonDisabled">Cập nhật</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="infoModal" tabindex="-1" aria-labelledby="infoModalLabel" aria-hidden="true"
            data-backdrop="false">
            <div class="modal-dialog-centered modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="loginTitle">Thông tin cá nhân</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="registerForm">
                            <div class="form-floating form-element">
                                <input type="text" class="form-control" id="registerInputFirstname" placeholder=""
                                    v-model="user.lastName" @focus="buttonDisabledPersonal = false" required>
                                <label for="registerInputFirstname">Họ</label>
                            </div>

                            <div class="form-floating form-element">
                                <input type="text" class="form-control" id="registerInputLastname" placeholder=""
                                    v-model="user.firstName" @focus="buttonDisabledPersonal = false" required>
                                <label for="registerInputLastname">Tên</label>
                            </div>

                            <div class="form-floating form-element">
                                <input type="email" class="form-control" id="registerInputEmail1"
                                    aria-describedby="emailHelp" placeholder="" v-model="user.email"
                                    @focus="buttonDisabledPersonal = false" required>
                                <label for="registerInputEmail1">Email</label>
                            </div>
                            <small id="emailHelp" class="form-text text-muted"></small>

                            <div class="form-floating form-element">
                                <input type="text" class="form-control" id="registerInputPhonenumber" placeholder=""
                                    v-model="user.tel" @focus="buttonDisabledPersonal = false" required>
                                <label for="registerInputPhonenumber">Số điện thoại</label>
                            </div>

                            <div class="form-floating form-element">
                                <input type="text" class="form-control" id="registerInputCitizenID" placeholder=""
                                    v-model="user.citizenID" @focus="buttonDisabledPersonal = false" required>
                                <label for="registerInputCitizenID">Căn cước công dân</label>
                            </div>

                            <div class="form-floating form-element">
                                <input type="date" class="form-control" id="registerInputdob" placeholder=""
                                    v-model="dobString" @focus="buttonDisabledPersonal = false" required>
                                <label for="registerInputdob">Ngày sinh</label>
                            </div>

                            <div class="form-floating form-element">
                                <select class="form-select form-select-sm" id="floatingSelect"
                                    aria-label=".form-select-sm role" v-model="genders"
                                    @focus="buttonDisabledPersonal = false" required>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </select>
                                <label for="floatingSelect">Giới tính</label>
                            </div>

                            <div class="form-floating form-element">
                                <input type="text" class="form-control" id="registerInputAddress" placeholder=""
                                    v-model="user.address" @focus="buttonDisabledPersonal = false" required>
                                <label for="registerInputAddress">Địa chỉ hiện tại</label>
                            </div>

                            <div style="display:flex; align-items:center; justify-content: center; padding: 10px 0 0 0;">
                                <button type="button" id="registerButton" class="btn btn-secondary registerForm-button"
                                    @click="onUpdatePersonalInformation" :disabled="buttonDisabledPersonal">Cập
                                    nhật</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import roomingSubscriptionService from '../services/roomingSubscription.service';
import userService from '../services/user.service';
import photoService from '../services/photo.service';
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            file: {},
            updatePictureReq: {},
            user: {},
            buttonDisabled: false,
            buttonDisabledPersonal: false,
            token: "",
            dobString: "",
            roomingSubscriptions: [],
            userUpdateForm: {},
            genders: "Nam",
            totalPriceSpent: [],
            updatePicture: false,
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
                if (this.user.role == 'tenant') {
                    this.roomingSubscriptions = await roomingSubscriptionService.getByTenantId(this.user.tenant.id);
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
            }
        },
        async onUpdateSummary() {
            try {
                this.userUpdateForm = {
                    "username": this.user.username,
                    "refreshToken": this.user.refreshToken,
                    "email": this.user.email,
                    "firstName": this.user.firstName,
                    "lastName": this.user.lastName,
                    "citizenID": this.user.citizenID,
                    "dob": this.user.dob,
                    "gender": this.user.gender,
                    "address": this.user.address,
                    "tel": this.user.tel,
                    "summary": this.user.summary
                }
                const response = await userService.updateUser(this.user.id, this.userUpdateForm, this.token);
                this.buttonDisabled = true;
                this.displaySuccess("Cập nhật giới thiệu thành công")
                document.getElementsByClassName("btn-close")[0].click();
                await this.sleep(1000)
                this.$router.go()
            } catch (err) {
                console.log(err)
                this.displayError(err)
            }
        },
        async onUpdatePersonalInformation() {
            try {
                if (this.genders = 'Nam') this.user.gender = 'male'; else this.user.gender = 'female'
                this.userUpdateForm = {
                    "username": this.user.username,
                    "refreshToken": this.user.refreshToken,
                    "email": this.user.email,
                    "firstName": this.user.firstName,
                    "lastName": this.user.lastName,
                    "citizenID": this.user.citizenID,
                    "dob": this.user.dob,
                    "gender": this.user.gender,
                    "address": this.user.address,
                    "tel": this.user.tel,
                    "summary": this.user.summary
                }
                await userService.updateUser(this.user.id, this.userUpdateForm, this.token);
                this.buttonDisabledPersonal = true;
                this.displaySuccess("Cập nhật thông tin cá nhân thành công")
                await this.sleep(1000)
                this.$router.go()
            } catch (err) {
                alert(err)
                console.log(err)
                this.displayError(err)
            }
        },
        async updateImage() {
            try {
                await photoService.userRemovePhoto(this.token);
                let data = new FormData();
                data.append('file', this.file);
                await photoService.userUploadPhoto(data, this.token);
                this.displaySuccess("Cập nhật hình ảnh thành công")
                await this.sleep(1000)
                this.$router.go()
            } catch (err) {
                console.log(err)
                this.displayError(err)
            }
        },
        async onSignup(user, role) {
            try {
                if (role == "lessor") {
                    await userService.signUpLessor(user);
                } else if (role == "tenant") {
                    await userService.signUpTenant(user);
                }
                this.$router.go();
            } catch (err) {
                console.log(err)
            }
        },
        async checkLogin() {
            try {
                this.token = this.$cookies.get("Token");
                this.user = await userService.getCurrentUser(this.token);
                if (this.user.gender == 'male') this.genders = 'Nam'; else this.genders = 'Nữ'
                console.log(this.user)
                this.user.dob = new Date(this.user.dob);
                this.user.dob = this.formatDate(this.user.dob);
                this.dobString = this.user.dob.toString();
            } catch (error) {
                this.$router.push({ name: "login" });
            }
        },
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        preview(event) {
            this.file = event.target.files[0]
        },
        clearImage() {
            document.getElementById('formFile').value = null;
            frame.src = "";
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
        this.showHeaderAndFooter();
        this.getRoomingSubscriptions();
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