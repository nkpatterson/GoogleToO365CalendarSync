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
            this.wizardState.message = "Please provide your Google Calendar email address.";
            return;
        }

        this.wizardState.message = "Loading, please wait..."
        let success = await api.deployLogicApps(this.wizardState.rgName, 
            this.wizardState.googleResourceId, 
            this.wizardState.googleCalendarId, 
            this.wizardState.office365ResourceId);
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
    <ProgressBar />
    <Instructions />
    <h1>Step 4</h1>
    <p>This is the final step towards enlightement. Please provide your Google Calendar email address ([alias]@github.com).</p>
    <p>{{ wizardState.message }}</p>
    <input type="text" v-model.trim="wizardState.googleCalendarId" placeholder="[alias]@github.com" /><br/>
    <button @click="proceed">Proceed</button>
</template>