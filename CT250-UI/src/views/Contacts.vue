<template>
  <section class="vh-100" style="background-color: #f4f5f7;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-lg-6 mb-4 mb-lg-0">
          <div class="card mb-3" style="border-radius: .5rem;">
            <div class="row g-0">
              <div class="col-md-4 gradient-custom text-center text-white"
                style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Avatar"
                  class="img-fluid my-5" style="width: 80px;" />
                <h5>Marie Horwitz</h5>
                <p>Web Designer</p>
                <i class="far fa-edit mb-5"></i>
              </div>
              <div class="col-md-8">
                <div class="card-body p-4">
                  <h6>Information</h6>
                  <hr class="mt-0 mb-4">
                  <div class="row pt-1">
                    <div class="col-6 mb-3">
                      <h6>Email</h6>
                      <p class="text-muted">info@example.com</p>
                    </div>
                    <div class="col-6 mb-3">
                      <h6>Phone</h6>
                      <p class="text-muted">123 456 789</p>
                    </div>
                  </div>
                  <h6>Projects</h6>
                  <hr class="mt-0 mb-4">
                  <div class="row pt-1">
                    <div class="col-6 mb-3">
                      <h6>Recent</h6>
                      <p class="text-muted">Lorem ipsum</p>
                    </div>
                    <div class="col-6 mb-3">
                      <h6>Most Viewed</h6>
                      <p class="text-muted">Dolor sit amet</p>
                    </div>
                  </div>
                  <div class="d-flex justify-content-start">
                    <a href="#!"><i class="fab fa-facebook-f fa-lg me-3"></i></a>
                    <a href="#!"><i class="fab fa-twitter fa-lg me-3"></i></a>
                    <a href="#!"><i class="fab fa-instagram fa-lg"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </section>
</template>


<script>
import userService from "@/services/user.service";

export default {
  data() {
    return {
      user: {},
      contacts: [
        {
          "name": "Huỳnh Hữu Lộc",
          "email": "huynhhuuloc129@gmail.com",
          "phone": "0939169592",
          "github": "https://github.com/huynhhuuloc129",
          "facebook": "https://www.facebook.com/huynh.h.loc.92/",
          "address": "Ninh Kiều, Cần Thơ, Việt Nam",
          "linkedin": "https://www.linkedin.com/in/huynh-huu-loc/"
        },
        {
          "name": "",
          "email": "",
          "phone": "",
          "github": "",
          "facebook": "",
          "address": "",
          "linkedin": ""
        },
        {
          "name": "",
          "email": "",
          "phone": "",
          "github": "",
          "facebook": "",
          "address": "",
          "linkedin": ""
        }
      ]
    }
  },

  components: {

  },

  computed: {
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
    showHeaderAndFooter() {
      this.$emit("isShowHeaderAndFooter", true);
    },
  },

  async mounted() {
    await this.checkLogin();
    this.showHeaderAndFooter();
  }
}
</script>

<style>
#AppHeader {
  position: static;
  background-color: #0F2C59;
}
</style>
