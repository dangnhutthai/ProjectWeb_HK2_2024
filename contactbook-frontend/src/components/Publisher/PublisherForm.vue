<template>
  <Form class="pb-3" @submit="submitContact" :validation-schema="contactFormSchema">
    <div class="form-group">
      <label class="fw-bold" for="tennxb">Tên nhà xuất bản</label>
      <Field
        name="tennxb"
        type="text"
        class="form-control"
        v-model="contactLocal.tennxb"
      />
      <ErrorMessage name="v" class="error-feedback" />
    </div>
    <div class="form-group">
      <label class="fw-bold" for="manxb">Mã nhà xuất bản</label>
      <Field
        name="manxb"
        type="text"
        class="form-control"
        v-model="contactLocal.manxb"
      />
      <ErrorMessage name="manxb" class="error-feedback" />
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
      tennxb: yup
        .string()
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự.")
        .required("Tên phải có giá trị."),
      diachi: yup
        .string()
        .min(2, "Địa chỉ phải ít nhất 2 ký tự.")
        .max(70, "Địa chỉ tối đa 70 ký tự."),
        manxb: yup
        .string()

        .max(5, "Mã nhà xuất bản có nhiều nhất 5 ký tự.")
        .required("Mã nhà xuất bản phải có giá trị."),
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
      nxb: [],
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
