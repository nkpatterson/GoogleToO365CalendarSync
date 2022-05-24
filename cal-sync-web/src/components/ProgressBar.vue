<script setup lang="ts">
import { defineComponent } from 'vue'
</script>
<script lang="ts">
export default defineComponent({
  props: {
      currentStep: {
          type: Number,
          default: 1
      }
  },
  data() {
    return {
        steps: ["Start", "Google", "Office 365", "Deploy", "Done"]
    }
  }
});
</script>
<template>
    <div class="stepper-wrapper">
        <div v-for="(step, index) in steps" class="stepper-item" :class="{ active: (index + 1 == currentStep), completed: (index + 1 < currentStep) }">
            <div class="step-counter">{{ index + 1 }}</div>
            <div class="step-name">{{ step }}</div>
        </div>
    </div>
</template>
<style>
    .stepper-wrapper {
        margin-top: auto;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        font-size: .8em;
    }
    .stepper-item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;

        @media (max-width: 768px) {
            font-size: 12px;
        }
    }

    .stepper-item::before {
        position: absolute;
        content: "";
        border-bottom: 2px solid #ccc;
        width: 100%;
        top: 15px;
        left: -50%;
        z-index: 2;
    }

    .stepper-item::after {
        position: absolute;
        content: "";
        border-bottom: 2px solid #ccc;
        width: 100%;
        top: 15px;
        left: 50%;
        z-index: 2;
    }

    .stepper-item .step-counter {
        position: relative;
        z-index: 5;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border-color: #ccc;
        border-width: 2px;
        border-style: solid;
        background: #fff;
        margin-bottom: 6px;
    }

    .stepper-item.active {
        font-weight: bold;
    }

    .stepper-item.active .step-counter {
        background-color: #ccc;
        border-color: #aaa;
    }

    .stepper-item.completed .step-counter {
        background-color: #4bb543;
        border-color: #4bb543;
        color: #fff;
    }

    .stepper-item.completed::after {
        position: absolute;
        content: "";
        border-bottom: 2px solid #4bb543;
        width: 100%;
        top: 15px;
        left: 50%;
        z-index: 3;
    }

    .stepper-item:first-child::before {
        content: none;
    }
    .stepper-item:last-child::after {
        content: none;
    }
</style>