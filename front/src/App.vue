
<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import api from './helpers/Api';
import {useRouter} from 'vue-router'
const router = useRouter()
onMounted(async () =>  {
  const {data: health} = await api.get('/v1/health')
  await api.get('/v1/users/me')
    .catch(err => {
      if(err?.response?.status === 401) {
        router.push({name: 'login'})
      }
    })
  console.log(health)
})
</script>

<style scoped lang="scss">


</style>
