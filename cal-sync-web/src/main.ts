import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { ApplicationInsights } from '@microsoft/applicationinsights-web'

import { Api } from './services/api-service'
import { wizardState } from './components/wizard-state';
import App from './App2.vue'
import Step1 from './components/Step1.vue'
import Step2 from './components/Step2.vue'
import Step3 from './components/Step3.vue'
import Step4 from './components/Step4.vue'
import Step5 from './components/Step5.vue'
import Invalid from './components/Invalid.vue'
import ConsentProvided from './components/ConsentProvided.vue'
import './assets/reset.css';

const appInsights = new ApplicationInsights({ config: {
  connectionString: 'InstrumentationKey=36613f09-4457-41bd-8a00-90ffc1868bbc;IngestionEndpoint=https://eastus2-3.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus2.livediagnostics.monitor.azure.com/',
  enableAutoRouteTracking: true,
  autoTrackPageVisitTime: true  
} });
appInsights.loadAppInsights();
appInsights.trackPageView();

const routes = [
  { path: '/', component: Step1 },
  { path: '/google', component: Step2 },
  { path: '/o365', component: Step3 },
  { path: '/provision', component: Step4 },
  { path: '/finish', component: Step5 },
  { path: '/invalid', component: Invalid },
  { path: '/consentProvided', component: ConsentProvided }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

router.beforeEach(async (to, from) => {
  let api = new Api();
  let user = await api.getCurrentUsername();
  if (user == "") {
    window.location.href = "/.auth/login/aad";
    return false;
  }

  let isValid = await api.isValidUser()
  if (!isValid && to.path != "/invalid") {
     return "/invalid";
  }

  // Start the wizard over if we lose state in the middle somehow
  if (wizardState.rgName == "" && to.path != "/" && to.path != "/invalid" && to.path != "/consentProvided") {
    return "/";
  }

  return true;
});

const app = createApp(App)
app.use(router).use(VueLoading)
app.mount('#app')