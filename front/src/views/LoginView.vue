<template>
  <div class="body">
    <div class="container-form">
      <h1>{{ isLogin ? 'Se connecter' : 'Créer votre compte' }}</h1>
      {{ error }}
      <div class="fields-form">
        <label name="email">Email</label>
        <input type="text" v-model="user.email" />
        <label name="password">Mot de passe</label>
        <input type="password" v-model="user.password" />
      </div>
      <button @click="send">Valider</button>
      <p v-if="isLogin">
        Pas encore de compte - <router-link :to="{ name: 'register' }">Enregistrez vous</router-link>
      </p>
      <p v-else>
        Déjà un compte ? - <router-link :to="{ name: 'login' }">Connectez vous</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../helpers/Api'
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
    if (props.isLogin) {
      const { data: token } = await api.post('v1/users/login', user.value)
      localStorage.setItem('token', token)
      api.defaults.headers.authorization = `Bearer ${token}`
    } else {
      const { data: token } = await api.post('v1/users/register', user.value)
      localStorage.setItem('token', token)
      api.defaults.headers.authorization = `Bearer ${token}`
    }
    router.push({ name: 'home' })
  } catch (err) {
    error.value = err?.response?.data
  }
}
</script>

<style lang="scss" scoped>
.body {
  color: #fff;

  .container-form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 50px;
    gap: 20px;
    h1 {
      font-size: 1.8rem;
      margin: 30px 0px;
      color: #fff;
      font-weight: 900;
    }
    .fields-form{
      display: flex;
      flex-direction: column ;
      justify-content:center ;
      margin: auto;
      text-align: left;
      align-items: center;
      width: 100%;
      gap: 20px;

      label{
        font-size: 1rem;

      }
      input{
        font-size: 1rem;
      }
    }
    button{
      background-color: #8685856f;
      color: #fff;
      border: #fff solid 1px;
      font-size: 1rem;
      font-weight: 100;
      &:hover{
        transition: background-color  300ms ease-in-out;
        background-color: #007BFF;
        border: none;
      }
    }
    a{
      color:#007BFF;
      font-weight: 800;
      font-size: 0.9rem;
    }
  }
}
</style>
