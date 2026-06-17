<template>
  <section
    id="home"
    class="h-screen bg-cover bg-center relative"
    style="background-image:url('https://images.unsplash.com/photo-1560066984-138dadb4c035')"
  >
    <div class="absolute inset-0 bg-black/45"></div>

    <div class="relative z-10 h-full flex items-center">
      <div class="max-w-7xl mx-auto px-6 w-full">
        <div class="max-w-3xl">
          <p class="uppercase tracking-[5px] text-[#D4AF37] font-semibold mb-4">
            Luxury Beauty & Wellness
          </p>
          <h1 class="text-white text-6xl md:text-7xl font-semibold leading-tight" style="font-family: 'Playfair Display', serif;">
            Reveal Your Most <br />
            Beautiful Self
          </h1>
          <p class="text-gray-200 text-lg mt-8 max-w-xl leading-relaxed">
            Luxury hair, makeup, nail, laser, and wellness treatments
            tailored exclusively for you.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <RouterLink to="/book" class="bg-[#D4AF37] text-white px-8 py-4 rounded-full hover:scale-105 transition inline-block">
              Book Appointment
            </RouterLink>
            <a href="#services" class="inline-block border border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-black transition">
              Explore Services
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>