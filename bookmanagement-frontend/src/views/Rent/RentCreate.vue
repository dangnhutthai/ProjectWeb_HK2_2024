<template>
    <div class="row justify-content-center">
    <h2 class="text-center mt-2">Thêm thông tin mượn sách</h2>

<div class="col-6">
  <Form class="p-3" @submit="submitForm" :validation-schema="contactFormSchema">
    <div class="form-group">
      <label for="madocgia">Mã đọc giả</label>
      <select class="form-control" name="madocgia" v-model="contact.madocgia">
        <option v-for="reader in docgia" :value="reader.madocgia">{{reader.madocgia}}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="masach">Mã sách</label>
      <select class="form-control" name="masach" v-model="contact.masach">
        <option v-for="book in sach" :value="book.masach">{{book.masach}}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="msnv">Mã nhân viên</label>
      <select class="form-control" name="msnv" v-model="contact.msnv">
        <option v-for="staff in nhanvien" :value="staff.msnv">{{staff.msnv}}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="ngaymuon">Ngày mượn</label>
      <Field
        name="ngaymuon"
        type="date"
        class="form-control"
        v-model="contact.ngaymuon"
      />
      <ErrorMessage name="ngaymuon" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="ngaytra">Ngày trả</label>
      <Field
        name="ngaytra"
        type="date"
        class="form-control"
        v-model="contact.ngaytra"
      />
      <ErrorMessage name="ngaytra" class="error-feedback" />
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
import contactService from "@/services/rent.service";
import ReaderService from "@/services/reader.service";
import StaffService from "@/services/staff.service";
import BookService from "@/services/book.service";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:contact"],
  
  data() {
    const contactFormSchema = yup.object().shape({
      ngaymuon: yup.date().required("Ngày mượn phải có giá trị."),
      ngaytra: yup
        .date()
        .min(yup.ref("ngaymuon"), "Ngày trả phải sau ngày mượn"),
    });
    return {
      contact: {
        madocgia: '',
        masach: '',
        msnv: '',
        ngaymuon: '',
        ngaytra: '',
      },
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // contact để liên kết với các input trên form
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

    submitForm() {
      this.$emit("submit:contact", this.contact);
    },
    submitButton() {
      contactService.create(this.contact);
      alert('Thêm thông tin mượn sách thành công!');
    }
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
