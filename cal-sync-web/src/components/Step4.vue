<script setup lang="ts">
import { Api, CalendarApi } from '../services/api-service'
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
        if (this.wizardState.googleCalendarId == "") {
            return;
        }

        let loader = this.$loading.show();
        let success = await api.deployLogicApps(this.wizardState.rgName, 
            this.wizardState.googleResourceId, 
            this.wizardState.googleCalendarId, 
            this.wizardState.office365ResourceId);
        loader.hide();

        if (success) {
            this.$router.push('/finish');
        }
    },
  },
  mounted() {
  }
});
</script>
<template>
    <ProgressBar :current-step="4" />
    <h1>Step 4 - Deploy Sync Engine</h1>
    <Instructions text="This is the last step where we will provision the sync service. Please provide your Google Calendar email address ([alias]@github.com) in the box below before clicking the Proceed button." />
    <div class="btn-bar">
      <input type="text" v-model.trim="wizardState.googleCalendarId" placeholder="[alias]@github.com" class="input__lg" /><br/>
      <button @click="proceed" class="btn btn__primary btn__lg">Proceed</button>
    </div>
</template>