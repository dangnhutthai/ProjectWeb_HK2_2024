<template>
  <div class="row justify-content-center">
    <h2 class="text-center mt-2">Thêm sách</h2>

<div class="col-6">

  <Form class="p-3" @submit="submitForm" :validation-schema="contactFormSchema">
    <div class="form-group">
      <label for="tensach">Tên sách</label>
      <Field
        name="tensach"
        type="text"
        class="form-control"
        v-model="contact.tensach"
      />
      <ErrorMessage name="tensach" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="masach">Mã sách</label>
      <Field
        name="masach"
        type="text"
        class="form-control"
        v-model="contact.masach"
      />
      <ErrorMessage name="masach" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="manxb">Mã nhà xuất bản</label>
      <select class="form-control" name="manxb" v-model="contact.manxb">
        <option v-for="publiser in nxb" :value="publiser.manxb">{{publiser.manxb}}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="dongia">Đơn giá</label>
      <Field
        name="dongia"
        type="number"
        class="form-control"
        v-model="contact.dongia"
      />
      <ErrorMessage name="dongia" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="soquyen">Số quyển</label>
      <Field
        name="soquyen"
        type="number"
        class="form-control"
        v-model="contact.soquyen"
      />
      <ErrorMessage name="soquyen" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="namxuatban">Năm xuất bản</label>
      <Field
        name="namxuatban"
        type="number"
        class="form-control"
        v-model="contact.namxuatban"
      />
      <ErrorMessage name="namxuatban" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="tacgia">Tác giả</label>
      <Field
        name="tacgia"
        type="text"
        class="form-control"
        v-model="contact.tacgia"
      />
      <ErrorMessage name="tacgia" class="error-feedback" />
    </div>
    <div class="form-group mt-2 text-center">
      <button type="submit" class="btn btn-primary" @click="submitButton">Lưu</button>
    </div>
  </Form>
</div>
  
</div>
  
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import contactService from "@/services/book.service";
import PublisherService from "@/services/publisher.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:contact"],
  
  data() {
    const contactFormSchema = yup.object().shape({
      tensach: yup
        .string()
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(70, "Tên có nhiều nhất 70 ký tự.")
        .required("Tên phải có giá trị."),
      masach: yup
        .string()
        // .email("E-mail không đúng.")
        .max(5, "Mã sách tối đa 5 ký tự."),
      dongia: yup
        .number()
        .min(1000, "Giá tiền ít nhất 4 chữ số")
        .max(999999999, "Giá tiền nhiều nhất 9 chữ số"),
      soquyen: yup
        .number(),
      namxuatban: yup
        .number()
        .max(2024, "Năm xuất bản không hợp lệ")
        .required("Năm xuât bản phải có giá trị"),
      tacgia: yup
        .string()
        .max(50, "Tên tác tối đa 50 ký tự."),
    });
    return {
      contact: {
        tensach: '',
        masach: '',
        dongia: '',
        tacgia: '',
        namxuatban: '',
        manxb: '',
        soquyen: '',
      },
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // contact để liên kết với các input trên form
      contactFormSchema,
      nxb: [],
    };
  },
  created() {
    this.selectionPublisher();
  },

  methods: {
    async selectionPublisher() {
      this.nxb = await PublisherService.getAll();
      this.nxb.map((publisher) => {
        const { manxb } = publisher;
      });
    },
    submitForm() {
      this.$emit("submit:contact", this.contact);
    },
    submitButton() {
      contactService.create(this.contact);
      alert('Thêm sách thành công!');
    }
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
