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
      this.wizardState.rgName = await api.createResourceGroup(await api.getCurrentAlias());
      this.wizardState.message = "Done!";
      this.$router.push("/google");
    }
  },
  mounted() {
  }
});
</script>
<template>
    <ProgressBar :current-step="1" />
    <h1>Step 1</h1>
    <Instructions text="This wizard will walk you through a series of steps that will create a synchronization service between your Google and Office 365 calendars. Click on the Proceed button below to get started." />
    <p>{{ wizardState.message }}</p>
    <button @click="proceed" class="btn btn__primary btn__lg">Proceed</button>
</template>