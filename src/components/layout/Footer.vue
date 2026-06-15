<template>
  <footer class="bg-[#1C1C1C] text-white py-16">

    <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

      <!-- BRAND -->
      <div>
        <h2 class="text-2xl font-bold text-[#D4AF37]">
          Golden Glow Studio
        </h2>

        <p class="mt-4 text-gray-400">
          Where Beauty Meets Luxury.<br />

          <a
            href="https://www.google.com/maps/search/?api=1&query=Beirut,Lebanon"
            target="_blank"
            class="text-gray-400 hover:text-[#D4AF37] transition"
          >
            📍 Beirut, Lebanon
          </a>
        </p>
      </div>

      <!-- QUICK LINKS (only full mode) -->
      <div v-if="mode === 'full'">
        <h3 class="font-bold mb-3">Quick Links</h3>

        <ul class="space-y-2 text-gray-400">
          <li><a href="#home" class="hover:text-[#D4AF37]">Home</a></li>
          <li><a href="#services" class="hover:text-[#D4AF37]">Services</a></li>
          <li><a href="#offers" class="hover:text-[#D4AF37]">Offers</a></li>
        </ul>
      </div>

     <!-- CONTACT --> <div>
       <h3 class="font-bold mb-3">Contact</h3>
        <p class="text-gray-400">+961 XXX XXX</p>
         <div class="flex gap-4 mt-4">
           <a href="https://instagram.com/yourpage" target="_blank" class="w-10 h-10 flex items-center justify-center rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition" >
            <i class="fab fa-instagram"></i> </a>
             <a href="https://facebook.com/yourpage" target="_blank" class="w-10 h-10 flex items-center justify-center rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition" > 
              <i class="fab fa-facebook-f"></i> </a> 
              <a href="https://wa.me/961XXXXXXXX" target="_blank" class="w-10 h-10 flex items-center justify-center rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition" >
                 <i class="fab fa-whatsapp"></i> 
                </a>
               </div>
         </div>

      <!-- OPENING HOURS -->
      <div>
        <h3 class="font-bold mb-3">Opening Hours</h3>

        <p class="text-gray-400">Mon - Sat: 8AM - 10PM</p>
        <p class="text-gray-400">Sunday: Closed</p>
      </div>

    </div>

    <!-- COPYRIGHT -->
    <div class="max-w-7xl mx-auto px-6 flex justify-between text-xs text-white/30 mt-10">
      <p>© 2025 Golden Glow Studio</p>
      <p>Privacy Policy · Terms</p>
    </div>

  </footer>
</template>

<script setup>
defineProps({
  mode: {
    type: String,
    default: "full" 
  }
})
</script>