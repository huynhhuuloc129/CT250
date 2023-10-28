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
          <hr class="hr">
          <div style="display: flex; flex-direction: column;">

            <div class="roomDes" style="display: flex;"> <!--TODO: using for loop-->
              <font-awesome-icon icon="wifi" />
              <div>
                <div class="roomDesTitle">{{ roomDescription[0].Title }}</div>
                <div class="roomDesContent">{{ roomDescription[0].Content }}</div>
              </div>
            </div>

            <div class="roomDes" style="display: flex;">
              <font-awesome-icon icon="kitchen-set" />
              <div>
                <div class="roomDesTitle">{{ roomDescription[1].Title }}</div>
                <div class="roomDesContent">{{ roomDescription[1].Content }}</div>
              </div>
            </div>

            <div class="roomDes" style="display: flex;">
              <font-awesome-icon icon="shower" />
              <div>
                <div class="roomDesTitle">{{ roomDescription[2].Title }}</div>
                <div class="roomDesContent">{{ roomDescription[2].Content }}</div>
              </div>
            </div>


          </div>
          <hr class="hr">
          <div>
            Description:
            {{ room.summary }}
          </div>

          <hr class="hr">
          <div>
            <h4>Nơi này có những gì cho bạn</h4>
          </div>
        </div>
      </div>

      <div style=" width: 40%; display: flex; flex-direction: column;">
        <div id="MyRoom-Information2">
          <div class="myroom-fee" style="font-weight: bold;">Trạng thái phòng: <div>{{ roomingSubscription.state }}</div>
          </div>
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
          <button type="button" class="btn btn-dark">Hủy đăng ký</button>
        </div>
      </div>
    </div>



    <div id="MyRoom-Information3">
      <hr class="hr">
      <div>
        <h3>Đánh giá</h3>
        <review />
      </div>
      <hr class="hr">
      <div>
        <h3>Chủ nhà</h3>
        <div style="display: flex; justify-content: space-around; ">

          <div style="display: flex; width: 30%;">
            <img class="rounded-circle" style="width: 100px;" src="../assets/avatar.jpg" alt="">
            <!--TODO: using real avatar--> <!--TODO: add onclick event-->
            <div style="padding-left: 30px;">
              <div style="font-weight: bold; font-size: larger;">{{ lessor.fullName }}</div>
              <div><font-awesome-icon :icon="['far', 'envelope']" /> {{ lessor.email }}</div>
              <div><font-awesome-icon :icon="['fas', 'phone']" /> {{ lessor.tel }}</div>
              <div><font-awesome-icon :icon="['fas', 'gift']" /> {{ lessor.dob }}</div>
            </div>
          </div>

          <div style="word-break: break-all; width: 70%;">
            Tôi xin giới thiệu mình là chủ trọ của khu vực này. Với tinh thần nhiệt tình và lòng nhiệt huyết trong việc
            quản lý và xây dựng một môi trường sống thoải mái và an lành cho tất cả cư dân, tôi luôn sẵn sàng làm việc
            chăm sóc và đảm bảo rằng mọi người tại khu này đều có một trải nghiệm sống tốt đẹp. Tôi rất mong được hợp tác
            với mọi người để tạo nên một cộng đồng thân thiện và đoàn kết, nơi mà mọi người có thể gọi đó là ngôi nhà thứ
            hai của mình. Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào, xin đừng ngần ngại liên hệ với tôi. Cảm ơn bạn đã
            đến và làm cho khu vực này trở thành một nơi đáng sống!
          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import roomingSubscriptionService from "@/services/roomingSubscription.service";
import userService from "@/services/user.service";
import roomService from "@/services/room.service";
import review from "@/components/Review.vue";

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
      roomingSubscriptionArr: [],
      roomingSubscription: {},
      room: {},
      user: {},
      lessor: {},
      tenant: {}
    };
  },

  components: {
    review
  },

  computed: {
    getRoom() {
      return this.room;
    },
    getRoomingSubscription() {
      return this.roomingSubscription;
    }
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
        var roomingSubscriptionArr = await roomingSubscriptionService.getByTenantId(this.tenant.id);
        var roomingSubscription = roomingSubscriptionArr[0];
        if (roomingSubscription.state == 'staying') {
          var myroom = roomingSubscription.room;
          this.room = await roomService.getOne(myroom.id);
          this.room.roomPrice = this.room.roomPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })
          this.lessor = this.room.lessor.user
        }
      } catch (err) {
        console.log(err);
      }
    },
    showHeaderAndFooter() {
      this.$emit("isShowHeaderAndFooter", true);
    },
  },

  async mounted() {
    await this.checkLogin();
    this.showHeaderAndFooter();
    this.retrieveRoom();
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