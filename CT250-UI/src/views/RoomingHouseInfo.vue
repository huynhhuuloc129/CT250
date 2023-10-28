<template>
  <div style="width: 80%; align-items: center; margin: auto;">
    <div id="MyRoom-Information">
      <div id="MyRoom-Information1">
        <div>
          <h1 style="text-align: center;">{{ roomingHouse.name }}</h1>

          <hr>
          <div>
            Description:
            {{ roomingHouse.description }}
          </div>
        </div>
        <hr>
      </div>

      <div style=" width: 40%;">
        <div id="MyRoom-Information2">
          <div class="myroom-fee">Địa chỉ: <div>{{ roomingHouse.address }}</div>
          </div>
          <div class="myroom-fee">Số phòng: <div>{{ roomingHouse.totalRoomNumber }}</div>
          </div>
          <div class="myroom-fee">Số phòng còn trống: <div>{{ roomingHouse.availableRoomNumber }}</div>
          </div>
          <div class="myroom-fee">Ngày trả tiền hàng tháng: <div>{{ roomingHouse.paymentExpiresDate }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-4" style="margin-bottom: 20px;">
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

                <div>
                  <h4>{{ room.name }}</h4>
                  <div>{{ room.summary }}</div>
                  <br>
                  <div style="display: flex; flex-direction: row; justify-content: space-between;">
                    <div style="font-weight: bold; font-size: large;">Tiền phòng hàng tháng: <div style="color: red;">{{
                      room.roomPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' }) }}</div>
                    </div>
                    <button class="btn btn-primary" style="background-color: #2c5596;" @click="goToRoomInfo(room.id)">Xem chi tiết</button>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h3>Chủ nhà</h3>
      <div style="display: flex; justify-content: space-around; ">

        <div style="display: flex; width: 30%;">
          <img class="rounded-circle" style="width: 100px;" src="../assets/avatar.jpg" alt=""><!-- TODO: using real avatar -->
          <!-- TODO: add on click event -->
          <div style="padding-left: 30px;">
            <div style="font-weight: bold; font-size: larger;">{{ lessor.fullName }}</div>
            <div><font-awesome-icon :icon="['far', 'envelope']" /> {{ lessor.email }}</div>
            <div><font-awesome-icon :icon="['fas', 'phone']" /> {{ lessor.tel }}</div>
            <div><font-awesome-icon :icon="['fas', 'gift']" /> {{ lessor.dob }}</div>
          </div>
        </div>

        <div style="word-break: normal; width: 60%;"> <!--TODO: remove text-->
          Tôi, với tư cách là chủ trọ của khu vực này, cam kết tạo ra một môi trường sống an toàn, sạch sẽ và thoải mái
          cho tất cả cư dân. Chúng tôi luôn lắng nghe ý kiến và phản hồi từ mọi người để cải thiện dịch vụ và điều kiện
          sống tại đây. Chúng tôi có một đội ngũ quản lý chuyên nghiệp và thân thiện, sẵn sàng hỗ trợ trong mọi tình
          huống, từ việc bảo trì căn hộ đến giải quyết các vấn đề liên quan đến cuộc sống hàng ngày. </div>
        <div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import review from "@/components/Review.vue";

import roomService from "@/services/room.service";
import userService from "../services/user.service";
import roomingHouseService from "@/services/roomingHouse.service";

export default {
  data() {
    return {
      roomingHouse: {},
      rooms: [],
      user: {},
      lessor: {}
    };
  },

  components: {
    review
  },

  computed: {
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
        alert(error);
        this.$router.push({ name: "login" });
      }
    },
    async retrieveRoomingHouse() {
      try {
        this.roomingHouse = await roomingHouseService.getOne(this.$route.params.id);
        this.lessor = this.roomingHouse.lessor.user;
        console.log(this.lessor)
        this.retrieveRooms(this.roomingHouse.id)
      } catch (err) {
        console.log(err);
      }
    },
    async retrieveRooms(id) {
      try {
        this.rooms = await roomService.getAllByRoomingHouseID(id);
      } catch (err) {
        console.log(err);
      }
    },
    showHeaderAndFooter() {
      this.$emit("isShowHeaderAndFooter", true);
    },
  },

  mounted() {
    this.checkLogin();
    this.showHeaderAndFooter();
    this.retrieveRoomingHouse();
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
}</style>