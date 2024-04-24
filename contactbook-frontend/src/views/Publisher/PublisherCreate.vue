<template>
  <div class="row justify-content-center">
    <h2 class="text-center mt-2">Thêm nhà xuất bản</h2>

    <div class="col-6">
      <Form class="p-3" @submit="submitForm" :validation-schema="contactFormSchema">
        <div class="form-group">
          <label for="tennxb">Tên nhà xuất bản</label>
          <Field
            name="tennxb"
            type="text"
            class="form-control"
            v-model="contact.tennxb"
          />
          <ErrorMessage name="tennxb" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="manxb">Mã nhà xuất bản</label>
          <Field
            name="manxb"
            type="text"
            class="form-control"
            v-model="contact.manxb"
          />
          <ErrorMessage name="manxb" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="diachi">Địa chỉ nhà xuất bản</label>
          <Field
            name="diachi"
            type="text"
            class="form-control"
            v-model="contact.diachi"
          />
          <ErrorMessage name="diachi" class="error-feedback" />
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
import contactService from "@/services/publisher.service";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:contact"],

  data() {
    const contactFormSchema = yup.object().shape({
      tennxb: yup
        .string()
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự.")
        .required("Tên phải có giá trị."),
      manxb: yup
        .string()
        // .email("E-mail không đúng.")
        .max(5, "Mã nhà xuất bản tối đa 5 ký tự."),
      diachi: yup
        .string()
        .min(2, "Địa chỉ phải ít nhất 2 ký tự.")
        .max(50, "Địa chỉ có nhiều nhất 50 ký tự.")
        .required("Địa chỉ phải có giá trị."),
    });
    return {
      contact: {
        tennxb: "",
        manxb: "",
        diachi: "",
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
      alert("Thêm nhà xuất bản thành công!");
    },
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
