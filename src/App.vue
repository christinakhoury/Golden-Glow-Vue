<template>
  <Navbar v-if="!hideLayout" />

  <router-view />

  <Footer :mode="footerMode" v-if="!hideLayout" />
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"

import Navbar from "./components/layout/Navbar.vue"
import Footer from "./components/layout/Footer.vue"

const route = useRoute()

const hideLayout = computed(() =>
  ["giftcards","login","payment", "voucher"].includes(route.name)
)

const footerMode = computed(() =>
  route.name === "home" ? "full" : "simple"
)


import { ref, provide } from "vue"

const user = ref(JSON.parse(localStorage.getItem("gg-user")) || null)

// make it available everywhere
provide("user", user)

</script>