<template>
  <div class="page">
    <div class="row">
      <InputSearch v-model="searchText" />
    </div>
    <div class="row pb-3">

    <div class="mt-3 col-md-8">
      <h4 class="text-center">
        Theo dõi mượn sách
      </h4>
      <div class="d-flex mt-2 mb-2 justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddContact">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger" @click="removeAllContacts">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
      <ContactList
        v-if="filteredContactsCount> 0"
        :contacts="filteredContacts"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có thông tin mượn sách nào.</p>
    </div>
    <div class="mt-3 col-md-4">
      <div v-if="activeContact">
        <h4>
          Chi tiết mượn sách:
        </h4>
        <router-link
          :to="{
            name: 'rent.edit',
            params: { id: activeContact._id },
          }"
         class="text-decoration-none bg-secondary p-2 rounded">
          <span class="mt-2 text-warning">
            <i class="fas fa-edit"></i> Hiệu chỉnh</span
          >
        </router-link>
        <ContactCard :contact="activeContact" />
       
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import ContactCard from "@/components/Rent/RentCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/Rent/RentList.vue";
import ContactService from "@/services/rent.service";
export default {
  components: {
    ContactCard,
    InputSearch,
    ContactList,
  },
  // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
    contactStrings() {
      return this.contacts.map((contact) => {
        const { madocgia, masach, msnv, ngaymuon, ngaytra } = contact;
        return [madocgia, masach, msnv, ngaymuon, ngaytra].join("");
      });
    },
    // Trả về các contact có chứa thông tin cần tìm kiếm.
    filteredContacts() {
      if (!this.searchText) return this.contacts;
      return this.contacts.filter((_contact, index) =>
        this.contactStrings[index].includes(this.searchText)
      );
    },
    activeContact() {
      if (this.activeIndex < 0) return null;
      return this.filteredContacts[this.activeIndex];
    },
    filteredContactsCount() {
      return this.filteredContacts.length;
    },
  },
  methods: {
    async retrieveContacts() {
      try {
        this.contacts = await ContactService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },
    async removeAllContacts() {
      if (confirm("Bạn muốn xóa tất cả thông tin mượn sách?")) {
        try {
          await ContactService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddContact() {
      this.$router.push({ name: "rent.create" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}

</style>
