<script>
export default {
  props: {
    contact: { type: Object, required: true },
  },
};
</script>
<template>
  <div class="mt-3 border border-3 rounded p-2 shadow">
    <div>
      <strong>Tên sách:</strong>
      {{ contact.tensach }}
    </div>
    <div class="p-1">
      <strong>Mã sách:</strong>
      {{ contact.masach }}
    </div>
    <div class="p-1">
      <strong>Mã nhà xuất bản:</strong>
      {{ contact.manxb }}
    </div>
    <div class="p-1">
      <strong>Đơn giá:</strong>
      {{ contact.dongia }} VND
    </div>
    <div class="p-1">
      <strong>Số quyển:</strong>
      {{ contact.soquyen }}
    </div>
    <div class="p-1">
      <strong>Năm xuất bản:</strong>
      {{ contact.namxuatban }}
    </div>
    <div class="p-1">
      <strong>Tác giả:</strong>
      {{ contact.tacgia }}
    </div>
  </div>
</template>
