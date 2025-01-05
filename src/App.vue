<template>
  <div class="row justify-end" v-if="route.name !== 'Login'">
    <div class="q-mr-sm">
      <router-link :to="{name: 'Cart'}" v-if="route.name !== 'Cart' && cart.length">
        <q-btn color="light-blue-10" icon="shopping_cart" label="Перейти в корзину" no-caps><span class="countCart">({{ totalCount }})</span></q-btn>
      </router-link>
    </div>
    <div v-if="isAuth">
      <q-btn color="positive" class="btn" @click="logOut" no-caps>Выйти из учётной записи</q-btn>
    </div>
    <div v-else>
      <router-link :to="{name: 'Login'}">
        <q-btn color="positive" class="btn" @click="logIn" no-caps>Авторизоваться</q-btn>
      </router-link>
    </div>
  </div>
  <div class="q-mt-lg">
    <router-view></router-view>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { cart, totalCount, isAuth } from './composables'

  const route = useRoute()
  const router = useRouter()

  onMounted(() => localStorage.getItem("login") === "true" ? isAuth.value = true : isAuth.value = false)

  const logIn = () => {
    localStorage.setItem("login", true)
    isAuth.value = true
  }
  const logOut = () => {
    localStorage.setItem("login", false)
    isAuth.value = false
    if (route.name === 'AddProduct') router.push({name: "Index"})
  }
</script>

<style scoped>
  .countCart {
    background-color: #f91155;
    border-radius: 100%;
    padding: 0px 3px;
    margin-left: 5px;
  }
</style>
