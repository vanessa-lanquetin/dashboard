<template>
  <div>
    <h1>{{ isLogin ? 'Connection' : 'Enregistrement' }}</h1>
    {{ error }}
    <input type="text" v-model="user.email">
    <input type="password" v-model="user.password">
    <button @click="send">Valider</button>
    <p v-if="isLogin">Pas encore de compte <router-link :to="{name: 'register'}">enregistrez vous</router-link></p>
    <p v-else>Déjà un compte ? <router-link :to="{name: 'login'}">Connectez vous</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../helpers/Api';
const router = useRouter()

const props = defineProps({
  isLogin: {
    default: false
  }
})

const user = ref({
  email: '',
  password: ''
})
const error = ref('')

async function send() {
  error.value = ''
  try {
    if(props.isLogin) {
      const {data: token} = await api.post('v1/users/login', user.value)
      localStorage.setItem('token', token)
      api.defaults.headers.authorization = `Bearer ${token}`
    } else {
      const {data: token} = await api.post('v1/users/register', user.value)
      localStorage.setItem('token', token)
      api.defaults.headers.authorization = `Bearer ${token}`
    }
    router.push({name: 'home'})
  } catch (err) {
    error.value = err?.response?.data
  }

}
</script>

<style>

</style>