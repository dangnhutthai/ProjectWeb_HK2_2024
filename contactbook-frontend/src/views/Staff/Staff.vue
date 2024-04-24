<template>
  <div class="page">
    <div class="row">
    

        <InputSearch v-model="searchText" />
      
    </div>
    <div class="row pb-3">

    <div class="mt-3 col-8">
      <h4 class="text-center">
        Nhân viên
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
      <p v-else>Không có nhân viên nào.</p>
      
    </div>
    <div class="mt-3 col-4">
      <div v-if="activeContact">
        <h4>
          Chi tiết nhân viên:
        </h4>
        <router-link class="text-decoration-none bg-secondary p-2 rounded"
          :to="{
            name: 'staff.edit',
            params: { id: activeContact._id },
          }"
        >
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
import ContactCard from "@/components/Staff/StaffCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/Staff/StaffList.vue";
import ContactService from "@/services/staff.service";
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
        const { msnv, hotennv, diachi, sodienthoai, password, chucvu } = contact;
        return [msnv, hotennv, diachi, sodienthoai, password, chucvu].join("");
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
      if (confirm("Bạn muốn xóa tất cả Nhân viên?")) {
        try {
          await ContactService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddContact() {
      this.$router.push({ name: "staff.create" });
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
