
<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import api from './helpers/Api';
onMounted(async () =>  {
  const {data: health} = await api.get('/v1/health')
  console.log(health)
})
</script>

<style scoped lang="scss">


</style>
