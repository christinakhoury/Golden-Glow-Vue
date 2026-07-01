<template>
  <div class="min-h-screen bg-[#FAF6F0] text-stone-800 antialiased pt-40 pb-32 relative overflow-hidden font-sans selection:bg-[#D4AF37]/10">
    
    <!-- BRAND CANVAS FINE GRAPH LINES -->
    <div class="absolute inset-y-0 left-12 w-px bg-stone-200/40 hidden lg:block"></div>
    <div class="absolute inset-y-0 right-12 w-px bg-stone-200/40 hidden lg:block"></div>

    <!-- HEADER HERO: Minimalist Luxury Split Layout -->
    <section class="max-w-7xl mx-auto px-6 lg:px-16 mb-24 relative z-10" data-aos="fade-up" data-aos-duration="1000">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-stone-200 pb-16">
        <div class="lg:col-span-7 space-y-4">
          <span class="text-[#D4AF37] tracking-[0.4em] text-xs uppercase font-bold inline-flex items-center gap-3">
            <span class="w-6 h-px bg-[#D4AF37]"></span> Salon Menu Portfolio
          </span>
          <h1 class="text-5xl md:text-7xl font-light text-stone-900 tracking-tighter leading-none" style="font-family: 'Playfair Display', serif;">
            {{ current.title }}
          </h1>
        </div>
        <div class="lg:col-span-5 lg:pt-8">
          <p class="text-stone-500 text-base font-light leading-relaxed border-l border-stone-300 pl-6">
            {{ current.desc }}
          </p>
        </div>
      </div>
    </section>

    <!-- RITUAL SERVICES: Architectural Alternating Cards -->
    <section class="max-w-7xl mx-auto px-6 lg:px-16 mb-32 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div 
          v-for="(item, idx) in current.services" 
          :key="item.name"
          class="bg-white border border-stone-200/60 p-8 lg:p-10 transition-all duration-700 ease-out hover:border-[#D4AF37] hover:shadow-[0_30px_60px_-20px_rgba(212,175,55,0.05)] flex flex-col justify-between group relative"
          data-aos="fade-up"
          :data-aos-delay="idx * 100"
        >
          <!-- Top Border Accent Animation -->
          <div class="absolute top-0 left-0 w-full h-0.5 bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

          <div>
            <div class="flex justify-between items-baseline gap-4 mb-4">
              <h3 class="text-2xl text-stone-900 font-light tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300" style="font-family: 'Playfair Display', serif;">
                {{ item.name }}
              </h3>
              <span class="text-md font-serif font-medium text-stone-900 tracking-tight whitespace-nowrap border-b border-stone-200 pb-1">
                {{ item.price }}
              </span>
            </div>
            
            <div class="flex items-center gap-2 mb-6">
              <span class="w-1 h-1 rounded-full bg-[#D4AF37]"></span>
              <span class="text-[10px] tracking-widest uppercase font-mono text-stone-400 font-semibold">
                {{ item.time }}
              </span>
            </div>

            <p class="text-stone-500 text-sm font-light leading-relaxed mb-12">
              {{ item.desc }}
            </p>
          </div>

          <!-- Premium Minimalist CTA Trigger Button -->
          <div class="pt-6 border-t border-stone-100 flex justify-end">
            <router-link 
              :to="`/book?service=${item.slug}`"
              class="inline-flex items-center gap-4 text-[11px] tracking-[0.25em] uppercase font-bold text-white bg-stone-900 hover:bg-[#D4AF37] px-8 py-4 transition-all duration-300 rounded-none shadow-sm"
            >
              Book Session
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- RESIDENT ARTISANS: High-Fashion Alabaster Split-Pane Focus -->
    <section class="py-32 bg-white text-stone-900 relative border-y border-stone-200">
      <div class="max-w-7xl mx-auto px-6 lg:px-16">
        
        <div class="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end" data-aos="fade-up">
          <div class="lg:col-span-8">
            <span class="text-xs text-[#D4AF37] uppercase tracking-[0.4em] font-bold block mb-3">// The Guild</span>
            <h2 class="text-4xl md:text-6xl font-light text-stone-900 tracking-tight" style="font-family: 'Playfair Display', serif;">
              Resident Master Artisans
            </h2>
          </div>
          <div class="lg:col-span-4">
            <p class="text-stone-500 text-sm font-light leading-relaxed border-l-2 border-[#D4AF37] pl-4">
              Entrust your experience to our internationally trained experts dedicated to personal wellness.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div 
            v-for="(spec, idx) in current.specialists" 
            :key="spec.name"
            class="flex flex-col justify-between group text-left relative"
            data-aos="fade-up"
            :data-aos-delay="idx * 150"
          >
            <div>
              <!-- Image Holder: Archival Framed Box Portrait -->
              <div class="relative aspect-[4/5] w-full overflow-hidden bg-stone-100 mb-8 border border-stone-200 p-2 transition-all duration-500 group-hover:border-[#D4AF37]">
                <div class="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors z-10 m-2"></div>
                <img v-if="spec.img" :src="spec.img" class="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]" />
              </div>

              <div class="flex items-center justify-between gap-2 text-[10px] text-[#D4AF37] tracking-[0.2em] uppercase font-bold mb-3">
                <span>{{ spec.role }}</span>
                <span class="border border-stone-200 px-2 py-0.5 text-stone-400 font-mono tracking-normal">{{ spec.exp }} Yrs Exp</span>
              </div>
              
              <h3 class="text-2xl text-stone-900 font-light mb-4" style="font-family: 'Playfair Display', serif;">
                {{ spec.name }}
              </h3>
              
              <p class="text-stone-500 text-xs font-light leading-relaxed italic mb-8 border-l border-stone-200 pl-4">
                "Dedicated to transforming structural balance while honoring the underlying health and texture profile of each individual visitor."
              </p>
            </div>

            <div class="pt-6 border-t border-stone-100">
              <router-link 
                :to="`/book?specialist=${spec.name}&service=${serviceType}`"
                class="w-full text-center block border border-stone-900 hover:bg-stone-900 hover:text-white text-stone-900 text-[11px] tracking-widest uppercase font-bold py-4 transition-all duration-300"
              >
                Reserve With {{ spec.name.split(' ')[0] }}
              </router-link>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- CORE PHILOSOPHY: Grid of Values -->
    <section class="pt-32 max-w-7xl mx-auto px-6 lg:px-16 relative z-10" data-aos="fade-up" data-aos-duration="1000">
      <div class="bg-white border border-stone-200/60 p-10 md:p-16 relative overflow-hidden">
        
        <div class="max-w-3xl mb-20">
          <span class="text-xs text-[#D4AF37] uppercase tracking-[0.4em] font-bold block mb-3">// Our Signature Approach</span>
          <h3 class="text-3xl md:text-4xl text-stone-900 font-light tracking-tight" style="font-family: 'Playfair Display', serif;">
            {{ current.benefitsTitle || 'The Maison Way' }}
          </h3>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div 
            v-for="(benefit, index) in current.benefits" 
            :key="benefit.title"
            class="space-y-4 border-t border-stone-200 pt-6 relative group"
          >
            <!-- Animated Gold Indicator underneath item rows -->
            <div class="absolute top-0 left-0 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-500"></div>

            <span class="font-mono text-xs text-[#D4AF37] block font-bold">
              // 0{{ index + 1 }}
            </span>
            <h4 class="text-lg font-light text-stone-900 tracking-tight" style="font-family: 'Playfair Display', serif;">
              {{ benefit.title }}
            </h4>
            <p class="text-stone-500 text-xs font-light leading-relaxed">
              {{ benefit.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { loadStudioServices } from "../services/service"

const route = useRoute()
const serviceType = route.params.type

const services = ref([])

/* ================= NORMALIZER ================= */
const normalize = (str) =>
  (str || "")
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")

/* ================= LOAD API SERVICES ================= */
onMounted(async () => {
  try {
    console.log("📡 Loading services...")

    const data = await loadStudioServices()

    console.log("📦 SERVICES API:", data)

    if (Array.isArray(data)) {
      services.value = data
    } else {
      services.value = []
    }

  } catch (err) {
    console.error("❌ Failed to load services:", err)
    services.value = []
  }
})

/* ================= FIXED FILTER (IMPORTANT) ================= */
const filteredServices = computed(() => {
  if (!services.value.length) return []

  return services.value.filter((s) => {
    const category =
      s.category?.name ||   // API style 1
      s.category ||         // API style 2
      s.service_category?.name || // API style 3
      ""

    return normalize(category) === normalize(serviceType)
  })
})


const data ={
 hair: {
    title: "Hair Service",
    desc: "Luxury cuts, coloring & styling.",
    services: [
      { icon:"✂️", name:"Haircut", slug:"haircut", desc:"Precision cuts", price:"$30-$80", time:"30-60 min" },
      { icon:"🎨", name:"Coloring", slug:"coloring", desc:"Balayage & dye", price:"$60-$200", time:"1-3 hrs" },
      { icon:"💆", name:"Treatments", slug:"treatments", desc:" Keratin, repair, hydration & scalp care.", price:"$50-$150", time:"45-120 min" },
      { icon:"👰", name:"Event Styling", slug:"event-styling", desc:"Bridal & special occasion styling", price:"$80-$300", time:"1-3 hrs" },
    ],
    specialists: [
      { name:"Sarah Akiki", role:"Stylist", rating:"4.9", exp:3, img:"/images/sarah.jpg" }, 
      {name:"Miriam Younes", role:"Color Specialist", rating:"4.8", exp:4, img:"/images/miriam.jpg"},
      {name:"Nelly Rizk", role:"Event Stylist", rating:"5", exp:6, img:"/images/nelly.jpg"}
    ],

    benefitsTitle: "Why Choose Our Hair Services?",
benefits: [
  {
    title: "Expert Stylists",
    desc: "Professional hair specialists trained in the latest cutting, coloring, and styling techniques."
  },
  {
    title: "Premium Products",
    desc: "High-quality haircare products that protect, nourish, and enhance your hair."
  },
  {
    title: "Personalized Consultation",
    desc: "Every service is tailored to your hair type, face shape, and personal style."
  },
  {
    title: "Luxury Experience",
    desc: "Relax in a welcoming environment while enjoying exceptional care and attention."
  }
]
  },

  nails: {
    title: "Nail Service",
    desc: "  Elegant manicures, luxury pedicures, and creative nail art designed to match your unique style.",
    services: [
      { icon:"💅", name:"Manicure", slug:"manicure", desc:"Classic manicure with professional nail care.", price:"$20-$40", time:"45-90 min" },
      { icon:"🦶", name:"Pedicure", slug:"pedicure", desc:"Luxury foot care and relaxing treatment.", price:"$25-$50", time:"60-120 min" },
      { icon:"🎨", name:"Nail Art", slug:"nail-art", desc:"Creative designs customized to your taste.", price:"$15-$60", time:"30-90 min" },
      { icon:"✨", name:"Gel & Acrylic", slug:"gel-acrylic", desc:"Long-lasting extensions and premium finishes.", price:"$40-$90", time:"60-120 min" }
    ],
    specialists: [
      { name:"Maya Rahme", role:"Senior Nail Artist", rating:"4.9", exp:4, img:"/images/maya.jpg" },
       { name:"Rita Khoury", role:" Nail Art Specialist", rating:"4.8", exp:5, img:"/images/rita.jpg" },
        { name:"Jessica Haddad", role:"Gel & Acrylic Expert", rating:"5", exp:6, img:"/images/jessica.jpg" }
        
    ],


    benefitsTitle: "Why Choose Our Nail Services?",
benefits: [
  {
    title: "Clean & Safe",
    desc: "Strict hygiene and sterilized tools."
  },
  {
    title: "Creative Designs",
    desc: "From simple to artistic nail styles."
  },
  {
    title: "Long-Lasting Finish",
    desc: "Durable, high-quality results."
  },
  {
    title: "Skilled Technicians",
    desc: "Precise and detail-focused specialists."
  }
]   
  },

  makeup: {
    title: "Makeup Service",
    desc: " Professional makeup services designed to enhance your natural beauty for every occasion.",
    services: [
      { icon:"💄", name:"Bridal Makeup", slug:"bridal-makeup", desc:"Luxury bridal looks tailored for your special day.", price:"$120-$350", time:"2-3 hrs" },
      { icon:"✨", name:"Event Makeup", slug:"event-makeup", desc:"Glamorous makeup for parties and special occasions.", price:"$70-$150", time:"1-2 hrs" },
      { icon:"🌸", name:"Natural Makeup", slug:"natural-makeup", desc:"Soft and elegant everyday beauty looks.", price:"$50-$100", time:"1-2 hrs" },
      { icon:"📸", name:"Photoshoot Makeup", slug:"photoshoot-makeup", desc:"Camera-ready professional makeup application.", price:"$80-$180", time:"1-2 hrs" }
    ],
    specialists: [
      { name:"Charbel Obeid", role:"Senior Makeup Artist", rating:"5.0", exp:8, img:"/images/charbel.jpg" },
      { name:"Lara Haddad", role:"Bridal Makeup Expert", rating:"4.9", exp:6, img:"/images/lara.jpg" },
      { name:"Julia Khoury", role:"Event Makeup Artist", rating:"4.8", exp:5, img:"/images/julia.jpg" },
    ],
    benefitsTitle: "Why Choose Our Makeup Services?",
benefits: [
  {
    title: "Pro Artists",
    desc: "Experienced in bridal and event makeup."
  },
  {
    title: "Quality Products",
    desc: "Long-lasting, premium cosmetics."
  },
  {
    title: "Custom Looks",
    desc: "Makeup adapted to your features."
  },
  {
    title: "All Occasions",
    desc: "Perfect for events, weddings, and photoshoots."
  }
]
  },

  massage: {
    title: "Massage Service",
    desc: "   Relax, recharge, and restore your wellbeing with our luxury massage treatments.",
    services: [
      { icon:"🌿", name:"Swedish Massage", slug:"swedish-massage", desc:"Gentle full-body relaxation therapy.", price:"$50-$90", time:"60-120 min" },
      { icon:"💪", name:"Deep Tissue", slug:"deep-tissue", desc:"Target muscle tension and chronic pain.", price:"$70-$120", time:"60-90 min" },
      { icon:"🔥", name:"Hot Stone", slug:"hot-stone", desc:"Heated stones for deep relaxation.", price:"$80-$130", time:"75 min" },
      { icon:"🌸", name:"Aromatherapy", slug:"aromatherapy", desc:"Essential oils for mind and body balance.", price:"$60-$100", time:"60 min" }
    ],
    specialists: [
       { name:"Amir Hannah", role:"Senior Therapist", rating:"4.9", exp:7, img:"/images/amir.jpg" },
       { name:"Nour Abou Khalil", role:"Wellness Specialist", rating:"5.0", exp:8, img:"/images/nour.jpg" },
       { name:"Elie Haddad", role:"Deep Tissue Expert", rating:"4.8", exp:6, img:"/images/elie.jpg" },
      
    ],
    benefitsTitle: "Why Choose Our Massage Services?",
benefits: [
  {
    title: "Certified Therapists",
    desc: "Trained wellness professionals."
  },
  {
    title: "Stress Relief",
    desc: "Reduces tension and fatigue."
  },
  {
    title: "Personal Sessions",
    desc: "Customized to your needs."
  },
  {
    title: "Calm Space",
    desc: "Relaxing and peaceful environment."
  }
]

  },

  laser: {
    title: "Laser Service",
    desc: "Advanced laser technology for smooth skin, rejuvenation, and long-lasting confidence.",
    services: [
      { icon:"✨", name:"Hair Removal", slug:"laser-hair-removal", desc:"Long-lasting smooth skin with professional laser treatment.", price:"$40-$250", time:"30-90 min" },
    { icon:"🌟", name:"Skin Rejuvenation", slug:"laser-skin-rejuvenation", desc:" Improve skin texture, tone, and youthful appearance.", price:"$80-$180", time:"45-60 min" },
    { icon:"💎", name:"Acne Treatment", slug:"laser-acne-treatment", desc:"Reduce acne and improve skin clarity using laser therapy.", price:"$70-$150", time:"30-60 min" },
    { icon:"☀️", name:"Pigmentation Removal", slug:"laser-pigmentation-removal", desc:"Target dark spots and uneven skin tone.", price:"$90-$200", time:"45-75 min" }
    ],
    specialists: [
       { name:"Rania Khoury", role:"Senior Laser Technician", rating:"5", exp:8, img:"/images/rania.jpg" },
      { name:"Carla Saad", role:"Skin Rejuvenation Expert", rating:"4.9", exp:6, img:"/images/carla.jpg" },
      { name:"Melissa Nader", role:"Advanced Laser Specialist", rating:"4.8", exp:5, img:"/images/melissa.jpg" },
    ],
    benefitsTitle: "Why Choose Our Laser Treatments?",
benefits: [
  {
    title: "Safe Technology",
    desc: "FDA-approved equipment and procedures."
  },
  {
    title: "Long-Term Results",
    desc: "Noticeable improvements after a few sessions."
  },
  {
    title: "Expert Specialists",
    desc: "Treatments performed by trained professionals."
  },
  {
    title: "Personalized Care",
    desc: "Customized plans based on your skin needs."
  }
]
  }
};
const current = computed(() => data[serviceType] || data.hair)
</script>