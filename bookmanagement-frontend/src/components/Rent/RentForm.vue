<template>
  <Form class="pb-3" @submit="submitContact" :validation-schema="contactFormSchema">
    <div class="form-group">
      <label class="fw-bold" for="madocgia">Mã đọc giả</label>
      <select class="form-control" name="madocgia" v-model="contactLocal.madocgia">
        <option v-for="reader in docgia" :value="reader.madocgia">{{reader.madocgia}}</option>
      </select>
    </div>
    <div class="form-group">
      <label class="fw-bold" for="masach">Mã sách</label>
      <select class="form-control" name="masach" v-model="contactLocal.masach">
        <option v-for="book in sach" :value="book.masach">{{book.masach}}</option>
      </select>
    </div>
    <div class="form-group">
      <label class="fw-bold" for="msnv">Mã nhân viên</label>
      <select class="form-control" name="msnv" v-model="contactLocal.msnv">
        <option v-for="staff in nhanvien" :value="staff.msnv">{{staff.msnv}}</option>
      </select>
    </div>
    <div class="form-group">
      <label class="fw-bold" for="ngaymuon">Ngày mượn</label>
      <Field
        name="ngaymuon"
        type="date"
        class="form-control"
        v-model="contactLocal.ngaymuon"
      />
      <ErrorMessage name="ngaymuon" class="error-feedback" />
    </div>
    <div class="form-group">
      <label class="fw-bold" for="ngaytra">Ngày trả</label>
      <Field
        name="ngaytra"
        type="date"
        class="form-control"
        v-model="contactLocal.ngaytra"
      />
      <ErrorMessage name="ngaytra" class="error-feedback" />
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
import ReaderService from "@/services/reader.service";
import StaffService from "@/services/staff.service";
import BookService from "@/services/book.service";
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
      ngaymuon: yup.date().required("Ngày mượn phải có giá trị."),
      ngaytra: yup
        .date()
        .min(yup.ref("ngaymuon"), "Ngày trả phải sau ngày mượn"),
    });
    return {
      contactLocal: this.contact,
      contactFormSchema,
      docgia: [],
      nhanvien: [],
      sach: [],
    };
  },

  created() {
    this.selectReader();
    this.selectStaff();
    this.selectBook();
  },

  methods: {
    async selectReader() {
      this.docgia = await ReaderService.getAll();
      this.docgia.map((reader) => {
        const { madocgia } = reader;
      });
    },

    async selectStaff() {
      this.nhanvien = await StaffService.getAll();
      this.nhanvien.map((staff) => {
        const { msnv } = staff;
      });
    },

    async selectBook() {
      this.sach = await BookService.getAll();
      this.sach.map((book) => {
        const { masach } = book;
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
