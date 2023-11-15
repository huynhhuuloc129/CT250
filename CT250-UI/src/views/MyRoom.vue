<template>
  <div style="width: 80%; align-items: center; margin: auto;">
    <div id="RoomInfo-Pictures">
      <div class="container">
        <div class="row">
          <div class="col-6 column">
            <img id="img1" class="roomInfoImage" src="../assets/room-info.jpg" alt=""> <!--TODO: using real room images-->
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-6 column">
                <img id="img2" class="roomInfoImage" src="../assets/room-info.jpg" alt="">
              </div>
              <div class="col-6 column">
                <img id="img3" class="roomInfoImage" src="../assets/room-info.jpg" alt="">
              </div>
            </div>
            <div class="row">
              <div class="col-6 column">
                <img id="img4" class="roomInfoImage" src="../assets/room-info.jpg" alt="">
              </div>
              <div class="col-6 column">
                <img id="img5" class="roomInfoImage" src="../assets/room-info.jpg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div id="MyRoom-Information">
      <div id="MyRoom-Information1">
        <div>
          <h1 style="text-align: center;">{{ room.name }}</h1>
          <!-- notification -->

          <div class="dropdown dropstart" style="text-align: right;  margin-bottom: 10px;">
            <font-awesome-icon class="btn btn-light" style="font-size: 25px;" icon="bell" id="notifiDropdown"
              data-bs-toggle="dropdown" aria-expanded="false" />
            <ul style="max-height: 500px; overflow: scroll; overflow-x: hidden; align-items: center; text-align: center;"
              class="dropdown-menu" aria-labelledby="notifiDropdown">
              <li v-for="noti in notifications" :key="noti.id"
                class="dropdown-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">{{ noti.title }}</div>
                  {{ noti.content }}
                  <p>
                    Ngày tạo: {{ noti.createdAt }}
                  </p>
                  <hr>
                </div>
              </li>
            </ul>
          </div>
          <hr class="hr">

          <!-- room description -->
          <div style="display: flex; flex-direction: column;">
            <div v-for="roomDescription in room.descriptions" class="roomDes" style="display: flex;">
              <div>
                <div class="roomDesTitle">{{ roomDescription.title }}</div>
                <div class="roomDesContent">{{ roomDescription.content }}</div>
              </div>
            </div>
          </div>

          <hr class="hr">
          <div>
            <span>Mô tả: </span>
            <span>{{ room.summary }}</span>
          </div>

          <hr class="hr">
          <div>
            <h4>Nơi này có những gì cho bạn</h4>
            <div v-for="ulti in utilities" style="display: flex;">
              <img style="width: 40px; height: 40px; margin: 0px 20px 20px 0;" :src="ulti.photo.url" alt="">
              <div style="font-weight: bold; margin-bottom: 5px;">{{ ulti.name }}</div>
            </div>
          </div>
        </div>
      </div>

      <div style=" width: 40%; display: flex; flex-direction: column;">
        <div id="MyRoom-Information2" style="border-radius: 15px 15px 0 0;">
          <div class="myroom-fee">Giá điện: <div>{{ room.electricityPrice }}</div>
          </div>
          <div class="myroom-fee">Giá nước: <div>{{ room.waterPrice }}</div>
          </div>
          <div class="myroom-fee">Giá phòng: <div>{{ room.roomPrice }} / tháng</div>
          </div>
          <div class="myroom-fee">Rộng x Dài: <div>{{ room.width }} m x {{ room.height }} m</div>
          </div>
          <div class="myroom-fee">Diện tích: <div>{{ room.dimensions }} m2</div>
          </div>
          <hr class="hr">
          <button type="button" v-if="getRoomingSubscriptionWantLeave == true" :disabled="true" class="btn btn-dark">Đã
            gửi yêu cầu hủy đăng ký</button>
          <button type="button" v-else class="btn btn-dark" @click="updateRoomingSubscription">Hủy đăng ký</button>
        </div>

        <div class="card" style="border-radius: 0 0 15px 15px;" v-if="tempTenants != null && tempTenants.length > 0">
          <div class="card-body">
            <ul class="list-group" v-for="tempTenant in tempTenants">
              <li class="list-group-item  align-items-center">
                <div> Họ tên: {{ tempTenant.fullName }}</div>
                <div>Căn cước công dân: {{ tempTenant.citizenId }}</div>
                <div>Ngày vào ở: {{ tempTenant.startDate }}</div>
                <div v-if="tempTenant.endDate != null">Ngày rời khỏi: {{ tempTenant.startDate }}</div>
              </li>
            </ul>
          </div>
        </div>

        <div class="container mt-5" style="margin-bottom: 20px;">
          <div class="accordion" id="toggleExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="toggleHeader">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#toggleContent"
                  aria-expanded="true" aria-controls="toggleContent">
                  <div id="listRoomsHeader">Hóa đơn hàng tháng</div>
                </button>
              </h2>
              <div id="toggleContent" style="width: 100%;" class="accordion-collapse collapse show"
                aria-labelledby="toggleHeader" data-bs-parent="#toggleExample">
                <div class="accordion-body">
                  <div class="card card-body room-body" style="margin-bottom: 30px;  width: 100%;"
                    v-for="(paymentRecord, index) in paymentRecords">

                    <div style="display: flex; justify-content: space-between; width: 100%;">
                      <div style="display: flex; flex-direction: column; width: 100%;">
                        <div style="font-weight: bold;">Tháng {{ paymentRecord.month }}, năm {{ paymentRecord.year }}
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                          <span>Giá nước: </span>
                          <span>{{ paymentRecord.monthWaterPrice.toLocaleString('vi', {
                            style: 'currency', currency: 'VND'
                          }) }}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                          <span>Giá điện: </span>
                          <span>{{ paymentRecord.monthElectricityPrice.toLocaleString('vi', {
                            style: 'currency', currency:
                              'VND'
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
                            style: 'currency', currency: 'VND'
                          }) }}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                          <span>Tiền nước:</span>
                          <span>{{ paymentRecord.waterPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })
                          }}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                          <span>Tiền điện:</span>
                          <span>{{ paymentRecord.electricityPrice.toLocaleString('vi', {
                            style: 'currency', currency:
                              'VND'
                          }) }}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                          <span>Phụ thu:</span>
                          <span v-if="paymentRecord.surcharge != null">{{ paymentRecord.surcharge.toLocaleString('vi', {
                            style: 'currency', currency: 'VND'
                          }) }}</span>
                          <span v-else>0</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                          <span>Tổng tiền:</span>
                          <span>{{ paymentRecord.monthTotalPrice.toLocaleString('vi', {
                            style: 'currency', currency: 'VND'
                          }) }}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                          <span>Trạng thái:</span>
                          <span v-if="paymentRecord.paidDate == null" style="color: red;">Chưa đóng</span>
                          <span v-else style="color: blue;">Đã đóng</span>
                        </div>
                        <div v-if="paymentRecord.paidDate != null" style="display: flex; justify-content: space-between;">
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



    <div id="MyRoom-Information3">
      <hr class="hr">
      <div>
        <h3 style="text-align: center;" v-if="this.reviews?.length == 0">Hiện tại phòng chưa có đánh giá nào</h3>
        <div v-if="this.reviews?.length > 0">
          <h3>Đánh giá</h3>
          <review :reviews="this.reviews" />
        </div>
        <br>
        <h4>Đánh giá của tôi</h4>

        <div>
          <star-rating v-model:rating="this.myReviewThisRoom.rating" @update:rating="setRating" :star-size="25"
            :border-color="activeColor" :show-border="true" :active-color="activeColor"></star-rating>

          <textarea class="form-control" v-model="myReviewThisRoom.comment" style="width: 50%; margin: 10px 0 10px 0;"
            name="" id="" cols="10" rows="5"></textarea>
          <button class="btn btn-primary" @click="updateReview">Cập nhật</button>
        </div>
      </div>
      <hr class="hr">
      <div>
        <h3>Chủ nhà</h3>
        <div style="display: flex; justify-content: space-around; ">

          <div style="display: flex; width: 30%;">
            <img class="rounded-circle" v-if="lessor.photo != null" style="width: 100px; height: 100px;"
              :src="lessor.photo.url" alt="">
            <div style="padding-left: 30px;">
              <div style="font-weight: bold; font-size: larger; text-decoration: underline; cursor: pointer;"
                @click="goToUserInfo(lessor.id)">{{ lessor.fullName }}</div>
              <div><font-awesome-icon :icon="['far', 'envelope']" /> {{ lessor.email }}</div>
              <div><font-awesome-icon :icon="['fas', 'phone']" /> {{ lessor.tel }}</div>
              <div><font-awesome-icon :icon="['fas', 'gift']" /> {{ lessor.dob }}</div>
            </div>
          </div>

          <div style="word-break: break-all; width: 70%;">
            {{ lessor.summary }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import roomingSubscriptionService from "@/services/roomingSubscription.service";
import roomDescriptionService from "@/services/roomDescription.service";
import notificationService from "@/services/notification.service";
import utilityService from "../services/utility.service";
import reviewService from "@/services/review.service";
import userService from "@/services/user.service";
import roomService from "@/services/room.service";
import review from "@/components/Review.vue";
import StarRating from 'vue-star-rating'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      roomDescription: [
        {
          "Title": "Phòng Trọ Sáng Sủa",
          "Content": "Phòng trọ rộng rãi và thoải mái với ánh sáng tự nhiên và tiện nghi cơ bản."
        },
        {
          "Title": " Vị Trí Tiện Lợi",
          "Content": "Nằm trong khu vực trung tâm, gần các cửa hàng, giao thông công cộng, và tiện ích hàng ngày."
        },
        {
          "Title": "Giá Phòng Hợp Lý",
          "Content": "Giá phòng trọ phải chăng, phù hợp với túi tiền và sẵn sàng dọn vào ngay."
        }
      ],
      activeColor: '#0F2C59',
      roomingSubscriptionArr: [],
      roomingSubscription: {},
      room: {},
      user: {},
      lessor: {},
      tenant: {},
      notifications: [],
      tempTenants: [],
      paymentRecords: [],
      reviews: [],
      myReviews: [],
      myReviewThisRoom: {},
      utilities: [],
    };
  },

  components: {
    review,
    StarRating,
  },

  computed: {
    getRoom() {
      return this.room;
    },
    getRoomingSubscription() {
      return this.roomingSubscription;
    },
    getRoomingSubscriptionWantLeave() {
      return this.roomingSubscription.state == 'want_leave'
    },
  },

  methods: {
    async checkLogin() {
      try {
        var tokenBearer = this.$cookies.get("Token");
        this.user = await userService.getCurrentUser(tokenBearer);
        this.tenant = this.user.tenant;
      } catch (error) {
        // alert(error);
        this.$router.push({ name: "login" });
      }
    },
    async retrieveRoom() {
      try {
        var tokenBearer = this.$cookies.get("Token");
        var roomingSubscriptionArr = await roomingSubscriptionService.getByTenantId(this.tenant.id);
        var roomingSubscription = roomingSubscriptionArr[0];
        if (roomingSubscription.state == 'staying' || roomingSubscription.state == 'want_leave') {
          var myroom = roomingSubscription.room;
          this.room = await roomService.getOne(myroom.id);
          this.room.roomPrice = this.room.roomPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })
          this.lessor = this.room.lessor.user
        }

        this.myReviews = await reviewService.getMyReview(tokenBearer)
        this.myReviews.forEach(review => {
          if (review.room.id == this.room.id && review.tenant.id == this.tenant.id) this.myReviewThisRoom = review
        });
        if (this.myReviews.length == 0 && this.user.role == 'tenant') {

          await reviewService.create(this.room.id, {
            "rating": 0,
            "comment": ""
          }, tokenBearer)
          this.myReviews = await reviewService.getMyReview(tokenBearer)
          this.myReviewThisRoom = this.myReviews[0]
        }
        this.reviews = await reviewService.getAllByRoomId(this.room.id)
      } catch (err) {
        console.log(err);
        this.displayError(err)
      }
    },
    async updateReview() {
      try {
        var tokenBearer = this.$cookies.get("Token");
        await reviewService.update(this.myReviewThisRoom.id, {
          "rating": this.myReviewThisRoom.rating,
          "comment": this.myReviewThisRoom.comment,
        }, tokenBearer)
        this.displaySuccess("Cập nhật đánh giá thành công")
        await this.sleep(1000)
        this.$router.go()
      } catch (err) {
        console.log(err)
        this.displayError(err)
      }
    },
    async updateRoomingSubscription() {
      Swal.fire({
        title: 'Bạn có chắc chắn muốn gửi yêu cầu hủy đăng ký nhà trọ này không?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Hủy',
        denyButtonText: `Gửi`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Đã hủy thao tác', '', 'info')
        } else if (result.isDenied) {
          this.cancelRequestRoomingSubscription()
        }
      })
    },
    async cancelRequestRoomingSubscription() {
      try {
        var tokenBearer = this.$cookies.get("Token");
        await roomingSubscriptionService.update(this.room.roomingHouse.id, this.room.id, this.roomingSubscription.id, {
          "startDate": this.roomingSubscription.startDate,
          "endDate": this.roomingSubscription.endDate,
          "state": "want_leave",
        }, tokenBearer)
        this.displaySuccess("Đã gửi yêu cầu hủy thành công")
        await this.sleep(1000)
        this.$router.go()
      } catch (err) {
        console.log(err)
        this.displayError(err)
      }
    },
    async retrieveTempTenantsAndPayment() {
      try {
        console.log(this.lessor)
        this.roomingSubscriptionArr = await roomingSubscriptionService.getByRoomIdAndStaying(this.room.id)
        if (this.roomingSubscriptionArr == 0) this.roomingSubscriptionArr = await roomingSubscriptionService.getByRoomIdAndWantLeave(this.room.id)
        if (this.roomingSubscriptionArr.length > 0) {
          this.roomingSubscription = await roomingSubscriptionService.getOne(this.roomingSubscriptionArr[0]?.id)
          this.tempTenants = this.roomingSubscription.temporaryTenants
          this.paymentRecords = this.roomingSubscription.paymentRecords
        }
      } catch (err) {
        console.log(err)
        this.displayError(err);
      }
    },
    async retrieveNotifications() {
      try {
        this.notifications = await notificationService.getAllByRoomId(this.room.id)
        this.notifications = this.notifications.data
      } catch (err) {
        console.log(err)
        this.displayError(err)
      }
    },
    async retrieveUtilities() {
      try {
        this.room.utilities.forEach(async (utility) => {
          let tempUti = await utilityService.getOne(utility.id)
          this.utilities.push(tempUti)
        });
        console.log(this.utilities)
      } catch (err) {
        console.log(err)
        this.displayError(err)
      }
    },
    goToUserInfo(id) {
      this.$router.push({ name: "personal page", params: { id: id } })
    },
    setRating(rating) {
      this.myReviewThisRoom.rating = rating
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
    await this.retrieveRoom();
    await this.retrieveNotifications();
    await this.retrieveTempTenantsAndPayment();
    await this.retrieveUtilities();
  }
}
</script>

<style>
.hr {
  margin-top: 50px;
}

.roomDesContent,
.roomDesTitle {
  padding-left: 20px;
}

.roomDes {
  margin-bottom: 25px;

}

.roomDesContent {
  font-size: smaller;
  color: #333;
  opacity: 0.7;
}

.column {
  padding: 0px;
}

.roomInfoImage {
  cursor: pointer;
  padding: 5px;
}

.roomInfoImage:hover {
  opacity: 0.8;
  transition: .7s ease;
}

.col {
  margin: 0;
  padding: 0;
  margin: 0;
}

#img3 {
  border-top-right-radius: 25px;
}

#img5 {
  border-bottom-right-radius: 25px;
}

#img1 {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  object-fit: cover;
  width: 100%;
  max-height: 100%;
}

#img2,
#img3 {
  object-fit: cover;
  width: 100%;
  max-height: 100%;
}

#img4,
#img5 {
  object-fit: cover;
  width: 100%;
  max-height: 100%;
}

.myroom-fee {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#MyRoom-Information,
#MyRoom-Information3,
#RoomInfo-Pictures {
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

#app {
  overflow: hidden;
}

#AppHeader {
  position: static;
  background-color: #0F2C59;
}
</style>