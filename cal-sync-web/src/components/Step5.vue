<script setup lang="ts">
import ProgressBar from './ProgressBar.vue'
import Instructions from './Instructions.vue'
</script>
<template>
    <ProgressBar :current-step="5" />
    <h1>Done!</h1>
    <Instructions text="You're all set! You should start to see calendar events syncing from your Google calendar to your Office 365 calendar shortly." />
</template>