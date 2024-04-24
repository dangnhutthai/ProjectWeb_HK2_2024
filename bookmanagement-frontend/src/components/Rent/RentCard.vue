<script>
export default {
  props: {
    contact: { type: Object, required: true },
  },
};
</script>
<template>
  <div class="mt-3 border border-3 rounded p-2 shadow">
    <div class="p-1">
      <strong>Mã đọc giả:</strong>
      {{ contact.madocgia }}
    </div>
    <div class="p-1">
      <strong>Mã sách:</strong>
      {{ contact.masach }}
    </div>
    <div class="p-1">
      <strong>Mã nhân viên:</strong>
      {{ contact.msnv }}
    </div>
    <div class="p-1">
      <strong>Ngày mượn:</strong>
      {{ contact.ngaymuon }}
    </div>
    <div class="p-1">
      <strong>Ngày trả:</strong>
      {{ contact.ngaytra }}
    </div>
  </div>
</template>
