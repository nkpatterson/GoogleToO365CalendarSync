<script setup lang="ts">
import Instructions from './Instructions.vue'
</script>
<template>
    <h1>Invalid Login</h1>
    <Instructions text="You must be signed in with your @microsoft.com credentials to use this application." />
    <div class="btn-bar">
        <a href="/.auth/logout">Log Out</a>
    </div>
</template>