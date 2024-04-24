<template>
  <div v-if="contact" class="">

    <div class="row justify-content-center">
      <div class="col-6">

        <h2 class="text-center">Hiệu chỉnh thông tin mượn sách</h2>
        <ContactForm
        :contact="contact"
        @submit:contact="updateContact"
        @delete:contact="deleteContact"
        />
        <p class="text-success">{{ message }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import ContactForm from "@/components/Rent/RentForm.vue";
import ContactService from "@/services/rent.service";
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
        alert("Thông tin mượn sách được cập nhật thành công!");
        this.$router.push({ name: "rent" });

      } catch (error) {
        console.log(error);
      }
    },
    async deleteContact() {
      if (confirm("Bạn muốn xóa thông tin mượn sách này?")) {
        try {
          await ContactService.delete(this.contact._id);
          this.$router.push({ name: "rent" });
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
