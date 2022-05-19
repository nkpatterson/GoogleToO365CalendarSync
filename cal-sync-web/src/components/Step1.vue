<script setup lang="ts">
import { Api } from '../services/api-service'
import ProgressBar from './ProgressBar.vue'
import Instructions from './Instructions.vue'
import { defineComponent } from 'vue'
</script>

<script lang="ts">
export default defineComponent({
  // type inference enabled
  props: {
    name: String,
    msg: { type: String, required: true }
  },
  data() {
    return {
      count: 1
    }
  },
  mounted() {
    this.name // type: string | undefined
    this.msg // type: string
    this.count // type: number
  }
})
</script>
<template>
    <ProgressBar />
    <Instructions />
    <h1>Step {{ count }}</h1>
    <p>This is the first step towards enlightenment.</p>
    <router-link to="/google">Continue</router-link>
</template>