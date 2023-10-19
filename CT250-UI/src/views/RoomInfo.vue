<template>
    <div id="MyRoom-Information">
      <div id="MyRoom-Information1">
        <h1 >{{ room.name }}</h1>
        <hr>
        <div>
          Description: 
          {{ room.summary }} wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
        </div>
        
      </div>
    
      <div id="MyRoom-Information2">
        <div class="myroom-fee">Trạng thái phòng: <div>{{ roomingSubscription.state }}</div></div>
        <div class="myroom-fee">Giá điện:  <div>{{ room.electricityPrice }}</div></div>
        <div class="myroom-fee">Giá nước: <div>{{ room.waterPrice }}</div></div>
        <div class="myroom-fee">Giá phòng: <div>{{ room.roomPrice }} / tháng</div></div>
        <div class="myroom-fee">Rộng x Dài: <div>{{ room.width }} x {{ room.height }}</div></div>
        <div class="myroom-fee">Diện tích: <div>{{ room.dimensions }}</div></div>
        <hr>
        <button type="button" class="btn btn-danger">Hủy đăng ký</button>
        <div class="myroom-fee" style="text-decoration: underline;">Phụ thu tháng này: <div>{{  }}</div></div>
        <hr>
        <div class="myroom-fee" style="font-weight: bold;">Tổng tiền hàng tháng: <div>{{  }}</div></div>
      </div>
    </div>
    <div id="MyRoom-Information3">
      <hr>
      <div>
        <h3>Đánh giá</h3>
      </div>
      <hr>
      <div>
        <h3>Chủ nhà</h3>
    
      </div>
    </div>
    </template>
    
    <script>
    import room from "@/services/room.service";
    import roomingSubscriptionService from "@/services/roomingSubscription.service";
    import userService from "@/services/user.service";
    export default {
      data() {
          return {
              roomingSubscriptionArr: [],
              roomingSubscription: {},
              room: {},
              user: {}
          };
      },
    
      components: {
    
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
              console.log(this.user.id)
            } catch (error) {
                alert(error);
                this.$router.push({ name: "login" });
            }
          },
        async retrieveRoom() {
          try {
            this.roomingSubscriptionArr = await roomingSubscriptionService.getByLessorId(this.user.id);
            console.log(this.roomingSubscriptionArr[0])
            this.roomingSubscription = this.roomingSubscriptionArr[0];
            this.room = await room.getOne(this.roomingSubscription.roomId);
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
    .myroom-fee{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    #MyRoom-Information, #MyRoom-Information2, #MyRoom-Information3 {
      margin: 100px;
    }
    #MyRoom-Information {
      justify-content: space-around;
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
      width: 40%;
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