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
        <h1 style="text-align: center;">{{ room.name }} Room Engineer</h1>  <!--TODO: remove Room Engineer-->
        <hr>
        <div style="display: flex; flex-direction: column;">

          <div class="roomDes" style="display: flex;">                      <!--TODO: using for loop-->
            <font-awesome-icon icon="wifi"/>
            <div>
              <div class="roomDesTitle">{{ roomDescription[0].Title }}</div>
              <div class="roomDesContent">{{ roomDescription[0].Content }}</div>
            </div>
          </div>

          <div class="roomDes" style="display: flex;">
            <font-awesome-icon icon="kitchen-set"/>
            <div>
              <div class="roomDesTitle">{{ roomDescription[1].Title }}</div>
              <div class="roomDesContent">{{ roomDescription[1].Content }}</div>
            </div>
          </div>

          <div class="roomDes" style="display: flex;">
            <font-awesome-icon icon="shower"/>
            <div>
              <div class="roomDesTitle">{{ roomDescription[2].Title }}</div>
              <div class="roomDesContent">{{ roomDescription[2].Content }}</div>
            </div>
          </div>

          
        </div>
        <hr>
        <div> <!--TODO: remove text-->
          Description: 
          {{ room.summary }} Trải nghiệm homestay tinh tế của chúng tôi trong một khu vườn tươi tốt với một bungalow bên hồ bơi tuyệt đẹp có sức chứa 2 người. Gia đình thân thiện của chúng tôi mời bạn đắm chìm trong khung cảnh mê hoặc này, lấy cảm hứng từ kiến trúc Việt Nam đích thực. Tận hưởng khung cảnh ngoạn mục từ sân thượng riêng nhìn ra vườn và núi. Vị trí thuận tiện, khám phá các điểm tham quan gần đó như Bái Đính, Tràng An, Hàng Mua, Tam Cốc, Thủ đô cổ Hoa Lư, Văn Long, và Vườn quốc gia Cúc Phương.
        </div>
      </div>
      <hr>
      <div>
        <h4>Nơi này có những gì cho bạn</h4>
      </div>
    </div>

    <div  style=" width: 40%;">
      <div id="MyRoom-Information2">
        <div class="myroom-fee" style="font-weight: bold;">Trạng thái phòng: <div>{{ roomingSubscription.state }}</div></div>
        <div class="myroom-fee">Giá điện:  <div>{{ room.electricityPrice }}</div></div>
        <div class="myroom-fee">Giá nước: <div>{{ room.waterPrice }}</div></div>
        <div class="myroom-fee">Giá phòng: <div>{{ room.roomPrice }} / tháng</div></div>
        <div class="myroom-fee">Rộng x Dài: <div>{{ room.width }} m x {{ room.height }} m</div></div>
        <div class="myroom-fee">Diện tích: <div>{{ room.dimensions }} m2</div></div>
        <hr>
        <button type="button" v-if="this.user.role == 'tenant'" class="btn btn-danger">Đăng ký</button>
        <button type="button" v-if="this.user.role == 'lessor'" class="btn btn-danger">Đăng ký</button>
    
        <hr>
        <div class="myroom-fee" style="font-weight: bold;">Tổng tiền hàng tháng: <div>{{  }}</div></div>
      </div>
    </div>
    </div>
  <div id="MyRoom-Information3">
    <hr>
    <div>
      <h3>Đánh giá</h3>
      <review/>
    </div>
    <hr>
    <div>
      <h3>Chủ nhà</h3>
      <div style="display: flex; justify-content: space-around; ">

        <div style="display: flex; width: 30%;" >
          <img class="rounded-circle" style="width: 100px;" src="../assets/avatar.jpg" alt=""> <!--TODO: using real avatar--> <!--TODO: add onclick event-->
          <div style="padding-left: 30px;">
            <div style="font-weight: bold; font-size: larger;">{{ lessor.fullName }}</div>
            <div><font-awesome-icon :icon="[ 'far', 'envelope' ]"/> {{ lessor.email }}</div>
            <div><font-awesome-icon :icon="[ 'fas', 'phone' ]"/> {{lessor.tel}}</div>
            <div><font-awesome-icon :icon="[ 'fas', 'gift' ]"/> {{lessor.dob}}</div>
          </div>
        </div>

        <div style="word-break: break-all; width: 70%;"> <!--TODO: remove text-->
          {{lessor.summary}} saddfsadfdsafsdafasdfsdafsdaasdfasdfasdfsdfdasfsaddfsadfdsafsdafasdfsdafsdaasdfasdfasdfsdfdasfsaddfsadfdsafsdafasdfsdafsdaasdfasdfasdfsdfdasfsaddfsadfdsafsdafasdfsdafsdaasdfasdfasdfsdfdasfsaddfsadfdsafsdafasdfsdafsdaasdfasdfasdfsdfdasfsaddfsadfdsafsdafasdfsdafsdaasdfasdfasdfsdfdasfsaddfsadfdsafsdafasdfsdafsdaasdfasdfasdfsdfdasfsaddfsadfdsafsdafasdfsdafsdaasdfasdfasdfsdfdasf
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
        lessor: {}
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
    async checkLogin(){
      try {
        var tokenBearer = this.$cookies.get("Token");
        this.user = await userService.getCurrentUser(tokenBearer);
      } catch (error) {
          alert(error);
          this.$router.push({ name: "login" });
      }
    },
    async retrieveRoom() {
      try {
        var roomingSubscriptionArr = await roomingSubscriptionService.getByLessorId(4);  // TODO: Passing real ID
        var roomingSubscription = roomingSubscriptionArr[0];
        var myroom = await roomService.getOne(1); // TODO: Passing real ID

        this.room = await roomService.getOne(this.$route.params.id);
        this.room.roomPrice = this.room.roomPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'})
        this.lessor = this.room.tenant.user;
        if (myroom.id == roomService.id) {
          this.$router.push("myroom")
        }
      } catch (err) {
        console.log(err);
      }
    },
    showHeaderAndFooter() {
      this.$emit("isShowHeaderAndFooter", true);
    },
  },

  mounted(){
    this.checkLogin();
    this.showHeaderAndFooter();
    this.retrieveRoom();
  }
}
</script>

<style>

hr{
  margin-top: 50px;
}
.roomDesContent, .roomDesTitle{
  padding-left: 20px;
}
.roomDes{
  margin-bottom: 25px;

}
.roomDesContent {
  font-size: smaller;
  color: #333;
  opacity: 0.7;
}
.column{
  padding: 0px;
}
.roomInfoImage{
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
#img3{
  border-top-right-radius: 25px;
}
#img5{
  border-bottom-right-radius: 25px;
}
#img1{
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  object-fit: cover;
  width: 100%;
  max-height: 100%;
}
#img2, #img3{
  object-fit: cover;
  width: 100%;
  max-height: 100%;
}
#img4, #img5{
  object-fit: cover;
  width: 100%;
  max-height: 100%;
}
.myroom-fee{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#MyRoom-Information, #MyRoom-Information3, #RoomInfo-Pictures{
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
#app{
  overflow: hidden;
}
#AppHeader {
  position: static;
  background-color: #0F2C59;
}
</style>