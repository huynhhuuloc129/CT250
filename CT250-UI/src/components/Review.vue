<template>
  <section style="color: #000; background-color: #f3f2f2;">
    <div class="container py-5">

      <div class="row text-center " v-for="review in reviews">
        <div class="col-md-4 mb-4 mb-md-0">
          <div class="card">
            <div class="card-body py-4 mt-2">
              <div class="d-flex justify-content-center mb-4">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                  class="rounded-circle shadow-1-strong" width="100" height="100" />
              </div>
              <h5 class="font-weight-bold">{{ review.tenant.user.fullName }}</h5>
              <h6 class="font-weight-bold my-3"><font-awesome-icon icon="star" /> {{ review.rating }}</h6>
              <p class="mb-2">
                <i class="fas fa-quote-left pe-2"></i> {{ review.comment }}
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script>
export default {
  props: {
    reviews: { type: Array, default: [] },

  },
  methods: {
  },
  mounted() {
  }
}

</script>

<style>
.card {
  border-radius: .7rem;
}
</style>