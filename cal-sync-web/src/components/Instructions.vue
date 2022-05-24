<script setup lang="ts">
import { defineComponent } from 'vue'
</script>
<script lang="ts">
export default defineComponent({
  props: {
      text: String
  },
});
</script>

<template>
    <p>{{ text }}</p>
</template>