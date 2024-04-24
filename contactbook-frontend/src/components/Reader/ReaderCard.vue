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
      <strong>Họ tên đọc giả:</strong>
      {{ contact.holot }}
      {{ contact.ten }}
    </div>
    <div class="p-1">
      <strong>Mã đọc giả:</strong>
      {{ contact.madocgia }}
    </div>
    <div class="p-1">
      <strong>Ngày sinh:</strong>
      {{ contact.ngaysinh }}
    </div>
    <div class="p-1">
      <strong>Giới tính:</strong>
      {{ contact.phai }}
    </div>
    <div class="p-1">
      <strong>Địa chỉ:</strong>
      {{ contact.diachi }}
    </div>
    <div class="p-1">
      <strong>Số điện thoại:</strong>
      {{ contact.dienthoai }}
    </div>
  </div>
</template>
