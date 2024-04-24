<template>
  <Form
    class="pb-3"
    @submit="submitContact"
    :validation-schema="contactFormSchema"
  >
    <div class="form-group">
      <label class="fw-bold" for="holot">Họ lót</label>
      <Field
        name="holot"
        type="text"
        class="form-control"
        v-model="contactLocal.holot"
      />
      <ErrorMessage name="holot" class="error-feedback" />
    </div>
    <div class="form-group">
      <label class="fw-bold" for="ten">Tên</label>
      <Field
        name="ten"
        type="text"
        class="form-control"
        v-model="contactLocal.ten"
      />
      <ErrorMessage name="ten" class="error-feedback" />
    </div>
    <div class="form-group">
      <label class="fw-bold" for="madocgia">Mã số đọc giả</label>
      <Field
        name="madocgia"
        type="text"
        class="form-control"
        v-model="contactLocal.madocgia"
      />
      <ErrorMessage name="madocgia" class="error-feedback" />
    </div>
    <div class="form-group">
      <label class="fw-bold" for="ngaysinh">Ngày sinh</label>
      <Field
        name="ngaysinh"
        type="date"
        class="form-control"
        v-model="contactLocal.ngaysinh"
      />
      <ErrorMessage name="ngaysinh" class="error-feedback" />
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
      <label class="fw-bold" for="phai">Giới tính</label>
      <select class="form-control" name="phai" v-model="contactLocal.phai">
        <option>Nam</option>
        <option>Nữ</option>
      </select>
      <!-- <Field
        name="phai"
        type="text"
        class="form-control"
        v-model="contactLocal.phai"
      /> -->
      <ErrorMessage name="phai" class="error-feedback" />
    </div>
    <div class="form-group">
      <label class="fw-bold" for="dienthoai">Số điện thoại</label>
      <Field
        name="dienthoai"
        type="tel"
        class="form-control"
        v-model="contactLocal.dienthoai"
      />
      <ErrorMessage name="dienthoai" class="error-feedback" />
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
      holot: yup
        .string()
        .min(2, "Họ phải ít nhất 2 ký tự.")
        .max(7, "Họ có nhiều nhất 7 ký tự.")
        .required("Họ phải có giá trị."),
      ngaysinh: yup.date(),
      ten: yup
        .string()
        .max(20, "Tên có nhiều nhất 20 ký tự.")
        .required("Tên phải có giá trị."),
      madocgia: yup
        .string()
        .max(5, "Mã đọc giả nhiều nhất 5 ký tự.")
        .matches(/((DG)+([0-9]{3})\b)/g, "Mã nhân viên không hợp lệ."),
      diachi: yup
        .string()
        .min(5, "Địa chỉ phải ít nhất 5 ký tự.")
        .max(50, "Địa chỉ có nhiều nhất 50 ký tự.")
        .required("Địa chỉ phải có giá trị."),

      dienthoai: yup
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
