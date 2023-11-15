<template>
    <div style=" display: flex;  justify-content: center;">
        <div class="card" style="border-radius: 0 0 15px 15px;  width: 50%; margin-top: 30px;" v-if="users.length > 0">
            <div class="card-body">
                <h5>Thông tin tất cả người dùng</h5>
                <ul class="list-group" v-for="user in users">
                    <li class="list-group-item  align-items-center" style="display: flex; justify-content: space-between;">
                        <div style="display: flex;">
                            <div style="width: 80px; height: 40px;">
                                <img v-if="user.photo != null" style="width: 60px; height: 60px; margin-right: 20px;"
                                    :src="user.photo.url" alt="">
                            </div>
                            <div>
                                <div style="display: flex; justify-content: space-between;">
                                    <div> Họ tên: <span
                                            style="text-decoration: underline; font-weight: bold; cursor: pointer;"
                                            @click="goToUserInfo(user.id)">{{ user.fullName }}</span></div>

                                </div>
                                <div> Tài khoản: <span>{{ user.username }}</span></div>
                                <div> Vai trò:
                                    <span v-if="user.role == 'tenant'">Người tìm trọ</span>
                                    <span v-if="user.role == 'lessor'">Người cho thuê</span>
                                    <span v-if="user.role == 'admin'" style="color: red;">Người quản trị</span>
                                </div>
                            </div>

                        </div>
                        <button class="btn btn-light">
                            <font-awesome-icon icon="trash" style="cursor: pointer" @click="confirmRemoveUser(user.id)" />
                        </button>
                    </li>
                </ul>
                <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#registerModal"
                    style="width: 100%;">+</button>


                <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel"
                    aria-hidden="true" data-backdrop="false">
                    <div class="modal-dialog-centered modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="loginTitle">Thêm người dùng</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="registerForm">

                                    <div class="form-floating">
                                        <input type="text" class="form-control" v-model="userReq.username"
                                            id="registerInputUsername" @focus="buttonDisabled = false" placeholder=""
                                            required>
                                        <label for="registerInputUsername">Tài khoản</label>
                                    </div>

                                    <div class="form-floating">
                                        <input type="email" class="form-control" v-model="userReq.email"
                                            id="registerInputEmail1" @focus="buttonDisabled = false"
                                            aria-describedby="emailHelp" placeholder="" required>
                                        <label for="registerInputEmail1">Địa chỉ email</label>
                                    </div>

                                    <div class="form-floating">
                                        <input type="password" class="form-control" v-model="userReq.password"
                                            id="registerInputPassword" @focus="buttonDisabled = false" placeholder=""
                                            required>
                                        <label for="registerInputPassword">Mật khẩu</label>
                                    </div>

                                    <div class="form-floating form-element">
                                        <select class="form-select form-select-sm" id="floatingSelect"
                                            aria-label=".form-select-sm role" v-model="genders"
                                            @focus="buttonDisabled = false" required>
                                            <option value="male">Nam</option>
                                            <option value="female">Nữ</option>
                                        </select>
                                        <label for="floatingSelect">Giới tính</label>
                                    </div>

                                    <div class="form-floating">
                                        <select class="form-select form-select-sm" v-model="role" id="floatingSelectRole"
                                            @focus="buttonDisabled = false" aria-label=".form-select-sm role" required>
                                            <option value="lessor">Chủ trọ</option>
                                            <option value="tenant">Người thuê trọ</option>
                                        </select>
                                        <label for="floatingSelectRole">Chọn vai trò</label>

                                    </div>
                                    <div
                                        style="display:flex; align-items:center; justify-content: center; padding: 10px 0 0 0;">
                                        <button type="button" id="registerButton" class="btn btn-danger registerForm-button"
                                            @click="onSignup" :disabled="buttonDisabled"> Thêm người dùng </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
import userService from '@/services/user.service';
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            userReq: {
                "email": "",
                "username": "",
                "password": "",
                "gender": "",
            },
            genders: "male",
            user: {},
            role: "lessor",
            lessor: {},
            users: [],
            buttonDisabled: false,
        }
    },
    components: {
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

        async getAllUsers() {
            try {
                var tokenBearer = this.$cookies.get("Token");
                this.users = await userService.getAllUser(tokenBearer);
            } catch (error) {
                console.log(error)
                this.displayError(error)
            }
        },
        async removeUser(id) {
            try {
                var tokenBearer = this.$cookies.get("Token");
                await userService.deleteUser(id, tokenBearer)
                this.displaySuccess("Xóa người dùng thành công")
                await this.sleep(1000)
                this.$router.go()
            } catch (error) {
                console.log(error)
                this.displayError(error)
            }
        },
        confirmRemoveUser(id) {
            Swal.fire({
                title: 'Bạn có chắc chắn muốn xóa người dùng này không',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Hủy',
                denyButtonText: `Xóa`,
            }).then((result) => {
                if (result.isConfirmed) { //revert 2 case for color
                    Swal.fire('Đã hủy thao tác', '', 'info')
                } else if (result.isDenied) {
                    this.removeUser(id);
                }
            })
        },
        async onSignup() {
            try {
                this.userReq.gender = this.genders
                this.validateSignUpForm(this.userReq)
                if (this.role == "lessor") {
                    await userService.signUpLessor(this.userReq);
                } else {
                    await userService.signUpTenant(this.userReq);
                }
                await this.displaySuccess("Tạo người dùng thành công")
                await this.sleep(1000)
                this.$router.go();
            } catch (err) {
                console.log(err)
                this.displayError(err)
            }
        },
        validateSignUpForm(user) {
            if (user.username.length <= 6) throw new Error("Tài khoản phải dài hơn 6 ký tự")
            if (user.password.length <= 1) throw new Error("Mật khẩu phải dài hơn 6 ký tự")
        },
        goToUserInfo(id) {
            this.$router.push({ name: "personal page", params: { id: id } })
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
        showHeaderAndFooter() {
            this.$emit("isShowHeaderAndFooter", true);
        },
    },
    async mounted() {
        await this.checkLogin();
        this.showHeaderAndFooter();
        this.getAllUsers();
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

.form-floating {
    margin-bottom: 20px;
}
</style>