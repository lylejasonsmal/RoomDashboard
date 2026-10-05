<template>
  <header>
    <img :src="logo" alt="Logo" />
    <nav>
      <router-link v-for="route in routes" :to="route.path" :class="router.currentRoute.value.path === route.path ? 'active' : ''"> {{route.name}} </router-link>
    </nav>

    <!-- Hamburger Menu Icon for Mobile -->
    <span class="material-symbols-outlined mobile-menu-hamburger" @click="toggleMenu">
      {{isMenuOpen? "close": "menu"}}
    </span>
    <div class="mobile-menu" v-show="isMenuOpen">
      <div>
        <router-link v-for="route in routes" :to="route.path" :class="router.currentRoute.value.path === route.path ? 'active' : ''" @click="toggleMenu">
          <h3>
            <material-design-icon :icon="route.meta.icon"/> &nbsp; {{route.name}}
          </h3>
        </router-link>
      </div>
    </div>
  </header>
</template>
<script setup>
import router from '@/router/index.js'
import logo from '@/assets/logo.svg'
import { ref } from 'vue'
import MaterialDesignIcon from '@/components/Commonly Used/MaterialDesignIcon.vue'

const routes = router.getRoutes().filter(x=>x.meta.category === 'basic')
const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>
<style scoped>
header {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 75px;
  backdrop-filter: blur(15px);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
  color: var(--page-text);
  margin: 0;
  padding: 0 20px;
  box-sizing: border-box;
}

img {
  height: 100%;
  padding: 10px 0;
  box-sizing: border-box;
}

nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
  height: 100%;
  text-align: center;
}

a {
  all: unset;
  font-weight: bold;
  color: var(--grey-mid);
  font-size: 90%;
  transition: 0.3s ease-in-out;
  padding: 10px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

a:hover {
  color: var(--page-text);
}

.active{
  opacity: 75%;
  color: var(--page-text);
  border-bottom: 2px solid var(--accent-light);
  transition: 0.1s ease-in-out;
}

.active:hover {
  opacity: 100%;
  border-bottom: 5px solid var(--accent-light);
}

.mobile-menu-hamburger{
  display: none;
  cursor: pointer;
}

@media (max-width: 600px) {
  nav {
    display: none;
  }

  .mobile-menu-hamburger{
    display: flex;
  }

  header{
    justify-content: space-between;
    background: var(--page-background) !important;
    backdrop-filter: none !important;
  }

  .mobile-menu{
    position: fixed;
    z-index: 2000;
    top: 75px;
    right: 0;
    width: 100vw;
    height: 100vh;
    background: var(--page-background);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-size: 140%;
    overflow-y: scroll;
    animation: expandOpen 0.5s ease-in-out;
    gap: 25px;
  }

  .mobile-menu h3{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  a{
    height: 100px;
    min-width: 50vw;
  }

  @keyframes expandOpen {
    from{
      opacity: 0;
      transform: translateX(100%);
    }
    to{
      opacity: 1;
      transform: translateX( 0%);
    }
  }
}
</style>
