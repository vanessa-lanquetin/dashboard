<template>
  <header class="navBar">
    <img id="logo" src="../src/assets/logo-white.png" alt="logo" />
    <div class="nav--items">
      <router-link
        v-if="!['login', 'register'].includes($route.name)"
        class="nav-item"
        :to="{ name: 'home' }"
        >Accueil
      </router-link>

      <a class="nav-item" v-if="!['login', 'register'].includes($route.name)" @click="logout">
        Se déconnecter
      </a>
    </div>
  </header>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import api from './helpers/Api'
import { useRouter } from 'vue-router'
const router = useRouter()

const logout = () => {
  // Clear the token from localStorage
  localStorage.removeItem('token')
  // Redirect to the login page
  router.push({ name: 'login' })
}

onMounted(async () => {
  const { data: health } = await api.get('/v1/health')
  await api.get('/v1/users/me').catch((err) => {
    if (err?.response?.status === 401) {
      router.push({ name: 'login' })
    }
  })
  console.log(health)
})
</script>

<style scoped lang="scss">
.navBar {
  background-color: #0B6668;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  img {
    width: 120px;
    height: auto;
    margin: 10px 0;
  }
  a {
    text-decoration: none;
    color: #fff;
  }
  .nav--items {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-around;
    align-items: center;
    padding-right: 20px;
    .nav-item:hover {
      cursor: pointer;
      transition: border-bottom 300ms ease-in-out;
      border-bottom: #fff 1px solid;
    }
  }
}
</style>
