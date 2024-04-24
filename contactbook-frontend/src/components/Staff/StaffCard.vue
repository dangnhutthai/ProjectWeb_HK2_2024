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
      <strong>Họ tên nhân viên:</strong>
      {{ contact.hotennv }}
    </div>
    <div class="p-1">
      <strong>Mã nhân viên:</strong>
      {{ contact.msnv }}
    </div>
    <div class="p-1">
      <strong>Địa chỉ:</strong>
      {{ contact.diachi }}
    </div>
    <div class="p-1">
      <strong>Chức vụ:</strong>
      {{ contact.chucvu }}
    </div>
    <div class="p-1">
      <strong>Số điện thoại:</strong>
      {{ contact.sodienthoai }}
    </div>
  </div>
</template>
