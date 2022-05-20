import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App2.vue'
import Step1 from './components/Step1.vue'
import Step2 from './components/Step2.vue'
import Step3 from './components/Step3.vue'
import Step4 from './components/Step4.vue'
import Step5 from './components/Step5.vue'
import Invalid from './components/Invalid.vue'

// 1. Define route components.
// These can be imported from other files
// const Step1 = { template: './components/Step1.vue' }

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Step1 },
  { path: '/google', component: Step2 },
  { path: '/o365', component: Step3 },
  { path: '/provision', component: Step4 },
  { path: '/finish', component: Step5 },
  { path: '/invalid', component: Invalid }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

// 5. Create and mount the root instance.
const app = createApp(App)
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)

app.mount('#app')

// Now the app has started!