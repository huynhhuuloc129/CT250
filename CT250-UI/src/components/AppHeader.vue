<template>

<nav id="AppHeader" class="navbar fixed-top navbar-expand-lg navbar-dark p-md-3">
      <div class="container" id="AppHeaderContainer">
        <a class="navbar-brand" href="http://localhost:3001">IStay</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="mx-auto"></div>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link text-white" href="#">Thông tin</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="#">Liên hệ</a>
            </li>
            <li class="nav-item">
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <font-awesome-icon icon="user"/>
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="http://localhost:3001/personal-information"><font-awesome-icon icon="user"/> Thông tin cá nhân</a></li>
                  <li><a class="dropdown-item" href="http://localhost:3001/myroom"><font-awesome-icon icon="bed"/> Phòng của tôi</a></li>
                  <li><a class="dropdown-item" href="#"><font-awesome-icon icon="right-from-bracket"/> Đăng xuất</a></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
</nav>

</template>

<script>

</script>


<style>
.dropdown{
  margin: 0 0 0 20px;
}

#AppHeader{
  font-size: 25px;
}
#AppHeader-user{
  padding: 5px 10px;
  background-color: transparent;
  border-radius: 10px;
}
</style>