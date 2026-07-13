import { createRouter, createWebHistory } from "vue-router"

// Views
import HomeView from "../views/HomeView.vue"
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
    path: "/payment",
    name: "payment",
    component: PaymentView
  },
  {
    path: "/booking",
    name: "booking",
    component: () => import("../views/BookView.vue")
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
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import("../views/CheckoutView.vue")
  },
  {
    path: "/products",
    name: "products",
    component: () => import("../views/ProductsView.vue")
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: () => import('../views/WishlistView.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartView.vue'),
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../views/AccountView.vue'), // Points directly to your new component
    meta: { requiresAuth: true }
  }
]

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
  // Let's grab all possible places your app might look for a user session
  const user = JSON.parse(localStorage.getItem("gg-user") || localStorage.getItem("auth_user") || "null")
  const token = localStorage.getItem("gg-token") || localStorage.getItem("gg-token") // matches auth.js keys
  
  const giftCard = JSON.parse(localStorage.getItem("gg-current-giftcard"))
  const completed = JSON.parse(localStorage.getItem("gg-giftcards")) || []

  /* 🚫 Profile and security settings authentication check */
  if (to.meta.requiresAuth) {
    // If we have a user object OR a token, let them right in!
    if (!user && !token) {
      console.warn("🔒 Route blocked: Redirecting unauthorized guest to login portal.")
      return next("/login")
    }
  }

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

  const paymentConfirmed = localStorage.getItem("paymentConfirmed")

  if (to.name === "booking" && !paymentConfirmed) {
    return next("/cart")
  }

  next()
})

export default router