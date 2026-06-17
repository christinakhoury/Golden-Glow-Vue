import { createRouter, createWebHistory } from "vue-router"

// Views
import HomeView from "../views/HomeView.vue"
import BookView from "../views/BookView.vue"
import ServiceView from "../views/ServiceView.vue"
import GiftCardsFormView from "../views/GiftCardsForm.vue"
import PaymentView from "../views/PaymentView.vue"
import VoucherView from "../views/VoucherView.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },

  /* =========================
     CART + BOOKING FLOW
  ========================= */

  {
    path: "/book",
    name: "book",
    component: BookView
  },

{
  path: "/cart",
  name: "cart",
  component: () => import("../views/CartView.vue")
},

  {
    path: "/payment",
    name: "payment",
    component: PaymentView
  },

  {
    path: "/booking",
    name: "booking",
    component: () => import("../views/BookView.vue")
  },

  /* =========================
     SERVICES
  ========================= */

  {
    path: "/services/:type",
    name: "service",
    component: ServiceView,
    props: true
  },

  {
    path: "/specialists",
    name: "specialists",
    component: () => import("../views/SpecialistsView.vue")
  },

  /* =========================
     GIFT CARDS FLOW
  ========================= */

  {
    path: "/giftcards",
    name: "giftcards",
    component: GiftCardsFormView,
    meta: { hideLayout: true }
  },

  {
    path: "/voucher",
    name: "voucher",
    component: VoucherView,
    meta: { hideLayout: true }
  },

  /* =========================
     AUTH + VIP
  ========================= */

  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: { hideLayout: true }
  },

  {
    path: "/vip",
    name: "vip",
    component: () => import("../views/VIPView.vue"),
    meta: { hideLayout: true }
  }
]

/* =========================
   ROUTER
========================= */

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth"
      }
    }

    return { top: 0 }
  }
})

/* =========================
   GLOBAL ROUTE GUARDS
========================= */

router.beforeEach((to, from, next) => {
  const giftCard = JSON.parse(localStorage.getItem("gg-current-giftcard"))
  const completed = JSON.parse(localStorage.getItem("gg-giftcards")) || []
  const user = JSON.parse(localStorage.getItem("gg-user"))

  /* 🚫 Payment protection (gift cards) */
  if (to.name === "payment" && !giftCard) {
    return next("/giftcards")
  }

  /* 🚫 VIP only for logged in users */
  if (to.name === "vip" && !user) {
    return next("/login")
  }

  /* 🚫 Voucher only after completion */
  if (to.name === "voucher" && completed.length === 0) {
    return next("/giftcards")
  }

  next()
})

export default router