<template>
  <div v-if="contact" class="page">
<div class="pt-2">

  <h2 class="text-center">Hiệu chỉnh nhân viên</h2>
  <ContactForm
  :contact="contact"
  @submit:contact="updateContact"
  @delete:contact="deleteContact"
  />
</div>
  </div>
</template>
<script>
import ContactForm from "@/components/Staff/StaffForm.vue";
import ContactService from "@/services/staff.service";
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
        alert("Cập nhật nhân viên thành công!");
        this.$router.push({ name: "staff" });

      } catch (error) {
        console.log(error);
      }
    },
    async deleteContact() {
      if (confirm("Bạn muốn xóa Nhân viên này?")) {
        try {
          await ContactService.delete(this.contact._id);
          this.$router.push({ name: "staff" });
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
