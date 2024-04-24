<script>
export default {
  props: {
    publishers:  { type: Array, default: [] },
    contacts: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
  },
};
</script>
<template>


<ul class="list-group overflow-auto shadow" style="max-height: 60vh !important;">

      <li
      class="list-group-item"
      v-for="(contact, index) in contacts"
      :key="contact._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
      >
      Đọc giả:  {{ contact.madocgia }}
      <br>
      Sách: {{ contact.masach }}
      
    </li>
  </ul>

</template>
