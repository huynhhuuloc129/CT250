<template>
  <div style="width: 80%; align-items: center; margin: auto;">
    <div id="MyRoom-Information">
      <div id="MyRoom-Information1">
        <div>
          <input type="text" class="form-control" v-model="roomingHouse.name" v-if="enableEditRoomingHouse">
          <h1 v-else style="text-align: center;">{{ roomingHouse.name }}</h1>

          <hr>
          <div>
            Mô tả:
            <textarea class="form-control" style="height: 200px;" v-model="roomingHouse.description"
              v-if="enableEditRoomingHouse"></textarea>
            <div v-else>
              {{ roomingHouse.description }}
            </div>
          </div>
        </div>
        <hr>
      </div>

      <div style=" width: 40%;">
        <div id="MyRoom-Information2">
          <div style="display: flex; justify-content: space-between;">
            <div>
              Loại hình khu trọ:
            </div>
            <select v-if="enableEditRoomingHouse" style="width: 60%; margin-bottom: 5px;"
              class="form-select form-select-sm" v-model="categoryChoosen" id="floatingSelect"
              @focus="buttonDisabled = false" aria-label=".form-select-sm role" required>
              <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
            </select>
            <span v-else>{{ roomingHouse.category.name }}</span>
          </div>

          <div class="myroom-fee">Địa chỉ:
            <input type="text" style="width: 50%;" class="form-control" v-model="roomingHouse.address"
              v-if="enableEditRoomingHouse">
            <div v-else>{{ roomingHouse.address }}</div>
          </div>
          <div class="myroom-fee">Số phòng:
            <div>{{ roomingHouse.totalRoomNumber }}</div>
          </div>
          <div class="myroom-fee">Số phòng còn trống:
            <div>{{ roomingHouse.availableRoomNumber }}</div>
          </div>
          <div class="myroom-fee">Ngày trả tiền hàng tháng:
            <input type="number" style="width: 50%;" class="form-control" v-model="roomingHouse.paymentExpiresDay"
              v-if="enableEditRoomingHouse">
            <div v-else>{{ roomingHouse.paymentExpiresDay }}</div>
          </div>
        </div>

        <!-- notification -->
        <div v-if="checkOwner" class="card" style="margin-top: 10px; max-height: 500px; overflow-x: hidden;">
          <div class="card-body">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <h4>Thông báo</h4>
              <button class="btn btn-light" :disabled="disableAddNoti" data-bs-toggle="modal" data-bs-target="#addNoti">
                <font-awesome-icon icon="plus" />
              </button>
            </div>
            <ul class="list-group ">
              <li v-for="noti in notifications" :key="noti.id"
                class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">{{ noti.title }}</div>
                  {{ noti.content }}
                  <p>
                    Ngày tạo: {{ noti.createdAt }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>



    <div class="container mt-5" style="margin-bottom: 20px; ">
      <div class="accordion" id="toggleExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="toggleHeader">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#toggleContent"
              aria-expanded="true" aria-controls="toggleContent">
              <h4 id="listRoomsHeader">Những phòng trọ của khu trọ này</h4>
            </button>
          </h2>
          <div id="toggleContent" class="accordion-collapse collapse show" aria-labelledby="toggleHeader"
            data-bs-parent="#toggleExample">
            <div class="accordion-body">
              <div class="card card-body room-body" style="margin-bottom: 30px;" v-for="room in rooms">

                <img class="rounded-3" style="width: 300px; margin-right: 20px;" src="@/assets/room-info.jpg" alt="">

                <div style="width: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <h4>{{ room.name }}</h4>
                    <div style="word-break: break-all;">{{ room.summary }}</div>
                  </div>
                  <div>
                    <div style="display: flex; flex-direction: row; justify-content: space-between;">
                      <div style="font-weight: bold; font-size: large;">Tiền phòng hàng tháng: <div style="color: red;">{{
                        room.roomPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' }) }}</div>
                      </div>
                      <button class="btn btn-primary" style="background-color: #2c5596;"
                        @click="goToRoomInfo(room.id)">Xem
                        chi tiết</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="text-align: right;">
      <button class="btn btn-primary" v-if="enableEditRoomingHouse" style="margin-right: 5px;"
        @click="editRoomingHouse()">Cập
        nhật</button>
      <button v-if="checkOwner" class="btn btn-light" @click="enableEditRoomingHouse = !enableEditRoomingHouse">
        <font-awesome-icon icon="pen-to-square" style="font-size: 23px;" />
      </button>
    </div>

    <hr>

    <div>
      <h3>Chủ nhà</h3>
      <div style="display: flex; justify-content: space-around; ">

        <div style="display: flex; width: 30%;">
          <img class="rounded-circle" style="width: 100px;" v-if="lessor.photo != null" :src="lessor.photo.url" alt="">
          <div style="padding-left: 30px;">
            <div style="font-weight: bold; font-size: larger; cursor: pointer; text-decoration: underline;"
              @click="goToUserInfo(lessor.id)">{{ lessor.fullName }}</div>
            <div><font-awesome-icon :icon="['far', 'envelope']" /> {{ lessor.email }}</div>
            <div><font-awesome-icon :icon="['fas', 'phone']" /> {{ lessor.tel }}</div>
            <div><font-awesome-icon :icon="['fas', 'gift']" /> {{ lessor.dob }}</div>
          </div>
        </div>

        <div style="word-break: normal; width: 60%;">
          {{ lessor.summary }} </div>
        <div>

        </div>
      </div>
    </div>
  </div>

  <!-- adding notification form -->
  <div class="modal fade" id="addNoti" tabindex="-1" aria-labelledby="addTempTenantLabel" aria-hidden="true"
    data-backdrop="false">
    <div class="modal-dialog-centered modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="loginTitle">Thêm thông báo cho khu trọ</h5>
          <button type="button" id="login-form-close-btn" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="login-form">

            <div class="form-floating mb-4">
              <input id="form2Example1" class="form-control" @focus="disableAddNoti = false" v-model="notiReq.title"
                placeholder="" required />
              <label class="form-label" for="form2Example1">Tiêu đề</label>
            </div>

            <div class="form-floating mb-4">
              <input id="form2Example2" class="form-control" @focus="disableAddNoti = false" v-model="notiReq.content"
                placeholder="" required />
              <label class="form-label" for="form2Example2">Nội dung</label>
            </div>

            <div class="text-center">
              <button type="submit" class=" btn btn-danger btn-block mb-4" v-on:click="addNotification"
                :disabled="disableAddNoti">Thêm</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import roomingHouseService from "@/services/roomingHouse.service";
import notificationService from '@/services/notification.service'
import categoryService from '@/services/category.service';
import userService from "../services/user.service";
import roomService from "@/services/room.service";
import review from "@/components/Review.vue";
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      roomingHouse: {
        lessor: {
          id: 5
        },
        category: {
          id: 9999999
        }
      },
      notiReq: {
        "roomingHouseId": 0,
        "roomId": null,
        "title": "",
        "content": "",
        "type": "rooming_house"
      },
      rooms: [],
      user: {},
      lessor: {},
      enableEditRoomingHouse: false,
      categories: [],
      categoryChoosen: 0,
      notifications: {},
      disableAddNoti: false,
    };
  },

  components: {
    review
  },

  computed: {
    getNotifications() {
      return this.notifications
    },
    checkOwner() {
      return (this.user.role == 'lessor' && this.roomingHouse.lessor.id == this.user.lessor?.id)
    },
  },

  methods: {
    async goToRoomInfo(id) {
      this.$router.push({ name: "room info", params: { id: id } })
    },
    async checkLogin() {
      try {
        var tokenBearer = this.$cookies.get("Token");
        this.user = await userService.getCurrentUser(tokenBearer);
      } catch (error) {
        // alert(error);
        this.$router.push({ name: "login" });
      }
    },
    async retrieveRoomingHouse() {
      try {
        this.categoryChoosen = this.roomingHouse.category.id
        this.roomingHouse = await roomingHouseService.getOne(this.$route.params.id);
        this.lessor = this.roomingHouse.lessor.user;
        this.retrieveRooms(this.roomingHouse.id)
      } catch (err) {
        console.log(err)
        this.displayError(err);
      }
    },
    async retrieveRooms(id) {
      try {
        this.rooms = await roomService.getAllByRoomingHouseID(id);
      } catch (err) {
        console.log(err)
        this.displayError(err);
      }
    },
    goToUserInfo(id) {
      this.$router.push({ name: "personal page", params: { id: id } })
    },
    async retrieveCategories() {
      try {
        this.categories = await categoryService.getAll();
      } catch (err) {
        console.log(err)
        this.displayError(err);
      }
    },
    async retrieveNotifications() {
      try {
        this.notifications = await notificationService.getAllByRoomingHouseId(this.roomingHouse.id)
        this.notifications = this.notifications.data;
      } catch (err) {
        console.log(err)
        this.displayError(err);
      }
    },
    async addNotification() {
      try {
        this.disableAddNoti = true
        var tokenBearer = this.$cookies.get("Token")
        this.notiReq.roomingHouseId = this.roomingHouse.id
        await notificationService.create(this.notiReq, tokenBearer)
        this.displaySuccess("Đã tạo thông báo thành công")
        await this.sleep(1000)
        this.$router.go()
      } catch (err) {
        console.log(err)
        this.displayError(err);
      }
    },
    showHeaderAndFooter() {
      this.$emit("isShowHeaderAndFooter", true);
    },
    async editRoomingHouse() {
      try {
        var tokenBearer = this.$cookies.get("Token");
        var roomingHouseUpdateReq = {
          "categoryId": this.categoryChoosen,
          "name": this.roomingHouse.name,
          "description": this.roomingHouse.description,
          "address": this.roomingHouse.address,
          "paymentExpiresDay": this.roomingHouse.paymentExpiresDay
        }
        this.validateEditRoomingHouseReq(roomingHouseUpdateReq)
        await roomingHouseService.update(this.roomingHouse.id, roomingHouseUpdateReq, tokenBearer)
        this.displaySuccess("Đã cập nhật khu trọ thành công")
        this.enableEditRoomingHouse = false;
        this.$router.go()
      } catch (err) {
        console.log(err)
        this.displayError(err);
      }
    },
    validateEditRoomingHouseReq(req) {
      if (req.name.length == 0) throw new Error("Tên khu trọ không được để trống")
      if (req.address.length <= 5) throw new Error("Địa chỉ khu trọ phải dài hơn 5 ký tự")
      if (req.paymentExpiresDay < 1 || req.paymentExpiresDay > 31) throw new Error("Ngày đóng tiền trọ hàng tháng phải từ 1 đến 31")
      if (req.description.length <= 8) throw new Error("Mô tả trọ phải có độ dài lớn hơn 8")
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
  },
  async mounted() {
    this.checkLogin();
    this.showHeaderAndFooter();
    await this.retrieveRoomingHouse();
    this.retrieveCategories();
    this.retrieveNotifications();
  }
}
</script>

<style>
.mt-4 {
  margin: 0;
}

.myroom-fee {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.room-body {
  display: flex;
  flex-direction: row;
}

#MyRoom-Information {
  margin: 50px 0px 0 0px;
}

#MyRoom-Information {
  justify-content: space-between;
  font-size: large;
  display: flex;
  width: calc(100% - 100px);
}

#MyRoom-Information1 {
  word-wrap: break-word;
  width: 50%;
}

#MyRoom-Information2 {
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

#AppHeader {
  position: static;
  background-color: #0F2C59;
}
</style>