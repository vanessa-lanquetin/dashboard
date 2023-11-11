<template>
  <header class="navBar">
    <!-- Logo -->
    <router-link :to="{ name: 'home' }">
      <img id="logo" src="../src/assets/logo-white.png" alt="logo" />
    </router-link>

    <!-- Éléments de navigation -->
    <div class="nav--items" :class="{ 'nav--items-open': isMenuOpen }">
      <!-- Lien vers la page d'accueil -->
      <router-link
        v-if="!['login', 'register'].includes($route.name)"
        class="nav-item"
        :to="{ name: 'home' }"
      >
        Accueil
      </router-link>

      <!-- Bouton de déconnexion -->
      <a class="nav-item" v-if="!['login', 'register'].includes($route.name)" @click="logout">
        Se déconnecter
      </a>
    </div>

    <!-- Bouton du menu hamburger -->
    <button
      v-if="!['login', 'register'].includes($route.name)"
      class="hamburger"
      @click="toggleMenu"
    >
      <!-- <i> utilise une classe dynamique (:class) basée sur la valeur de isMenuOpen.
Si le menu est ouvert (isMenuOpen est true), l'icône du menu sera une croix (fas fa-times).
Sinon, si le menu est fermé, l'icône sera constituée de trois barres horizontales (fas fa-bars). -->
      <i :class="{ 'fas fa-times': isMenuOpen, 'fas fa-bars': !isMenuOpen }"></i>
    </button>
  </header>
  <!-- Vue du routeur pour afficher les composants en fonction de la route -->
  <RouterView />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import api from './helpers/Api'
import { useRouter } from 'vue-router'
const router = useRouter()

// Variable réactive pour l'état du menu
const isMenuOpen = ref(false)

// Fonction pour basculer l'état du menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// Fonction pour gérer la déconnexion de l'utilisateur
const logout = () => {
  // Effacer le jeton du localStorage
  localStorage.removeItem('token')
  // Rediriger vers la page de connexion
  router.push({ name: 'login' })
}

// Récupérer les données de santé et vérifier l'authentification de l'utilisateur à la création du composant
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
/* Styles pour la barre de navigation */
.navBar {
  background-color: #0b6668;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  /* Styles pour le logo */
  img {
    width: 120px;
    height: auto;
    margin: 10px 0;
  }

  /* Styles pour les liens de navigation */
  a {
    text-decoration: none;
    color: #fff;
  }

  /* Styles pour le conteneur des éléments de navigation */
  .nav--items {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-around;
    align-items: center;
    padding-right: 20px;
    box-sizing: border-box;

    /* Styles pour l'effet de survol sur les éléments de navigation */
    .nav-item:hover {
      cursor: pointer;
      color: #e59c3e;
      transition: border-bottom 300ms ease-in-out;
      border-bottom: #e59c3e 1px solid;
    }
  }

  /* Styles pour le bouton du menu hamburger */
  .hamburger {
    display: none;
    cursor: pointer;
    background-color: transparent;
    border: none;
    padding: 5px;
    margin-right: 20px;

    /* Styles pour l'icône du hamburger */
    i {
      font-size: 1.5rem;
      color: #fff;
    }
  }

  /* Media query pour la responsivité */
  @media (max-width: 980px) {
    .nav-item:hover {
      border-bottom: none !important;
      transition: 300ms ease-in-out;
      text-decoration: underline;
    }
    /* Cacher les éléments de navigation et afficher le bouton du menu hamburger */
    .nav--items {
      display: none;
      flex-direction: column;
      align-items: flex-end;
      padding-right: 0;
      width: 100%;
      position: absolute;
      gap: 0px;
      top: 70px;
      right: 0;
      background-color: #0b6668;

      /* Afficher les éléments de navigation lorsque le menu est ouvert */
      &.nav--items-open {
        display: flex;
        width: max-content;
        transform: translateY(-15px);
      }

      /* Styles pour les éléments de navigation en mode responsif */
      .nav-item {
        padding: 10px;
        width: 100%;
        text-align: left;
        box-sizing: border-box;
      }
    }

    /* Afficher le bouton du menu hamburger */
    .hamburger {
      display: flex;
    }
  }
}
</style>
