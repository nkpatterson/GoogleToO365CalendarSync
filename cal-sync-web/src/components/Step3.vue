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
      
      let consentWindow = window.open(conn.ConsentLink, "", "width=500,height=600,menubar=no,toolbar=no,popup=yes");
      var timer = setInterval(function() { 
        if(consentWindow != null && consentWindow.closed) {
            clearInterval(timer);
            rtr.push('/provision');
        }
      }, 500);
    },
  },
  mounted() {
  }
});
</script>
<template>
    <ProgressBar :current-step="3" />
    <h1>Step 3</h1>
    <Instructions text="On this step, you will establish a connection to your Office 365 calendar. Click the Login to Office 365 button below and login with your @microsoft.com Microsoft credentials in order to authorize access to the application." />
    <p>{{ wizardState.message }}</p>
    <button @click="proceed" class="btn btn__primary btn__lg">Login to Office 365</button>
</template>