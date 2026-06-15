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

  {
    path: "/book",
    name: "book",
    component: BookView
  },

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

  // 💳 Gift Cards Flow
  {
    path: "/giftcards",
    name: "giftcards",
    component: GiftCardsFormView,
    meta: { hideLayout: true }
  },

  {
    path: "/payment",
    name: "payment",
    component: PaymentView,
    meta: { hideLayout: true }
  },

  {
    path: "/voucher",
    name: "voucher",
    component: VoucherView,
    meta: { hideLayout: true }
  },
  {
  path: "/login",
  name: "login",
  component: () => import("../views/LoginView.vue"),
   meta: { hideLayout: true },
  },

  {
  path: "/vip",
  name: "vip",
  component: () => import("../views/VIPView.vue"),
  meta: { hideLayout: true },
  },  
  

  
]

const router = createRouter({
  history: createWebHistory(),
  routes,

  // ✅ scroll fix (always top on navigation)
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
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

  // 🚫 Payment blocked if no gift card started
  if (to.name === "payment" && !giftCard) {
    return next("/giftcards")
  }

  if (to.name === "vip" && !user) {
  return next("/login")
}

  // 🚫 Voucher blocked if no completed payment
  if (to.name === "voucher" && completed.length === 0) {
    return next("/giftcards")
  }
  next()
})

export default router