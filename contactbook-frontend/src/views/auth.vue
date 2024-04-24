<template>
  <div class="form-auth shadow-lg col-md-6 d-flex flex-column align-items-center">
      <h3 class="text-center mt-4 title"><i class="fa-solid fa-cloud"></i> Đăng Nhập <i class="fa-solid fa-cloud"></i></h3>
      <div class="bg-text shadow mt-4 ">
      </div>
      <div class="form-auth-2">


        <div class="p-3">
          <label class="text-auth" for="msnv">Mã nhân viên: </label>
          <input
            type="text"
            placeholder="ID"
            class="w-50 rounded p-1"
            v-model="msnv"
          />
        </div>
        <div class="p-3">
          <label class="text-auth" for="password">Mật khẩu: </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            class="w-50 rounded p-1"
            v-model="password"
          />
        </div>
    </div>
        <div class="p-3">
          <button type="submit" class="rounded btn btn-light shadow btn-login" @click="login">
            <i class="fa-solid fa-cloud fs-3" style="color: rgb(143, 206, 240)"></i>
          </button>
        
      </div>
  </div>
</template>
<script>
import StaffService from "@/services/staff.service";
export default {
  data() {
    return {
      data: {
        msnv: "",
        password: "",
      },
    };
  },
  created() {
    this.login();
  },
  methods: {
    async login() {
      if (this.msnv && this.password) {
        const data = {
          msnv: this.msnv,
          password: this.password,
        };

        try {
          const staff = await StaffService.login(data);
          if (staff) {
            sessionStorage.setItem("nhanvien", JSON.stringify(staff));
            alert("Đăng nhập thành công");
            window.location.reload();
          }
        } catch (error) {
          alert("Đăng nhập thất bại");
          console.error(error);
        }
      }
    },
  },
};
</script>
