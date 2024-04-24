<script>
import AppHeader from "@/components/AppHeader.vue";
import Login from "./views/auth.vue";

export default {
  components: {
    AppHeader,
    Login
  },
  data() {
    return {
      nhanvien: null // Khởi tạo staff là một đối tượng null ban đầu
    };
  },
  created() {
    const staffJson = sessionStorage.getItem("nhanvien");
    this.nhanvien = JSON.parse(staffJson); // Gán dữ liệu cho biến staff trong data
  },
};
</script>
<template>
  <div id="app">
    <div v-if="!nhanvien" class="d-flex justify-content-center" style="margin-top: 25vh;">
        <login />

      </div>
    <div v-else>

      <AppHeader />
      <div class="container mt-3 shadow-lg">
        <router-view />
      </div>
    </div>
  </div>
</template>
<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>