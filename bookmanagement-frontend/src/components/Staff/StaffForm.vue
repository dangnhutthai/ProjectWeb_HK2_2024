<template>
  <Form class="pb-3" @submit="submitContact" :validation-schema="contactFormSchema">
    <div class="form-group">
      <label class="fw-bold" for="hotennv">Họ tên nhân viên</label>
      <Field
        name="hotennv"
        type="text"
        class="form-control"
        v-model="contactLocal.hotennv"
      />
      <ErrorMessage name="hotennv" class="error-feedback" />
    </div>
    <div class="form-group">
      <label class="fw-bold" for="msnv">Mã số nhân viên</label>
      <Field
        name="msnv"
        type="text"
        class="form-control"
        v-model="contactLocal.msnv"
      />
      <ErrorMessage name="msnv" class="error-feedback" />
    </div>
    <div class="form-group">
      <label class="fw-bold" for="diachi">Địa chỉ</label>
      <Field
        name="diachi"
        type="text"
        class="form-control"
        v-model="contactLocal.diachi"
      />
      <ErrorMessage name="diachi" class="error-feedback" />
    </div>
    <div class="form-group">
      <label class="fw-bold" for="chucvu">Chức vụ</label>
      <Field
        name="chucvu"
        type="text"
        class="form-control"
        v-model="contactLocal.chucvu"
      />
      <ErrorMessage name="chucvu" class="error-feedback" />
    </div>
    <div class="form-group">
      <label class="fw-bold" for="sodienthoai">Số điện thoại</label>
      <Field
        name="sodienthoai"
        type="tel"
        class="form-control"
        v-model="contactLocal.sodienthoai"
      />
      <ErrorMessage name="sodienthoai" class="error-feedback" />
    </div>
    <div class="form-group mt-2 text-center">
      <button class="btn btn-primary me-2">Lưu</button>
      <button
        v-if="contactLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteContact"
      >
        Xóa
      </button>
    </div>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:contact", "delete:contact"],
  props: {
    contact: { type: Object, required: true },
  },
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
      sodienthoai: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
      // phone: yup
      //   .string()
      // .matches(
      //   /((09|03|07|08|05)+([0-9]{8})\b)/g,
      //   "Số điện thoại không hợp lệ."
      // ),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // contactLocal để liên kết với các input trên form
      contactLocal: this.contact,
      contactFormSchema,
    };
  },
  methods: {
    submitContact() {
      this.$emit("submit:contact", this.contactLocal);
    },
    deleteContact() {
      this.$emit("delete:contact", this.contactLocal.id);
    },
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
