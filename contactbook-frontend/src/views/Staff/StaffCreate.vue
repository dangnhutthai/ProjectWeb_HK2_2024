<template>
  <div class="row justify-content-center">
    <h2 class="text-center mt-2">Thêm nhân viên</h2>
    <div class="col-6">
      <Form class="p-3" @submit="submitForm" :validation-schema="contactFormSchema">
        <div class="form-group">
          <label for="hotennv">Tên nhân viên</label>
          <Field
            name="hotennv"
            type="text"
            class="form-control"
            v-model="contact.hotennv"
          />
          <ErrorMessage name="hotennv" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="msnv">Mã số nhân viên</label>
          <Field
            name="msnv"
            type="text"
            class="form-control"
            v-model="contact.msnv"
          />
          <ErrorMessage name="msnv" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="diachi">Địa chỉ</label>
          <Field
            name="diachi"
            type="text"
            class="form-control"
            v-model="contact.diachi"
          />
          <ErrorMessage name="diachi" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="sodienthoai">Số điện thoại</label>
          <Field
            name="sodienthoai"
            type="text"
            class="form-control"
            v-model="contact.sodienthoai"
          />
          <ErrorMessage name="sodienthoai" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="chucvu">Chức vụ</label>
          <Field
            name="chucvu"
            type="text"
            class="form-control"
            v-model="contact.chucvu"
          />
          <ErrorMessage name="chucvu" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <Field
            name="password"
            type="text"
            class="form-control"
            v-model="contact.password"
          />
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group mt-2 text-center">
          <button type="submit" class="btn btn-primary" @click="submitButton">
            Lưu
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import contactService from "@/services/staff.service";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:contact"],

  data() {
    const contactFormSchema = yup.object().shape({
      hotennv: yup
        .string()
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự.")
        .required("Tên phải có giá trị."),
      msnv: yup
        .string()
        // .email("E-mail không đúng.")
        .max(5, "Mã nhân viên nhiều nhất 5 ký tự.")
        .matches(/(([0-9]{5})\b)/g, "Mã nhân viên không hợp lệ."),
      diachi: yup
        .string()
        .min(5, "Địa chỉ phải ít nhất 5 ký tự.")
        .max(50, "Địa chỉ có nhiều nhất 50 ký tự.")
        .required("Địa chỉ phải có giá trị."),
      chucvu: yup
        .string()
        .min(5, "Chức vụ phải ít nhất 5 ký tự.")
        .max(30, "Chức vụ có nhiều nhất 30 ký tự.")
        .required("Chức vụ phải có giá trị."),
      password: yup
        .string()
        .min(8, "Mật khẩu phải ít nhất 8 ký tự.")
        .max(16, "Mật khẩu có nhiều nhất 16 ký tự.")
        .required("Mật khẩu phải có giá trị."),
      sodienthoai: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
    });
    return {
      contact: {
        hotennv: "",
        msnv: "",
        diachi: "",
        sodienthoai: "",
        password: "",
        chucvu: "",
      },
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // contact để liên kết với các input trên form
      contactFormSchema,
    };
  },
  methods: {
    submitForm() {
      this.$emit("submit:contact", this.contact);
    },
    submitButton() {
      contactService.create(this.contact);
      alert("Thêm nhân viên thành công!");
    },
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
