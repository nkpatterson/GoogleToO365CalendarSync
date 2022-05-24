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
      this.wizardState.message = "Loading, please wait..."
      let conn = await api.createExternalConnection(CalendarApi.Office365Calendar, this.wizardState.userAlias, this.wizardState.rgName);
      this.wizardState.office365ResourceId = conn.ResourceId;
      let rtr = this.$router;
      
      let consentWindow = window.open(conn.ConsentLink, "", "width=400,height=600,menubar=no,toolbar=no,popup=yes");
      if (consentWindow != null) {
        consentWindow.onbeforeunload = function() {
          rtr.push('/provision');
        }
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
    <h1>Step 3</h1>
    <p>This is the third step towards enlightenment. You must login with your @microsoft.com Microsoft O365 credentials.</p>
    <p>{{ wizardState.message }}</p>
    <button @click="proceed">Login to Office 365</button>
</template>