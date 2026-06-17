<template>
  <div>
    <Navbar />

    <HomeHero />
    <StatsSection />
    <ServicesPreview />
    <SpecialistsPreview />
    <AboutPreview />
    <ReviewsSection />
    <MembershipPreview />
    <CTASection />
    <OffersSection />
    <GiftCardsSection />
    <ProductsSection />
  </div>
</template>

<script setup>
import Navbar from '../components/layout/Navbar.vue'
import Footer from '../components/layout/Footer.vue'

import HomeHero from '../components/home/HomeHero.vue'
import StatsSection from '../components/home/StatsSection.vue'
import ServicesPreview from '../components/home/ServicesPreview.vue'
import SpecialistsPreview from '../components/home/SpecialistsPreview.vue'
import AboutPreview from '../components/home/AboutPreview.vue'
import ReviewsSection from '../components/home/ReviewsSection.vue'
import MembershipPreview from '../components/home/MembershipPreview.vue'
import CTASection from '../components/home/CTASection.vue'
import OffersSection from '../components/home/OffersSection.vue'
import GiftCardsSection from '../components/home/GiftCardsSection.vue'
import ProductsSection from '../components/home/ProductsSection.vue'
</script>