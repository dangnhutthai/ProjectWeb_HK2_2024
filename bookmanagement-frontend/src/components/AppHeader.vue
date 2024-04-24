<template>
  <nav class="navbar navbar-expand navbar-dark">
    <a href="/" class="navbar-brand mt-2 border shadow p-2 rounded ">Ứng dụng Quản lý mượn sách</a>
    <div class="mr-auto navbar-nav border rounded mt-2 shadow">
      <li class="nav-item ">
        <router-link :to="{ name: 'book' }" class="nav-link">
          Sách
          <i class="fa-solid fa-book"></i>
        </router-link>
      </li>
      
      <li >
        <router-link :to="{ name: 'publisher' }" class="nav-link">
          Nhà xuất bản
          <i class="fa-solid fa-building"></i>
        </router-link>
      </li>
      <li >
        <router-link :to="{ name: 'staff' }" class="nav-link">
          Nhân viên
          <i class="fa-solid fa-clipboard-user"></i>
        </router-link>
      </li>
      <li >
        <router-link :to="{ name: 'reader' }" class="nav-link">
          Đọc giả
          <i class="fa-solid fa-user"></i>
        </router-link>
      </li>
      <li >
        <router-link :to="{ name: 'rent' }" class="nav-link">
          Mượn sách
          <i class="fa-solid fa-calendar-days"></i>
        </router-link>
      </li>
      <li class="nav-item" v-if="!nhanvien">
        <router-link :to="{ name: 'login' }" class="nav-link">
          Đăng nhập
        </router-link>
      </li>

    </div>
      <div class="nav-item ms-2" v-if="nhanvien">
       <button class="btn-hello mt-2 shadow">

         Xin chào,  {{ nhanvien.hotennv }}
        </button>
      </div>
      <div class="nav-item ms-1 " v-if="nhanvien">
        <button @click="logout" class="btn btn-secondary shadow mt-2 ms-1"><i class="fa-solid fa-power-off"></i></button>
      </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      nhanvien: null, // Khởi tạo staff là một đối tượng null ban đầu
    };
  },
  created() {
    // Lấy dữ liệu từ sessionStorage khi component được tạo ra
    const staffJson = sessionStorage.getItem("nhanvien");
    this.nhanvien = JSON.parse(staffJson); // Gán dữ liệu cho biến staff trong data
  },
  methods: {
    logout() {
      sessionStorage.removeItem("nhanvien");
      window.location.reload();
    },
  },
};
</script>
