<template>
  <div v-if="contact" class="page">
    <div class="pt-3">

      <h2 class="text-center">Hiệu chỉnh đọc giả</h2>
      <ContactForm
      :contact="contact"
      @submit:contact="updateContact"
      @delete:contact="deleteContact"
      />

    </div>
  </div>
</template>
<script>
import ContactForm from "@/components/Reader/ReaderForm.vue";
import ContactService from "@/services/reader.service";
export default {
  components: {
    ContactForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      contact: null,
      message: "",
    };
  },
  methods: {
    async getContact(id) {
      try {
        this.contact = await ContactService.get(id);
      } catch (error) {
        console.log(error);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updateContact(data) {
      try {
        await ContactService.update(this.contact._id, data);
        alert("Đọc giả được cập nhật thành công!");
        this.$router.push({ name: "reader" });

      } catch (error) {
        console.log(error);
      }
    },
    async deleteContact() {
      if (confirm("Bạn muốn xóa Đọc giả này?")) {
        try {
          await ContactService.delete(this.contact._id);
          this.$router.push({ name: "reader" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getContact(this.id);
    this.message = "";
  },
};
</script>
