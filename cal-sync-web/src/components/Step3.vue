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
      
      let consentWindow = window.open(conn.ConsentLink, "", "width=400,height=500,menubar=no,toolbar=no,");
      let timer = setTimeout(function() {
        if (consentWindow != null && consentWindow.location.href.indexOf("code=") > -1) {
          let code = api.getConsentCodeFromUrl(consentWindow.location.href);
          if (code != "") {
            clearTimeout(timer);
            consentWindow.close();
            api.confirmConsentCode(code, wizardState.office365ResourceId).then((result) => {
              if (result) {
                wizardState.message = "Done!";
                rtr.push("/provision");
              }
            });
          }
        }
      }, 500);
  },
  mounted() {
  }
});
</script>
<template>
    <ProgressBar />
    <Instructions />
    <h1>Step 3</h1>
    <p>This is the third step towards enlightenment. You must login with your @microsoft.com Microsoft credentials.</p>
    <p>{{ wizardState.message }}</p>
    <button @click="proceed">Login to Office 365</button>
</template>