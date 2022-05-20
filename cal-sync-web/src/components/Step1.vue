<script setup lang="ts">
import { Api } from '../services/api-service'
import ProgressBar from './ProgressBar.vue'
import Instructions from './Instructions.vue'
import { wizardState } from './wizard-state'
import { defineComponent } from 'vue'
</script>

<script lang="ts">
export default defineComponent({
  props: {
  },
  data() {
    return { wizardState };
  },
  methods: {
    async proceed() {
      let api = new Api();
      this.wizardState.message = "Loading, please wait..."
      await api.createResourceGroup(await api.getCurrentAlias());
      this.wizardState.message = "Done!";
      this.$router.push("/google");
    }
  },
  mounted() {
  }
});
</script>
<template>
    <ProgressBar />
    <Instructions />
    <h1>Step 1</h1>
    <p>This is the first step towards enlightenment.</p>
    <p>{{ wizardState.message }}</p>
    <button @click="proceed">Proceed</button>
</template>