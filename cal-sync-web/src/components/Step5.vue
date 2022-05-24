<script setup lang="ts">
import ProgressBar from './ProgressBar.vue'
import Instructions from './Instructions.vue'
</script>
<template>
    <ProgressBar :current-step="5" />
    <h1>Step 5</h1>
    <Instructions text="All done! You should start to see calendar events syncing from your Google calendar to your Office 365 calendar shortly." />
</template>