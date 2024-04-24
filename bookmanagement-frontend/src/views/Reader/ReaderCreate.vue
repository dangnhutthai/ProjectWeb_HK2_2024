<template>
  <div class="row justify-content-center">
    <h2 class="text-center mt-2">Thêm đọc giả</h2>

    <div class="col-6">
      <Form
        class="p-3"
        @submit="submitForm"
        :validation-schema="contactFormSchema"
      >
        <div class="form-group">
          <label for="holot">Họ lót đọc giả</label>
          <Field
            name="holot"
            type="text"
            class="form-control"
            v-model="contact.holot"
          />
          <ErrorMessage name="holot" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="ten">Tên đọc giả</label>
          <Field
            name="ten"
            type="text"
            class="form-control"
            v-model="contact.ten"
          />
          <ErrorMessage name="ten" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="madocgia">Mã đọc giả</label>
          <Field
            name="madocgia"
            type="text"
            class="form-control"
            v-model="contact.madocgia"
          />
          <ErrorMessage name="madocgia" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="ngaysinh">Ngày sinh</label>
          <Field
            name="ngaysinh"
            type="date"
            class="form-control"
            v-model="contact.ngaysinh"
          />
          <ErrorMessage name="ngaysinh" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="phai">Giới tính</label>
          <select class="form-control" name="phai" v-model="contact.phai">
            <option>Nam</option>
            <option>Nữ</option>
          </select>
          <ErrorMessage name="phai" class="error-feedback" />
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
          <label for="dienthoai">Điện thoại</label>
          <Field
            name="dienthoai"
            type="tel"
            class="form-control"
            v-model="contact.dienthoai"
          />
          <ErrorMessage name="dienthoai" class="error-feedback" />
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
import contactService from "@/services/reader.service";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:contact"],

  data() {
    const contactFormSchema = yup.object().shape({
      holot: yup
        .string()
        .min(2, "Họ phải ít nhất 2 ký tự.")
        .max(7, "Họ có nhiều nhất 7 ký tự.")
        .required("Họ phải có giá trị."),
      ten: yup
        .string()
        .max(20, "Tên có nhiều nhất 20 ký tự.")
        .required("Tên phải có giá trị."),
      madocgia: yup
        .string()
        // .email("E-mail không đúng.")
        .max(5, "Mã đọc giả nhiều nhất 5 ký tự.")
        .matches(/((DG)+([0-9]{3})\b)/g, "Mã nhân viên không hợp lệ."),
      diachi: yup
        .string()
        .min(5, "Địa chỉ phải ít nhất 5 ký tự.")
        .max(70, "Địa chỉ có nhiều nhất 70 ký tự.")
        .required("Địa chỉ phải có giá trị."),
      ngaysinh: yup.date(),
      dienthoai: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
    });
    return {
      contact: {
        holot: "",
        ten: "",
        ngaysinh: "",
        diachi: "",
        dienthoai: "",
        madocgia: "",
        phai: "",
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
      alert("Thêm đọc giả thành công!");
    },
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
