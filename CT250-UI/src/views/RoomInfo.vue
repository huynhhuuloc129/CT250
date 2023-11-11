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
          <input type="text" v-if="enableEditRoom" class="form-control" v-model="room.name">
          <h1 v-else style="text-align: center;">{{ room.name }}</h1>

          <!-- notification -->
          <div v-if="checkOwner" class="dropdown dropstart" style="text-align: right;  margin-bottom: 10px;">
            <font-awesome-icon class="btn btn-light" style="font-size: 25px;" icon="bell" id="notifiDropdown"
              data-bs-toggle="dropdown" aria-expanded="false" />
            <ul style="max-height: 500px; overflow: scroll; overflow-x: hidden; align-items: center; text-align: center;"
              class="dropdown-menu" aria-labelledby="notifiDropdown">
              <button style="width: 90%;" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#addNoti">+</button>
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
          <div style="display: flex; flex-direction: column;">

            <div v-for="roomDescription in room.descriptions" class="roomDes" style="display: flex;">
              <font-awesome-icon icon="wifi" />
              <div>
                <div class="roomDesTitle">{{ roomDescription.title }}</div>
                <div class="roomDesContent">{{ roomDescription.content }}</div>
              </div>
            </div>

            <button v-if="checkOwner" type="button" style="font-weight: bold;" class="btn btn-light"
              data-bs-toggle="modal" data-bs-target="#addDescriptionModal">
              Thêm mô tả ngắn</button>
          </div>

          <hr class="hr">
          <div>
            <h4>Nơi này có những gì cho bạn</h4>
            <div v-for="ulti in room.utilities">
              <div style="font-weight: bold; margin-bottom: 5px;">{{ ulti.name }}</div>
            </div>
            <button v-if="checkOwner" type="button" style="font-weight: bold; width: 100%;" class="btn btn-light"
              data-bs-toggle="modal" data-bs-target="#addRoomUtility">
              Thêm tiện ích</button>
          </div>

          <hr class="hr" v-if="room.descriptions != null && room.descriptions.length > 0">
          <div>
            Mô tả:
            <textarea v-if="enableEditRoom" v-model="room.summary" type="textarea" class="form-control"
              style="height: 100px;" rows="100"> </textarea>
            <span v-else>
              {{ room.summary }}
            </span>
          </div>
        </div>
      </div>

      <div style=" width: 40%; display: flex; flex-direction: column; ">
        <div id="MyRoom-Information2" style="border-radius: 15px 15px 0 0;">
          <div class="myroom-fee">Giá điện:
            <input type="number" class="form-control" v-if="enableEditRoom" v-model="room.electricityPrice"
              style="width: 20%; margin-bottom: 5px;">
            <div v-else>{{ room.electricityPrice }}</div>
          </div>

          <div class="myroom-fee">Giá nước:
            <input type="number" class="form-control" v-if="enableEditRoom" v-model="room.waterPrice"
              style="width: 20%; margin-bottom: 5px;">
            <div v-else>{{ room.waterPrice }}</div>
          </div>

          <div class="myroom-fee">Giá phòng:
            <input type="number" class="form-control" v-if="enableEditRoom" v-model="room.roomPrice"
              style="width: 20%; margin-bottom: 5px;">
            <div v-else>{{ room.roomPrice }} / tháng</div>
          </div>

          <div class="myroom-fee">
            <div style="width: 30%;">Rộng x Dài:</div>
            <div v-if="enableEditRoom" style="align-items: right; text-align: right;">
              <input type="number" v-model="room.width" style="width: 25%; margin-bottom: 5px;">
              <span> x </span>
              <input type="number" v-model="room.height" style="width: 25%; margin-bottom: 5px;">
            </div>
            <div v-else>{{ room.width }} m x {{ room.height }} m</div>
          </div>

          <div class="myroom-fee">Diện tích:
            <div>{{ room.dimensions }} m2</div>
          </div>

          <div class="myroom-fee">Trạng thái phòng:
            <div v-if="room.state == 'available'">Có sẵn</div>
            <div v-if="room.state != 'available'">Không có sẵn</div>
          </div>

          <div v-if="user.role == 'tenant'" style="display: flex; flex-direction: column;">
            <hr class="hr">
            <button type="button"
              v-if="roomingSubscriptionReq[0] != null && roomingSubscriptionReq[0].state == 'wating_tenant_call'"
              style="font-weight: bold; color: white;" :disabled=true class="btn btn-info"
              @click="confirmRegisterRoom()">Đang chờ chủ nhà phản hồi</button> <!-- // used to show only -->
            <button type="button" v-else :disabled="isDisabled" class="btn btn-danger" @click="confirmRegisterRoom()">Đăng
              ký</button>

          </div>
        </div>

        <button v-if="checkOwner && this.roomingSubscription != null" type="button"
          style="width: 100%; margin-top: 2px; font-weight: bold; border-radius: 0;" class="btn btn-danger"
          data-bs-toggle="modal" data-bs-target="#addTempTenantModal">
          Thêm người ở tạm thời</button>

        <div class="card" style="border-radius: 0 0 15px 15px;" v-if="tempTenants.length > 0 && checkOwner">
          <div class="card-body">
            <ul class="list-group" v-for="tempTenant in tempTenants">
              <li class="list-group-item  align-items-center">
                <div style="display: flex; justify-content: space-between;">
                  <div> Họ tên: {{ tempTenant.fullName }}</div>
                  <font-awesome-icon icon="trash" style="cursor: pointer" @click="deleteTempTenant(tempTenant.id)" />
                </div>
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
                    v-for="paymentRecord in roomingSubscription.paymentRecords">

                    <div style="display: flex; justify-content: space-between; width: 100%;">
                      <div style="display: flex; flex-direction: column; width: 100%;">
                        <div style="font-weight: bold;">Tháng {{ paymentRecord.month }}, năm {{
                          paymentRecord.year }}
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                          <span>Giá nước: </span>
                          <span>{{ paymentRecord.monthWaterPrice }}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                          <span>Giá điện: </span>
                          <span>{{ paymentRecord.monthElectricityPrice }}</span>
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
                          <span>{{ paymentRecord.monthRoomPrice }}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                          <span>Tiền nước:</span>
                          <span>{{ paymentRecord.waterPrice }}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                          <span>Tiền điện:</span>
                          <span>{{ paymentRecord.electricityPrice }}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                          <span>Phụ thu:</span>
                          <span v-if="paymentRecord.surcharge != null">{{ paymentRecord.surcharge
                          }}</span>
                          <span v-else>0</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                          <span>Tổng tiền:</span>
                          <span>{{ paymentRecord.monthTotalPrice }}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                          <span>Trạng thái:</span>
                          <span v-if="paymentRecord.paidDate == null" style="color: red;">Chưa
                            đóng</span>
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

        <!-- rooming subscription request  -->
        <div v-if="checkOwner && room.state != 'unavailable'" class="container mt-5" style="margin-bottom: 20px;">
          <div class="accordion" id="toggleExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="toggleHeader">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#toggleContent"
                  aria-expanded="true" aria-controls="toggleContent">
                  <div id="listRoomsHeader">Những yêu cầu đăng ký trọ</div>
                </button>
              </h2>
              <div id="toggleContent" class="accordion-collapse collapse show" aria-labelledby="toggleHeader"
                data-bs-parent="#toggleExample">
                <div class="accordion-body">
                  <div class="card card-body room-body" style="margin-bottom: 30px;"
                    v-for="(tenantOne, index) in tenantReq">

                    <div style="display: flex; justify-content: space-between;">
                      <div style="display: flex; flex-direction: column;">
                        <div style="font-weight: bold;">{{ tenantOne.user.fullName }}</div>
                        <div>{{ tenantOne.user.email }}</div>
                        <div>{{ tenantOne.user.tel }}</div>
                      </div>
                      <div>
                        <button type="button" style="margin-right: 5px;" class="btn btn-success"
                          @click="confirmApproveTenant(roomingSubscriptionReq[index].id)">Chấp nhận</button>
                        <button type="button" class="btn btn-danger"
                          @click="confirmRejectTenant(roomingSubscriptionReq[index].id)">Từ chối</button>

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
    <h2 style="text-align: right; cursor: pointer;" v-if="this.room.lessor.id == this.user.lessor?.id">
      <button class="btn btn-primary" v-if="enableEditRoom" style="margin-right: 5px;" @click="editRoom()">Cập
        nhật</button>
      <button class="btn btn-light" @click="enableEditRoom = !enableEditRoom">
        <font-awesome-icon icon="pen-to-square" style="font-size: 23px;" />
      </button>
    </h2>

    <div id="MyRoom-Information3">
      <hr class="hr">
      <h3 style="text-align: center;" v-if="this.room.reviews?.length == 0">Hiện tại phòng chưa có đánh giá nào</h3>
      <div v-if="this.room.reviews?.length > 0">
        <h3>Đánh giá</h3>
        <review :reviews="this.room.reviews" />
      </div>


      <star-rating v-model="selectedRating" :star-size="36" :border-color="activeColor" :show-border="true"
        :active-color="activeColor"></star-rating>


      <div v-if="this.room.lessor.id != this.user.lessor?.id">
        <hr class="hr">
        <div>
          <h3>Chủ nhà</h3>
          <div style="display: flex; justify-content: space-around; ">

            <div style="display: flex; width: 30%;">
              <img class="rounded-circle" style="width: 100px;" src="@/assets/avatar.jpg" alt="">
              <!--TODO: using real avatar--> <!--TODO: add onclick event-->
              <div style="padding-left: 30px;">
                <div style="font-weight: bold; font-size: larger;">{{ lessor.fullName }}</div>
                <div><font-awesome-icon :icon="['far', 'envelope']" /> {{ lessor.email }}</div>
                <div><font-awesome-icon :icon="['fas', 'phone']" /> {{ lessor.tel }}</div>
                <div><font-awesome-icon :icon="['fas', 'gift']" /> {{ lessor.dob }}</div>
              </div>
            </div>

            <div style="word-break: break-all; width: 70%;">
              {{ lessor.summary }}
            </div>
            <div>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>


  <!-- adding room description form -->
  <div class="modal fade" id="addDescriptionModal" tabindex="-1" aria-labelledby="addRoomModalLabel" aria-hidden="true"
    data-backdrop="false">
    <div class="modal-dialog-centered modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="loginTitle">Thêm mô tả ngắn</h5>
          <button type="button" id="login-form-close-btn" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="login-form">

            <div class="form-floating mb-4">
              <input id="form2Example1" class="form-control" @focus="buttonDescriptionDisable = false"
                v-model="roomDescriptionRequest.title" placeholder="" required />
              <label class="form-label" for="form2Example1">Tiêu đề</label>
            </div>

            <div class="form-floating mb-4">
              <input id="form2Example2" class="form-control" @focus="buttonDescriptionDisable = false"
                v-model="roomDescriptionRequest.content" placeholder="" required />
              <label class="form-label" for="form2Example2">Nội dung</label>
            </div>


            <div class="text-center">
              <button type="submit" class=" btn btn-dark btn-block mb-4" v-on:click="onAddingRoomDescription"
                :disabled="buttonDescriptionDisable">Thêm</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- adding temporary tenant form -->
  <div class="modal fade" id="addTempTenantModal" tabindex="-1" aria-labelledby="addTempTenantLabel" aria-hidden="true"
    data-backdrop="false">
    <div class="modal-dialog-centered modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="loginTitle">Thêm người ở tạm thời</h5>
          <button type="button" id="login-form-close-btn" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="login-form">

            <div class="form-floating mb-4">
              <input id="form2Example1" class="form-control" @focus="buttonTempTenantDisable = false"
                v-model="tempTenantReq.fullName" placeholder="" required />
              <label class="form-label" for="form2Example1">Họ và tên</label>
            </div>

            <div class="form-floating mb-4">
              <input id="form2Example2" class="form-control" @focus="buttonTempTenantDisable = false"
                v-model="tempTenantReq.citizenId" placeholder="" required />
              <label class="form-label" for="form2Example2">Số căn cước công dân</label>
            </div>

            <div class="form-floating mb-4">
              <input type="date" id="form2Example2" class="form-control" @focus="buttonTempTenantDisable = false"
                v-model="tempTenantReq.startDate" placeholder="" required />
              <label class="form-label" for="form2Example2">Ngày vào ở</label>
            </div>

            <div class="text-center">
              <button type="submit" class=" btn btn-danger btn-block mb-4" v-on:click="onAddingTempTenant"
                :disabled="buttonTempTenantDisable">Thêm</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- adding room utilities form -->
  <div class="modal fade" id="addRoomUtility" tabindex="-1" aria-labelledby="addRoomModalLabel" aria-hidden="true"
    data-backdrop="false">
    <div class="modal-dialog-centered modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="loginTitle">Thêm tiện ích</h5>
          <button type="button" id="login-form-close-btn" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="add-Form">

            <div class="form-check" v-for="(utility, index) in utilities">
              <input class="form-check-input" type="checkbox" :value="utility.id" :id="utility.id"
                v-model="utilitiesChoosen[index]">
              <label class="form-check-label" :for="utility.id">
                {{ utility.name }}
              </label>
            </div>


            <div class="text-center">
              <button type="submit" class=" btn btn-dark btn-block mb-4" v-on:click="onAddingUtilityRoom"
                :disabled="buttonUtilityDisable">Thêm</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- adding notification form -->
  <div class="modal fade" id="addNoti" tabindex="-1" aria-labelledby="addNotiLabel" aria-hidden="true"
    data-backdrop="false">
    <div class="modal-dialog-centered modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="notiTitle">Thêm thông báo cho nhà trọ này</h5>
          <button type="button" id="login-form-close-btn" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="login-form">

            <div class="form-floating mb-4">
              <input id="titleNoti" class="form-control" @focus="disableAddNoti = false" v-model="notiReq.title"
                placeholder="" required />
              <label class="form-label" for="titleNoti">Tiêu đề</label>
            </div>

            <div class="form-floating mb-4">
              <input id="contentNoti" class="form-control" @focus="disableAddNoti = false" v-model="notiReq.content"
                placeholder="" required />
              <label class="form-label" for="contentNoti">Nội dung</label>
            </div>

            <div class="text-center">
              <button type="submit" class="btn btn-dark btn-block mb-4" v-on:click="addNotification"
                :disabled="disableAddNoti">Thêm</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import roomingSubscriptionReqService from "@/services/roomingSubscriptionRequest.service";
import roomingSubscriptionService from "@/services/roomingSubscription.service";
import roomDescriptionService from "@/services/roomDescription.service";
import temporaryTenantService from "@/services/temporaryTenant.service"
import notificationService from "@/services/notification.service";
import utilityService from "@/services/utility.service";
import userService from "@/services/user.service";
import roomService from "@/services/room.service";
import review from "@/components/Review.vue";
import StarRating from 'vue-star-rating'
import Swal from 'sweetalert2'


export default {
  data() {
    return {
      selectedRating: 0,
      activeColor: 'red',
      roomDescriptionRequest: {
        "roomId": "",
        "title": "",
        "content": ""
      },
      tempTenantReq: {
        "fullName": "",
        "citizenId": "",
        "startDate": "12/12/2012",
      },
      notiReq: {
        "roomingHouseId": null,
        "roomId": 0,
        "title": "",
        "content": "",
        "type": "room"
      },
      buttonUtilityDisable: false,
      buttonDescriptionDisable: false,
      roomingSubscriptionReq: [],
      tenantReq: [],
      roomingSubscriptionArr: [],
      roomingSubscription: {},
      room: {
        lessor: {
          id: 0
        }
      },
      user: {},
      lessor: {},
      tenant: {},
      owner: {},
      enableEditRoom: false,
      utilitiesChoosen: [],
      utilities: [],
      tempTenants: [],
      paymentRecords: [],
      buttonTempTenantDisable: false,
      notifications: [],
      disableAddNoti: false,
    };
  },

  components: {
    review,
    StarRating
  },

  computed: {
    checkOwner() {
      return (this.user.role == 'lessor' && this.room.lessor.id == this.user.lessor.id)
    },
    isDisabled() {
      return (this.tenant != null && this.tenant.isRegistered) || this.room.state == 'unavailable'
    },
  },

  methods: {

    async checkLogin() {
      try {
        var tokenBearer = this.$cookies.get("Token");
        this.user = await userService.getCurrentUser(tokenBearer);

      } catch (error) {
        this.$router.push({ name: "login" });
      }
    },
    async onAddingRoomDescription() {
      try {
        this.buttonDescriptionDisable = true
        this.roomDescriptionRequest.roomId = this.room.id + "";
        var tokenBearer = this.$cookies.get("Token");
        await roomDescriptionService.create(this.roomDescriptionRequest, tokenBearer)
        this.displaySuccess("Tạo tiện ích thành công")
        await this.sleep(1000)
        this.$router.go();
      } catch (err) {
        console.log(err)
        this.displayError(err)
      }
    },
    async retrieveRoom() {
      try {
        this.room = await roomService.getOne(this.$route.params.id);
        this.room.roomPrice = this.room.roomPrice
        this.lessor = this.room.lessor.user

        if (this.user.role == "tenant") {
          var roomingSubscriptionArr = await roomingSubscriptionService.getByTenantId(this.user.tenant.id);
          var roomingSubscription = roomingSubscriptionArr[0];
          if (roomingSubscription != null && roomingSubscription.state == 'staying') {
            var myroom = roomingSubscription.room;
            this.tenant = roomingSubscription.tenant;
            if (myroom.id == this.room.id) {
              this.$router.push({ name: "myroom" })
            }
          }
        }

      } catch (err) {
        console.log(err)
        this.displayError(err);
      }
    },
    async editRoom() {
      try {
        var tokenBearer = this.$cookies.get("Token");
        var ulReq = [];
        for (let i = 0; i < this.room.utilities?.length; i++) {
          if (this.room.utilities[i]) {
            ulReq.push(this.room.utilities[i].id)
          }
        }
        var roomUpdateReq = {
          "name": this.room.name,
          "width": this.room.width,
          "height": this.room.height,
          "roomPrice": this.room.roomPrice,
          "waterPrice": this.room.waterPrice,
          "electricityPrice": this.room.electricityPrice,
          "summary": this.room.summary,
          "utilities": ulReq
        }
        await roomService.update(this.room.id, roomUpdateReq, tokenBearer)
        this.displaySuccess("Đã cập nhật phòng trọ thành công")
        this.enableEditRoom = false;
      } catch (err) {
        console.log(err)
        this.displayError(err);
      }
    },
    async retrieveRoomingSubscriptionReq() {
      try {
        this.roomingSubscriptionReq = await roomingSubscriptionReqService.getAllByRoomId(this.room.id);
        this.roomingSubscriptionReq.forEach(async element => {
          let oneTenant = await userService.getOneTenant(element.tenantId)
          this.tenantReq.push(oneTenant)
        });
      } catch (err) {
        console.log(err)
        this.displayError(err);
      }
    },
    async retrieveUtilities() {
      try {
        this.utilities = await utilityService.getAll();
        this.utilities.forEach(element => {
          var check = false
          this.room.utilities.forEach(ul => {
            if (element.id == ul.id) check = true;
          })
          this.utilitiesChoosen.push(check);
        });
      } catch (err) {
        console.log(err)
        this.displayError(err);
      }
    },
    async retrieveTempTenantsAndPayment() {
      try {
        this.roomingSubscriptionArr = await roomingSubscriptionService.getByRoomIdAndStaying(this.room.id)
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
    async addNotification() {
      try {
        this.disableAddNoti = true
        var tokenBearer = this.$cookies.get("Token")
        this.notiReq.roomId = this.room.id
        this.notiReq.roomingHouseId = this.room.roomingHouse.id
        await notificationService.create(this.notiReq, tokenBearer)
        this.displaySuccess("Đã tạo thông báo thành công")
        await this.sleep(1000)
        this.$router.go()
      } catch (err) {
        console.log(err)
        this.displayError(err);
      }
    },
    confirmRegisterRoom() {
      Swal.fire({
        title: 'Bạn có chắc chắn muốn gửi đăng ký đến phòng trọ này không?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Hủy',
        denyButtonText: `Gửi`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) { //revert 2 case for color
          Swal.fire('Đã hủy thao tác đăng ký', '', 'info')
        } else if (result.isDenied) {
          this.registerRoom();
        }
      })
    },
    async registerRoom() {
      try {
        var tokenBearer = this.$cookies.get("Token");
        await roomingSubscriptionReqService.create(this.room.roomingHouse.id, this.room.id, tokenBearer)
        this.displaySuccess("Đã đăng ký phòng trọ thành công")
        this.$router.go()
      } catch (err) {
        console.log(err)
        this.displayError(err);
      }
    },
    confirmApproveTenant(requestId) {
      Swal.fire({
        title: 'Bạn có chắc chắn muốn chấp nhận cho thuê phòng trọ này?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Hủy',
        denyButtonText: `Chấp nhận`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) { //revert 2 case for color
          Swal.fire('Đã hủy thao tác', '', 'info')
        } else if (result.isDenied) {
          this.approveTenant(requestId);
        }
      })
    },
    async approveTenant(requestId) {
      try {
        var tokenBearer = this.$cookies.get("Token");
        await roomingSubscriptionReqService.update(this.room.roomingHouse.id, this.room.id, requestId, "success", tokenBearer)
        this.displaySuccess("Chấp nhận yêu cầu thành công")
        await this.sleep(1000)
        this.$router.go()
      } catch (err) {
        console.log(err)
        this.displayError(err);
      }
    },
    confirmRejectTenant(requestId) {
      Swal.fire({
        title: 'Bạn có chắc chắn muốn từ chối yêu cầu thuê phòng trọ này?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Hủy',
        denyButtonText: `Từ chối`,
      }).then((result) => {
        if (result.isConfirmed) { //revert 2 case for color
          Swal.fire('Đã hủy thao tác', '', 'info')
        } else if (result.isDenied) {
          this.rejectTenant(requestId);
        }
      })
    },
    async rejectTenant(requestId) {
      try {
        var tokenBearer = this.$cookies.get("Token");
        await roomingSubscriptionReqService.update(this.room.roomingHouse.id, this.room.id, requestId, "reject", tokenBearer)
        this.displaySuccess("Từ chối yêu cầu thành công")
        await this.sleep(1000)
        this.$router.go()
      } catch (err) {
        console.log(err)
        this.displayError(err);
      }
    },
    async onAddingUtilityRoom() {
      try {
        this.buttonUtilityDisable = true
        var tokenBearer = this.$cookies.get("Token");
        var ulReq = [];
        for (let i = 0; i < this.utilitiesChoosen?.length; i++) {
          if (this.utilitiesChoosen[i]) {
            ulReq.push(this.utilities[i].id)
          }
        }
        var roomUpdateReq = {
          "name": this.room.name,
          "width": this.room.width,
          "height": this.room.height,
          "roomPrice": this.room.roomPrice,
          "waterPrice": this.room.waterPrice,
          "electricityPrice": this.room.electricityPrice,
          "summary": this.room.summary,
          "utilities": ulReq
        }
        await roomService.update(this.room.id, roomUpdateReq, tokenBearer)
        this.displaySuccess("Đã cập nhật tiện ích cho trọ thành công")
        await this.sleep(1000)
        this.$router.go();
      } catch (err) {
        console.log(err)
        this.displayError(err);
      }
    },
    async onAddingTempTenant() {
      try {
        this.buttonTempTenantDisable = true
        var tokenBearer = this.$cookies.get("Token");
        await temporaryTenantService.create(this.roomingSubscription.id, this.tempTenantReq, tokenBearer)
        this.displaySuccess("Tạo người ở tạm thời thành công")
        await this.sleep(1000)
        this.$router.go();
      } catch (err) {
        console.log(err)
        this.displayError(err);
      }
    },
    async deleteTempTenant(id) {
      try {
        var tokenBearer = this.$cookies.get("Token");
        await temporaryTenantService.delete(id, tokenBearer)
        this.displaySuccess("Xóa người ở tạm thời thành công")
        await this.sleep(1000)
        this.$router.go();
      } catch (err) {
        console.log(err)
        this.displayError(err);
      }
    },
    showHeaderAndFooter() {
      this.$emit("isShowHeaderAndFooter", true);
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
    await this.checkLogin();
    this.showHeaderAndFooter();
    await this.retrieveRoom();
    await this.retrieveRoomingSubscriptionReq();
    await this.retrieveUtilities();
    await this.retrieveTempTenantsAndPayment();
    await this.retrieveNotifications();
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