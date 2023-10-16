<template>
<div id="PersonalInformation-sessions">
    <div class="PersonalInformation-session" id="first-session">
        <img id="PersonalInformation-avatar" src="../assets/home-page-background.jpg" alt="">
        <div>
            <h2>Huỳnh Hữu Lộc</h2>
            <div><font-awesome-icon :icon="[ 'far', 'envelope' ]"/> huynhhuuloc129@gmail.com</div>
            <div><font-awesome-icon :icon="[ 'fas', 'phone' ]"/> 0939169592</div>
            <div><font-awesome-icon :icon="[ 'fas', 'gift' ]"/> 19/01/2002</div>
        </div>
    </div>
    <div class="PersonalInformation-session">
        <div>
            <div style="display: flex; justify-content: space-between;">
                <h2>Giới thiệu bản thân</h2>
                <button style="border: 0px; background-color: white;" data-bs-toggle="modal" data-bs-target="#selfModal"><h2><font-awesome-icon icon="pen-to-square"/></h2></button>
            </div>
            <hr>
            <div>I am a 3rd year Software Engineer student at Can Tho University, I have done some projects in school and self learn Nodejs during school. In my 2nd year summer semester, I got an offer for Intern position at Manabie for 3 month, after that, I have promoted to Fresher for 3 month and Junior after that for 2 month until Feb 2023. Now I look up for Backend Golang job Fresher - Junior position remote.</div>
        </div>
    </div>
    <div class="PersonalInformation-session">
        <div style="display: flex; justify-content: space-between;">
            <h2>Thông tin cá nhân</h2>
            <button style="border: 0px; background-color: white;" data-bs-toggle="modal" data-bs-target="#infoModal"><h2><font-awesome-icon icon="pen-to-square"/></h2></button>
        </div>

        <hr>
        <div>
            <h4>Họ và tên: </h4>
            <p>Huỳnh Hữu Lộc</p>
        </div>
        <div>
            <h4>Email: </h4>
            <p>huynhhuuloc129@gmail.com</p>
        </div>
        <div>
            <h4>Số điện thoại: </h4>
            <p>0939169592</p>
        </div>
        <div>
            <h4>CCCD: </h4>
            <p>0939169592</p>
        </div>
        <div>
            <h4>Ngày sinh: </h4>
            <p>19/01/2002</p>
        </div>
        <div>
            <h4>Giới tính: </h4>
            <p>Nam</p>
        </div>
        <div>
            <h4>Địa chỉ hiện tại: </h4>
            <p>Nguyễn Văn Linh, đại học Cần Thơ</p>
        </div>
    </div>


    <div class="PersonalInformation-session">
        <h4>Các phòng trọ đã từng ở: </h4>

    </div>


    <div class="modal fade" id="selfModal" tabindex="-1" aria-labelledby="selfModalLabel" aria-hidden="true" data-backdrop="false">
        <div class="modal-dialog-centered modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="loginTitle">Giới thiệu bản thân</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="self-form">
                    <div class="form-outline mb-4">
                        <textarea  id="form2Example1" class="form-control"></textarea>
                        <label class="form-label" for="form2Example1"></label>
                    </div>

                    <div class="text-center">
                        <button type="button" class=" btn btn-primary btn-block mb-4 loginForm-button">Cập nhật</button>
                    </div>

                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="infoModal" tabindex="-1" aria-labelledby="infoModalLabel" aria-hidden="true" data-backdrop="false">
        <div class="modal-dialog-centered modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="loginTitle">Thông tin cá nhân</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="registerForm">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="registerInputFirstname" placeholder="" required>
                            <label for="registerInputFirstname" >Họ</label>
                        </div>

                        <div class="form-floating">
                            <input type="text" class="form-control" id="registerInputLastname" placeholder="" required>
                            <label for="registerInputLastname" >Tên</label>
                        </div>

                        <div class="form-floating">
                            <input type="email" class="form-control" id="registerInputEmail1" aria-describedby="emailHelp" placeholder="" required>
                            <label for="registerInputEmail1" >Email</label>
                        </div>
                        <small id="emailHelp" class="form-text text-muted"></small>

                        <div class="form-floating">
                            <input type="password" class="form-control" id="registerInputPhonenumber" placeholder="" required>
                            <label for="registerInputPhonenumber" >Số điện thoại</label>
                        </div>

                        <div class="form-floating">
                            <input type="text" class="form-control" id="registerInputCitizenID" placeholder=""  required>
                            <label for="registerInputCitizenID" >Căn cước công dân</label>
                        </div>

                        <div class="form-floating">
                            <input type="text" class="form-control" id="registerInputdob" placeholder="" required>
                            <label for="registerInputdob" >Ngày sinh</label>
                        </div>

                        <div class="form-floating">
                            <select class="form-select form-select-sm" id="floatingSelect" aria-label=".form-select-sm role" required>
                                <option value="1">Nam</option>
                                <option value="2">Nữ</option>
                            </select>
                            <label for="floatingSelect">Giới tính</label>
                        </div>

                        <div class="form-floating">
                            <input type="text" class="form-control" id="registerInputAddress" placeholder="" required>
                            <label for="registerInputAddress" >Địa chỉ hiện tại</label>
                        </div>
                        
                        <div style="display:flex; align-items:center; justify-content: center; padding: 10px 0 0 0;">
                            <button type="submit" id="registerButton" class="btn btn-secondary registerForm-button">Cập nhật</button>
                        </div>
                        </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
        };
    },
    components: {
    },
    computed: {
    },
    methods: {
      showHeaderAndFooter() {
        this.$emit("isShowHeaderAndFooter", true);
      },
    },
    mounted(){
      this.showHeaderAndFooter();
    }
}
</script>

<style>
.form-floating{
  margin-bottom: 20px;
}
#registerButton{
  text-align: center;
}
.registerForm-button{
  color: #FFF0DC;
  background-color: #0F2C59;
}
#form2Example1{
    word-wrap: break-word;
    height: 100px;
}
#first-session{
    display: flex;
}
#AppHeader {
  position: static;
  background-color: #0F2C59;
}
#PersonalInformation-avatar{
    margin-right: 100px;
    width: 200px;
    height: 200px;
}
#PersonalInformation-sessions{
    justify-content: center;
    align-items: center;
    word-wrap: break-word;
    font-size: large;
    margin: 100px 150px 150px 150px;
    display: flex;
    flex-direction: column;
}
.PersonalInformation-session{
    width: 80%;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
        padding: 50px;
    border-radius: 5px;
    margin-bottom: 30px;
}
.loginForm-button{
  color: #FFF0DC;
  background-color: #0F2C59;
}
</style>