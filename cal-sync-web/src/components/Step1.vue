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
      page: { 
        message: ""
      }
    }
  },
  methods: {
    async proceed() {
      let api = new Api();
      this.page.message = "Loading, please wait..."
      await api.createResourceGroup(await api.getCurrentUsername());
      this.page.message = "Done!";
      this.$router.push("/google");
    }
  },
  mounted() {
    let api = new Api();
    api.getCurrentUsername().then((user) => {
      if (user == "") {
        window.location.href = "/.auth/login/aad";
      }
      api.isValidUser().then((result) => {
        if (!result) {
          this.$router.push("/invalid");
        }
      })
    });
  }
})
</script>
<template>
    <ProgressBar />
    <Instructions />
    <h1>Step 1</h1>
    <p>This is the first step towards enlightenment.</p>
    <p>{{ page.message }}</p>
    <button @click="proceed">Proceed</button>
</template>