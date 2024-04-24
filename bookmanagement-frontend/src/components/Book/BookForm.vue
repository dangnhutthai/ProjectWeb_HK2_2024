<template>
  <Form class="pb-3" @submit="submitContact" :validation-schema="contactFormSchema">
    <div class="form-group">
      <label class="fw-bold" for="tensach">Tên sách</label>
      <Field
        name="tensach"
        type="text"
        class="form-control"
        v-model="contactLocal.tensach"
      />
      <ErrorMessage name="tensach" class="error-feedback" />
    </div>
    <div class="form-group">
      <label class="fw-bold" for="masach">Mã sách</label>
      <Field
        name="masach"
        type="text"
        class="form-control"
        v-model="contactLocal.masach"
      />
      <ErrorMessage name="masach" class="error-feedback" />
    </div>
    <div class="form-group">
      <label class="fw-bold" for="dongia">Đơn giá</label>
      <Field
        name="dongia"
        type="text"
        class="form-control"
        v-model="contactLocal.dongia"
      />
      <ErrorMessage name="dongia" class="error-feedback" />
    </div>
    <div class="form-group">
      <label class="fw-bold" for="soquyen">Số quyển</label>
      <Field
        name="soquyen"
        type="tel"
        class="form-control"
        v-model="contactLocal.soquyen"
      />
      <ErrorMessage name="soquyen" class="error-feedback" />
    </div>
    <div class="form-group">
      <label class="fw-bold" for="namxuatban">Năm xuất bản</label>
      <Field
        name="namxuatban"
        type="tel"
        class="form-control"
        v-model="contactLocal.namxuatban"
      />
      <ErrorMessage name="namxuatban" class="error-feedback" />
    </div>
    <div class="form-group">
      <label class="fw-bold" for="manxb">Mã nhà xuất bản</label>
      <select class="form-control" name="manxb" v-model="contactLocal.manxb">
        <option v-for="publiser in nxb" :value="publiser.manxb">{{publiser.manxb}}</option>
      </select>
    </div>
    <div class="form-group">
      <label class="fw-bold" for="tacgia">Tác giả</label>
      <Field
        name="tacgia"
        type="tel"
        class="form-control"
        v-model="contactLocal.tacgia"
      />
      <ErrorMessage name="tacgia" class="error-feedback" />
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
import PublisherService from "@/services/publisher.service";

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
        .max(2024, "Năm xuất bản không hợp lệ"),
      tacgia: yup
        .string()
        .max(50, "Tên tác tối đa 50 ký tự."),
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
