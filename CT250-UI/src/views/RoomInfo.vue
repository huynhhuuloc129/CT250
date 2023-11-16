<template>
  <div style="width: 80%; align-items: center; margin: auto;">
    <div id="RoomInfo-Pictures">
      <div class="container">
        <div class="row" v-if="room.photos != null">
          <div class="col-6 column">
            <img style="height: 100%;, width: auto;" v-if="room.photos.length > 0 && room.photos[0] != null" id="img1"
              class="roomInfoImage" data-bs-toggle="modal" data-bs-target="#loginModal"
              @click="selectedImage = room.photos[0].id" :src="room.photos[0].url" alt="">
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-6 column">
                <img style="height: 100%;, width: auto;" v-if="room.photos.length > 1 && room.photos[1] != null" id="img2"
                  class="roomInfoImage" data-bs-toggle="modal" data-bs-target="#loginModal"
                  @click="selectedImage = room.photos[1].id" :src="room.photos[1].url" alt="">
              </div>
              <div class="col-6 column">
                <img style="height: 100%;, width: auto;" v-if="room.photos.length > 2 && room.photos[2] != null" id="img3"
                  class="roomInfoImage" data-bs-toggle="modal" data-bs-target="#loginModal"
                  @click="selectedImage = room.photos[2].id" :src="room.photos[2].url" alt="">
              </div>
            </div>
            <div class="row">
              <div class="col-6 column">
                <img style="height: 100%;, width: auto;" v-if="room.photos.length > 3 && room.photos[3] != null" id="img4"
                  class="roomInfoImage" data-bs-toggle="modal" data-bs-target="#loginModal"
                  @click="selectedImage = room.photos[3].id" :src="room.photos[3].url" alt="">
              </div>
              <div class="col-6 column">
                <img style="height: 100%;, width: auto;" v-if="room.photos.length > 4 && room.photos[4] != null" id="img5"
                  class="roomInfoImage" data-bs-toggle="modal" data-bs-target="#loginModal"
                  @click="selectedImage = room.photos[4].id" :src="room.photos[4].url" alt="">
              </div>
            </div>
          </div>
        </div>

        <div v-if="checkOwner" class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel"
          aria-hidden="true" data-backdrop="false">
          <div class="modal-dialog-centered modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="loginTitle">Cập nhật hình ảnh</h5>
                <button type="button" id="login-form-close-btn" class="btn-close" data-bs-dismiss="modal"
                  aria-label="Close"></button>
              </div>
              <div class="modal-body">

                <div style="width: 100%; text-align: center;" v-if="checkOwner" class="container col-md-6">
                  <div class="mb-5">
                    <label for="Image" class="form-label">Thêm hình ảnh</label>
                    <input class="form-control" type="file" id="formFile" @change="preview">
                    <button @click="updateImage" class="btn btn-primary mt-3">Cập nhật</button>
                  </div>
                  <img id="frame" src="" class="img-fluid" />
                </div>

              </div>
            </div>
          </div>
        </div>

        <div style="text-align: center;" v-if="checkOwner && this.room.photos.length < 5" class="container col-md-6">
          <div class="mb-5">
            <label for="Image" class="form-label">Thêm hình ảnh</label>
            <input class="form-control" type="file" id="formFile" @change="preview">
            <button @click="updateImage" class="btn btn-primary mt-3">Cập nhật</button>
          </div>
          <img id="frame" src="" class="img-fluid" />
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
              <div style="display: flex; justify-content: space-between; width: 100%;">
                <div>
                  <div class="roomDesTitle">{{ roomDescription.title }}</div>
                  <div class="roomDesContent">{{ roomDescription.content }}</div>
                </div>
                <button class="btn btn-light" @click="selectedIdRoomDes = roomDescription.id; editRoomDescriptionRequest.title = roomDescription.title;
                editRoomDescriptionRequest.content = roomDescription.content" data-bs-toggle="modal"
                  data-bs-target="#editDescriptionModal">
                  <font-awesome-icon icon="pen-to-square" />
                </button>
              </div>
            </div>

            <button v-if="checkOwner" type="button" style="font-weight: bold;" class="btn btn-light"
              data-bs-toggle="modal" data-bs-target="#addDescriptionModal">
              Thêm mô tả ngắn</button>
          </div>

          <hr class="hr">
          <div>
            <h4>Nơi này có những gì cho bạn</h4>
            <div v-for="ulti in room.utilities" style="display: flex;">
              <img style=" width: 40px; height: 40px; margin: 0px 20px 20px 0;" :src="ulti.photo.url" alt="">
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
              style="height: 300px;" rows="1000"> </textarea>
            <span v-else>
              {{ room.summary }}
            </span>
          </div>
        </div>
      </div>

      <div v-if="room.electricityPrice != null" style=" width: 40%; display: flex; flex-direction: column; ">
        <div id="MyRoom-Information2" style="border-radius: 15px 15px 0 0;">
          <div class="myroom-fee">Giá điện:
            <input type="number" class="form-control" v-if="enableEditRoom" v-model="room.electricityPrice"
              style="width: 20%; margin-bottom: 5px;">
            <div v-else>{{ room.electricityPrice.toLocaleString('vi', {
              style: 'currency', currency:
                'VND'
            }) }}</div>
          </div>

          <div class="myroom-fee">Giá nước:
            <input type="number" class="form-control" v-if="enableEditRoom" v-model="room.waterPrice"
              style="width: 20%; margin-bottom: 5px;">
            <div v-else>{{ room.waterPrice.toLocaleString('vi', {
              style: 'currency', currency:
                'VND'
            }) }}</div>
          </div>

          <div class="myroom-fee">Giá phòng:
            <input type="number" class="form-control" v-if="enableEditRoom" v-model="room.roomPrice"
              style="width: 20%; margin-bottom: 5px;">
            <div v-else>{{ room.roomPrice.toLocaleString('vi', {
              style: 'currency', currency:
                'VND'
            }) }} / tháng</div>
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
          <div v-if="getRoomingSubscriptionWantLeave == true" style="display: flex; justify-content: space-between;">
            <span style="color: red; font-weight: bold;">Hiện đang có yêu cầu hủy đăng ký trọ</span>
            <div>
              <button type="button" style="margin-right: 5px;" @click="confirmReject" class="btn btn-success">
                Chấp nhận</button>
              <button type="button" class="btn btn-danger" @click="rejecting">Từ chối</button>
            </div>
          </div>
          <br>
          <div v-if="(roomingSubscription.state == 'staying' || roomingSubscription.state == 'want_leave') && checkOwner"
            class="alert alert-danger" role="alert">
            Hủy vai trò của người thuê trọ
            <button v-if="checkOwner" type="button"
              style="width: 100%; margin-top: 2px; font-weight: bold; border-radius: 0; background-color: red;"
              class="btn btn-danger" @click="confirmRemoveTenant">
              Hủy vai trò</button>
          </div>

          <div class="card" style="border-radius: 15px"
            v-if="roomingSubscription != null && roomingSubscription.tenant != null">
            <div class="card-body">
              <h4>Thành viên đang ở</h4>
              <div style="display: flex; justify-content: space-between;">
                <div>
                  <span>Họ tên: </span>
                  <span style="cursor: pointer; font-weight: bold; text-decoration: underline;"
                    @click="goToUserInfo(roomingSubscription.tenant.user.id)">
                    {{ roomingSubscription.tenant.user.fullName }}</span>
                </div>
              </div>
              <div>
                <span>Số điện thoại: </span>
                <span> {{ roomingSubscription.tenant.user.tel }}</span>
              </div>
              <div v-if="checkOwner">
                <span>Căn cước công dân: </span>
                <span> {{ roomingSubscription.tenant.user.citizenID }}</span>
              </div>
              <div>
                <span>Email: </span>
                <span> {{ roomingSubscription.tenant.user.email }}</span>
              </div>
              <div>
                <span>Ngày vào ở: </span>
                <span> {{ roomingSubscription.startDate }}</span>
              </div>
            </div>
          </div>
        </div>


        <button v-if="checkOwner" type="button" style="width: 100%; margin-top: 2px; font-weight: bold; border-radius: 0;"
          class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#addTempTenantModal">
          Thêm người ở tạm thời</button>

        <div class="card" style="border-radius: 0 0 15px 15px;"
          v-if="tempTenants.length > 0 && (checkOwner || user.role == 'admin')">
          <div class="card-body">
            <h5>Thành viên ở tạm thời</h5>
            <ul class="list-group" v-for="tempTenant in tempTenants">
              <li class="list-group-item  align-items-center">
                <div style="display: flex; justify-content: space-between;">
                  <div> Họ tên: {{ tempTenant.fullName }}</div>
                  <button class="btn-light btn">
                    <font-awesome-icon icon="pen-to-square" v-if="checkOwner" data-bs-toggle="modal"
                      data-bs-target="#editTempTenantModal" @click="selectedIdTempTenant = tempTenant.id;
                      editTempTenantRequest.fullName = tempTenant.fullName;
                      editTempTenantRequest.citizenId = tempTenant.citizenId;
                      editTempTenantRequest.startDate = tempTenant.startDate;
                      editTempTenantRequest.endDate = tempTenant.endDate;" />
                  </button>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <div>Căn cước công dân: {{ tempTenant.citizenId }}</div>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <div>
                    Ngày vào ở: {{ tempTenant.startDate }}
                  </div>
                  <font-awesome-icon icon="trash" v-if="checkOwner" style="cursor: pointer"
                    @click="deleteTempTenant(tempTenant.id)" />
                </div>
                <div v-if="tempTenant.endDate != null">Ngày rời khỏi: {{ tempTenant.endDate }}</div>
              </li>
            </ul>
          </div>
        </div>

        <div class="container mt-5" v-if="checkOwner || user.role == 'admin'" style="margin-bottom: 20px;">
          <div class="accordion" id="toggleExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="toggleHeader">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#toggleContent"
                  aria-expanded="true" aria-controls="toggleContent">
                  <div id="listRoomsHeader">Hóa đơn hàng tháng</div>
                </button>
              </h2>
              <div id="toggleContent" style="width: 100%;" class="accordion-collapse collapse"
                aria-labelledby="toggleHeader" data-bs-parent="#toggleExample">
                <button class="btn btn-success" style="width: 100%;" @click="exportToPDF">Xuất hóa đơn</button>
                <div class="accordion-body" ref="content" style="text-align: center;">
                  <div class="card card-body room-body" style="margin-bottom: 30px;  width: 440px;"
                    v-for="(paymentRecord, index) in roomingSubscription.paymentRecords">

                    <div style="display: flex; justify-content: space-between; width: 100%;">
                      <div style="display: flex; flex-direction: column; width: 100%;">
                        <div style="display: flex; justify-content: space-between">
                          <div style="font-weight: bold;">
                            <div>
                              Tháng {{ paymentRecord.month }}, năm {{ paymentRecord.year }}
                            </div>
                          </div>
                          <div class="form-check form-switch">
                            <input style="cursor: pointer" class="form-check-input" v-model="checkPaid[index]"
                              type="checkbox" id="flexSwitchCheckDefault"
                              @click="updatePaymentRecord(paymentRecord, index)">
                          </div>
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
                          })
                          }}</span>
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
          <div class="accordion" id="toggleExample1">
            <div class="accordion-item">
              <h2 class="accordion-header" id="toggleHeader1">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#toggleContent1"
                  aria-expanded="true" aria-controls="toggleContent1">
                  <div id="listRoomsHeader1">Những yêu cầu đăng ký trọ</div>
                </button>
              </h2>
              <div id="toggleContent1" class="accordion-collapse collapse" aria-labelledby="toggleHeader1"
                data-bs-parent="#toggleExample1">
                <div class="accordion-body">
                  <div class="card card-body room-body" style="margin-bottom: 30px;"
                    v-for="(tenantOne, index) in tenantReq">

                    <div style="display: flex; justify-content: space-between;">
                      <div style="display: flex; flex-direction: column;">
                        <div style="font-weight: bold; cursor: pointer; text-decoration: underline;t"
                          @click="goToUserInfo(tenantOne.user.id)">{{
                            tenantOne.user.fullName }}</div>
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
      <font-awesome-icon @click="enableEditRoom = !enableEditRoom" icon="pen-to-square" />
    </h2>

    <div id="MyRoom-Information3">
      <hr class="hr">
      <h3 style="text-align: center;" v-if="this.reviews?.length == 0">Hiện tại phòng chưa có đánh giá nào</h3>
      <div v-if="this.reviews?.length > 0">
        <h3>Đánh giá</h3>
        <review :reviews="this.reviews" />
      </div>

      <div v-if="checkStayed">
        <h4>Đánh giá của tôi</h4>

        <star-rating v-model:rating="this.myReviewThisRoom.rating" @update:rating="setRating" :star-size="25"
          :border-color="activeColor" :show-border="true" :active-color="activeColor"></star-rating>

        <textarea class="form-control" v-model="myReviewThisRoom.comment" style="width: 50%; margin: 10px 0 10px 0;"
          name="" id="" cols="10" rows="5"></textarea>
        <button class="btn btn-primary" @click="updateReview">Cập nhật</button>
      </div>

      <div v-if="this.room.lessor.id != this.user.lessor?.id">
        <hr class="hr">
        <div>
          <h3>Chủ nhà</h3>
          <div style="display: flex; justify-content: space-around; ">

            <div style="display: flex; width: 30%;">
              <img v-if="lessor.photo != null" class="rounded-circle" style="width: 100px; height: 100px;"
                :src="lessor.photo.url" alt="">
              <div style="padding-left: 30px;">
                <div style="font-weight: bold; font-size: larger; cursor: pointer; text-decoration: underline;"
                  @click="goToUserInfo(lessor.id)">{{
                    lessor.fullName }}</div>
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

  <!-- edit temp tenant form -->
  <div class="modal fade" id="editTempTenantModal" tabindex="-1" aria-labelledby="editTempTenantModal" aria-hidden="true"
    data-backdrop="false">
    <div class="modal-dialog-centered modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editTempTenantTitle">Cập nhật người ở tạm thời</h5>
          <button type="button" id="login-form-close-btn4" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="login-form">

            <div class="form-floating mb-4">
              <input type="text" id="form2Example4" class="form-control" @focus="buttonTempTenantDisable = false"
                v-model="editTempTenantRequest.fullName" placeholder="" required />
              <label class="form-label" for="form2Example4">Họ tên</label>
            </div>

            <div class="form-floating mb-4">
              <input type="text" id="form2Example4" class="form-control" @focus="buttonTempTenantDisable = false"
                v-model="editTempTenantRequest.citizenId" placeholder="" required />
              <label class="form-label" for="form2Example4">Căn cước công dân</label>
            </div>

            <div class="form-floating form-element">
              <input type="date" class="form-control" id="registerInputdob1" placeholder=""
                v-model="editTempTenantRequest.startDate" style="margin-bottom: 20px"
                @focus="buttonTempTenantDisable = false" required>
              <label for="registerInputdob1">Ngày bắt đầu</label>
            </div>

            <div class="form-floating form-element">
              <input type="date" class="form-control" id="registerInputdob2" placeholder=""
                v-model="editTempTenantRequest.endDate" style="margin-bottom: 20px"
                @focus="buttonTempTenantDisable = false" required>
              <label for="registerInputdob2">Ngày kết thúc</label>
            </div>

            <div class="text-center">
              <button type="button" class=" btn btn-primary btn-block mb-4" @click="editTempTenant"
                :disabled="buttonTempTenantDisable">Cập nhật</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- edit room description form -->
  <div class="modal fade" id="editDescriptionModal" tabindex="-1" aria-labelledby="editRoomModalLabel" aria-hidden="true"
    data-backdrop="false">
    <div class="modal-dialog-centered modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="loginTitle">Cập nhật mô tả ngắn</h5>
          <button type="button" id="login-form-close-btn3" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="login-form">

            <div class="form-floating mb-4">
              <input id="form2Example3" class="form-control" @focus="buttonDescriptionDisable = false"
                v-model="editRoomDescriptionRequest.title" placeholder="" required />
              <label class="form-label" for="form2Example3">Tiêu đề</label>
            </div>

            <div class="form-floating mb-4">
              <input id="form2Example3" class="form-control" @focus="buttonDescriptionDisable = false"
                v-model="editRoomDescriptionRequest.content" placeholder="" required />
              <label class="form-label" for="form2Example3">Nội dung</label>
            </div>


            <div class="text-center">
              <button type="button" class=" btn btn-primary btn-block mb-4" @click="editRoomDescription"
                :disabled="buttonDescriptionDisable">Cập nhật</button>
            </div>

          </form>
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
              <label class="form-check-label" :for="utility.id" style="display: flex;">
                <img style=" width: 20px; height: 20px; margin: 0px 10px 10px 0;" :src="utility.photo.url" alt="">
                <div style="margin-bottom: 5px;">{{ utility.name }}</div>
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
          <h5 class="modal-title" id="notiTitle">Thêm thông báo cho phòng trọ này</h5>
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
import paymentRecordService from "@/services/paymentRecord.service";
import notificationService from "@/services/notification.service";
import utilityService from "@/services/utility.service";
import reviewService from "@/services/review.service";
import photoService from "@/services/photo.service";
import userService from "@/services/user.service";
import roomService from "@/services/room.service";
import review from "@/components/Review.vue";
import StarRating from 'vue-star-rating'
import { jsPDF } from "jspdf";
import Swal from 'sweetalert2'


export default {
  data() {
    return {
      file: {},
      buttonTempTenantDisable: false,
      selectedImage: 0,
      selectedRating: 0,
      activeColor: '#0F2C59',
      roomDescriptionRequest: {
        "roomId": "",
        "title": "",
        "content": ""
      },
      selectedIdRoomDes: 0,
      selectedIdTempTenant: 0,
      editTempTenantRequest: {
        "fullName": "0",
        "citizenId": "0",
        "startDate": "12/12/2012",
        "endDate": "12/12/2012"
      },
      editRoomDescriptionRequest: {
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
      checkPaid: [],
      buttonUtilityDisable: false,
      buttonDescriptionDisable: false,
      roomingSubscriptionRoom: [],
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
      reviews: [],
      myReviews: [],
      myReviewThisRoom: {},
      currentTenantStay: {}
    };
  },

  components: {
    review,
    StarRating
  },

  computed: {
    getRoomingSubscriptionWantLeave() {
      return this.currentTenantStay[0]?.state == 'want_leave'
    },
    checkOwner() {
      return (this.user.role == 'lessor' && this.room.lessor.id == this.user.lessor.id)
    },
    isDisabled() {
      return (this.tenant != null && this.tenant.isRegistered) || this.room.state == 'unavailable'
    },
    checkStayed() {
      return this.roomingSubscriptionRoom.length > 0
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
        var tokenBearer = this.$cookies.get("Token");

        this.room = await roomService.getOne(this.$route.params.id);
        this.room.roomPrice = this.room.roomPrice
        this.lessor = this.room.lessor.user

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
        this.currentTenantStay = await roomingSubscriptionService.getByRoomIdAndStaying(this.room.id)
        if (this.currentTenantStay.length == 0) this.currentTenantStay = await roomingSubscriptionService.getByRoomIdAndWantLeave(this.room.id)
        console.log(this.currentTenantStay)
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
    async editTempTenant() {
      try {
        var tokenBearer = this.$cookies.get("Token");
        await temporaryTenantService.update(this.selectedIdTempTenant, this.editTempTenantRequest, tokenBearer)
        this.displaySuccess("Cập nhật người ở tạm thời thành công")
        await this.sleep(1000)
        this.$router.go()
        buttonTempTenantDisable = true
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
        this.roomingSubscriptionReq = await roomingSubscriptionReqService.getAllByRoomIdWaitingTenantCall(this.room.id);
        console.log(this.roomingSubscriptionReq)
        this.roomingSubscriptionReq.forEach(async element => {
          let oneTenant = await userService.getOneTenant(element.tenantId)
          this.tenantReq.push(oneTenant)
        });
        if (this.user.role == 'tenant') this.roomingSubscriptionRoom = await roomingSubscriptionService.getByTenantIdAndRoomId(this.user.tenant.id, this.room.id)
      } catch (err) {
        console.log(err)
        this.displayError(err);
      }
    },
    async retrieveUtilities() {
      try {
        var tempUtilities = await utilityService.getAll();
        tempUtilities.forEach(async (element) => {
          let tempUli = await utilityService.getOne(element.id)
          this.utilities.push(tempUli)
        });
        await this.sleep(100)
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
        if (this.roomingSubscriptionArr == 0) this.roomingSubscriptionArr = await roomingSubscriptionService.getByRoomIdAndWantLeave(this.room.id)
        if (this.roomingSubscriptionArr.length > 0) {
          this.roomingSubscription = await roomingSubscriptionService.getOne(this.roomingSubscriptionArr[0]?.id)
          this.tempTenants = this.roomingSubscription.temporaryTenants
          this.paymentRecords = this.roomingSubscription.paymentRecords
        }
        if (this.paymentRecords != null)
          for (let i = 0; i < this.paymentRecords.length; i++) {
            if (this.paymentRecords[i].paidDate != null) this.checkPaid.push(true)
            else this.checkPaid.push(false)
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
    confirmRemoveTenant() {
      Swal.fire({
        title: 'Bạn có chắc chắn muốn thực hiện thao tác này',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Hủy',
        denyButtonText: `Đồng ý`,
      }).then((result) => {
        if (result.isConfirmed) { //revert 2 case for color
          Swal.fire('Đã hủy thao tác', '', 'info')
        } else if (result.isDenied) {
          this.rejectRoomingSubscription();
        }
      })
    },
    confirmReject() {
      Swal.fire({
        title: 'Bạn có chắc chắn muốn đồng ý hủy yêu cầu đăng ký trọ?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Hủy',
        denyButtonText: `Đồng ý`,
      }).then((result) => {
        if (result.isConfirmed) { //revert 2 case for color
          Swal.fire('Đã hủy thao tác', '', 'info')
        } else if (result.isDenied) {
          this.rejectRoomingSubscription();
        }
      })
    },
    async rejecting() {
      try {
        var tokenBearer = this.$cookies.get("Token");
        await roomingSubscriptionService.update(this.room.roomingHouse.id, this.room.id, this.roomingSubscription.id, {
          "startDate": this.roomingSubscription.startDate,
          "endDate": this.roomingSubscription.endDate,
          "state": "staying",
        }, tokenBearer)
        this.displaySuccess("Từ chối yêu cầu thành công")
        await this.sleep(1000)
        this.$router.go()
      } catch (err) {
        console.log(err)
        this.displayError(err);
      }
    },
    async rejectRoomingSubscription() {
      try {
        var tokenBearer = this.$cookies.get("Token");
        await roomingSubscriptionService.update(this.room.roomingHouse.id, this.room.id, this.roomingSubscription.id, {
          "startDate": this.roomingSubscription.startDate,
          "endDate": new Date(),
          "state": "stayed",
        }, tokenBearer)
        this.displaySuccess("Từ chối yêu cầu thành công")
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
    preview(event) {
      this.file = event.target.files[0]
    },
    async updateImage() {
      try {
        var tokenBearer = this.$cookies.get("Token");
        await photoService.removeRoomPhoto(this.selectedImage, tokenBearer);
        let data = new FormData();
        data.append('file', this.file);
        await photoService.uploadRoomPhoto(this.room.id, data, tokenBearer);
        this.displaySuccess("Cập nhật hình ảnh thành công")
        await this.sleep(1000)
        this.$router.go()
      } catch (err) {
        console.log(err)
        this.displayError(err)
      }
    },
    async editRoomDescription() {
      try {
        var tokenBearer = this.$cookies.get("Token");
        await roomDescriptionService.update(this.selectedIdRoomDes, this.editRoomDescriptionRequest, tokenBearer)
        this.displaySuccess("Cập nhật mô tả ngắn thành công")
        await this.sleep(1000)
        this.$router.go()
      } catch (err) {
        console.log(err)
        this.displayError(err)
      }
    },
    async updatePaymentRecord(paymentRecord, index) {
      try {
        this.checkPaid[index] = !this.checkPaid[index]
        var tokenBearer = this.$cookies.get("Token");
        if (this.checkPaid[index] == true) {
          await paymentRecordService.update(paymentRecord.id, {
            "surcharge": paymentRecord.surcharge,
            "paidDate": new Date(),
            "state": paymentRecord.state
          }, tokenBearer)
        } else {
          await paymentRecordService.update(paymentRecord.id, {
            "surcharge": paymentRecord.surcharge,
            "paidDate": null,
            "state": paymentRecord.state
          }, tokenBearer)
        }
        this.displaySuccess("Cập nhật chi phí thành công")
        await this.sleep(1000)
        this.$router.go()
      } catch (err) {
        console.log(err)
        this.displayError(err)
      }
    },
    async exportToPDF() {
      const doc = new jsPDF('p', 'pt', 'a4');
      doc.html(this.$refs.content.innerHTML, {
        callback: function (doc) {
          doc.setFont("inter");
          doc.save('export.pdf');
        },
      })
    },
    setRating(rating) {
      this.myReviewThisRoom.rating = rating
    },
    goToUserInfo(id) {
      this.$router.push({ name: "personal page", params: { id: id } })
    },
    showHeaderAndFooter() {
      this.$emit("isShowHeaderAndFooter", true);
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
@media print {

  body,
  html {
    width: 100%;
    margin-top: 0%;
    display: block;
    height: 100%;
  }
}

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