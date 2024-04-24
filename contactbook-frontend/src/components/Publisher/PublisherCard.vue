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
      <strong>Tên nhà xuất bản:</strong>
      {{ contact.tennxb }}
    </div>
    <div class="p-1">
      <strong>Mã nhà xuất bản:</strong>
      {{ contact.manxb }}
    </div>
    <div class="p-1">
      <strong>Địa chỉ nhà xuất bản:</strong>
      {{ contact.diachi }}
    </div>
  </div>
</template>
