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
      let conn = await api.createExternalConnection(CalendarApi.GoogleCalendar, this.wizardState.userAlias, this.wizardState.rgName);
      this.wizardState.googleResourceId = conn.ResourceId;
      let rtr = this.$router;
      
      let consentWindow = window.open(conn.ConsentLink, "", "width=300,height=500,menubar=no,toolbar=no,");
      if (consentWindow != null) {
        consentWindow.onload = function() {
          if (consentWindow != null && consentWindow.location.href.indexOf("code=") > -1) {
            let code = api.getConsentCodeFromUrl(consentWindow.location.href);
            if (code != "") {
              consentWindow.close();
              api.confirmConsentCode(code, wizardState.googleResourceId).then((result) => {
                if (result) {
                  wizardState.message = "Done!";
                  rtr.push("/o365");
                }
              });
            }
          }
        }
      }
    }
  },
  mounted() {
  }
});
</script>
<template>
    <ProgressBar />
    <Instructions />
    <h1>Step 2</h1>
    <p>This is the second step towards enlightenment. You must login with your @github.com Google credentials.</p>
    <p>{{ wizardState.message }}</p>
    <button @click="proceed">Login to Google</button>
</template>