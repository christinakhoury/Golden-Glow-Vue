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
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const serviceType = route.params.type;

const data = {
  hair: {
    title: "Hair Architecture",
    desc: "Luxury structural cuts, clean coloring, multi-tonal hand balayage and structural hair treatments.",
    services: [
      { name:"Precision Haircut", slug:"haircut", desc:"Bespoke sculptural hair architecture tailored precisely to profile parameters.", price:"$30 - $80", time:"30-60 min" },
      { name:"Artisanal Coloring", slug:"coloring", desc:"Fine multi-dimensional premium balayage and complete safe saturation tinting.", price:"$60 - $200", time:"1-3 hrs" },
      { name:"Restructuring Therapy", slug:"treatments", desc:"Intense micro-keratin structural repairs, profound root hydration, and botanical scalp balances.", price:"$50 - $150", time:"45-120 min" },
      { name:"Event Red-Carpet Styling", slug:"event-styling", desc:"Impeccable high-fashion bridal styling and special assignment updos.", price:"$80 - $300", time:"1-3 hrs" },
    ],
    specialists: [
      { name:"Sarah Akiki", role:"Master Barber & Stylist", rating:"4.9", exp:3, img:"/images/sarah.jpg" }, 
      { name:"Miriam Younes", role:"Color Chemist Specialist", rating:"4.8", exp:4, img:"/images/miriam.jpg" },
      { name:"Nelly Rizk", role:"Editorial Event Stylist", rating:"5.0", exp:6, img:"/images/nelly.jpg" }
    ],
    benefitsTitle: "The Hair Treatment Philosophy",
    benefits: [
      { title: "Elite Artisans", desc: "Our specialists track global high-fashion technical movements to maintain design mastery." },
      { title: "Pristine Pharmacy", desc: "Using advanced organic blends completely free from aggressive processing toxins." },
      { title: "Bespoke Geometry", desc: "Every clean layer is structured against your physical facial alignment attributes." },
      { title: "Refined Solitude", desc: "Indulge in peaceful individual environments designed around restorative privacy." }
    ]
  },
  nails: {
    title: "Nail Artistry",
    desc: "Impeccable clinical manicures, profound treatment pedicuring, and luxury line overlay extensions.",
    services: [
      { name:"Classic Clean Manicure", slug:"manicure", desc:"Meticulous cuticle restoration, profile shaping, and nourishing botanical hand balances.", price:"$20 - $40", time:"45-90 min" },
      { name:"Restorative Pedicure", slug:"pedicure", desc:"Luxury thermal foot soaks, high-grade organic exfoliation, and targeted surface smoothing.", price:"$25 - $50", time:"60-120 min" },
      { name:"Avant-Garde Nail Art", slug:"nail-art", desc:"Bespoke hand-painted luxury detailing tailored completely to personal taste profiles.", price:"$15 - $60", time:"30-90 min" },
      { name:"Premium Gel & Acrylic", slug:"gel-acrylic", desc:"Lightweight, ultra-durable structurally safe extensions with flawless premium high-gloss top layers.", price:"$40 - $90", time:"60-120 min" }
    ],
    specialists: [
      { name:"Maya Rahme", role:"Senior Technical Nail Artist", rating:"4.9", exp:4, img:"/images/maya.jpg" },
      { name:"Rita Khoury", role:"Micro Fine Art Specialist", rating:"4.8", exp:5, img:"/images/rita.jpg" },
      { name:"Jessica Haddad", role:"Polymer Extension Expert", rating:"5.0", exp:6, img:"/images/jessica.jpg" }
    ],
    benefitsTitle: "The Hand & Foot Manifesto",
    benefits: [
      { title: "Sterilized Medical Care", desc: "Surpassing industry benchmarks with strict premium dental-grade sanitization setups." },
      { title: "Fine Line Precision", desc: "Masterful application techniques ensuring ultra-clean borders and uniform symmetry." },
      { title: "Resilient Structural Integrity", desc: "Durable, premium formulations that safeguard natural nail-bed health over long cycles." },
      { title: "Curated Pigment Libraries", desc: "Access to a wide collection of rare, high-fashion luxury colors and tones." }
    ]   
  },
  makeup: {
    title: "Cosmetic Architecture",
    desc: "Bespoke high-definition makeup applications engineered to celebrate and frame natural aesthetics.",
    services: [
      { name:"Signature Bridal Luxury", slug:"bridal-makeup", desc:"High-end radiant contouring and timeless bridal glow frameworks customized for your day.", price:"$120 - $350", time:"2-3 hrs" },
      { name:"High-Glamour Event Profiles", slug:"event-makeup", desc:"Striking focus eyes and seamless complexions for formal luxury gatherings.", price:"$70 - $150", time:"1-2 hrs" },
      { name:"Minimalist Soft Focus", slug:"natural-makeup", desc:"Barely-there radiant day-wear formulation focusing on pure skin illumination.", price:"$50 - $100", time:"1-2 hrs" },
      { name:"Studio Camera Ready", slug:"photoshoot-makeup", desc:"Advanced texture-balanced matte compositions optimized carefully for studio flashes.", price:"$80 - $180", time:"1-2 hrs" }
    ],
    specialists: [
      { name:"Charbel Obeid", role:"Senior High-Fashion Artist", rating:"5.0", exp:8, img:"/images/charbel.jpg" },
      { name:"Lara Haddad", role:"Bridal Lookbook Architect", rating:"4.9", exp:6, img:"/images/lara.jpg" },
      { name:"Julia Khoury", role:"Commercial Project Artist", rating:"4.8", exp:5, img:"/images/julia.jpg" },
    ],
    benefitsTitle: "The Aesthetics Philosophy",
    benefits: [
      { title: "High-Definition Artisans", desc: "Artists specializing in camera illumination and adaptive portrait cosmetics." },
      { title: "Hypoallergenic Formulations", desc: "Exclusive luxury skincare-infused cosmetic products suitable for highly reactive skin." },
      { title: "True Color Symmetry", desc: "Precise custom blending matching underlying natural pigment variations." },
      { title: "Longevity Engineering", desc: "Advanced locking techniques that maintain fresh look placement for long durations." }
    ]
  },
  massage: {
    title: "Body Restorative Rituals",
    desc: "Decompress, target tension nodes, and reinstate holistic alignment with therapeutic touch therapies.",
    services: [
      { name:"Classic Swedish Treatment", slug:"swedish-massage", desc:"Long fluid strokes designed to alleviate general stress and normalize local blood flows.", price:"$50 - $90", time:"60-120 min" },
      { name:"Anatomical Deep Tissue", slug:"deep-tissue", desc:"Intense structural deep node pressure addressing chronic muscular stress.", price:"$70 - $120", time:"60-90 min" },
      { name:"Thermal Volcanic Stone", slug:"hot-stone", desc:"Smoothed basalt volcanic stones releasing steady thermal heat directly into core pathways.", price:"$80 - $130", time:"75 min" },
      { name:"Botanical Aromatherapy", slug:"aromatherapy", desc:"Rare cold-pressed herbal extractions diffusing calming notes into your private session.", price:"$60 - $100", time:"60 min" }
    ],
    specialists: [
      { name:"Amir Hannah", role:"Senior Neuromuscular Therapist", rating:"4.9", exp:7, img:"/images/amir.jpg" },
      { name:"Nour Abou Khalil", role:"Holistic Kinetic Specialist", rating:"5.0", exp:8, img:"/images/nour.jpg" },
      { name:"Elie Haddad", role:"Deep Node Recovery Expert", rating:"4.8", exp:6, img:"/images/elie.jpg" },
    ],
    benefitsTitle: "The Somatic Sanctuary Values",
    benefits: [
      { title: "Licensed Kinesiologists", desc: "Therapists possessing extensive, verified clinical training in muscular recovery." },
      { title: "Deep Node Stress Relief", desc: "Systematic tension dissolution that helps realign everyday posture baselines." },
      { title: "Tailored Muscular Pressure", desc: "Varying manual weight distribution based entirely on personal comfort metrics." },
      { title: "Acoustic Silence", desc: "Soundproofed environments providing absolute mental restoration and privacy." }
    ]
  },
  laser: {
    title: "Laser Epilatory & Dermal Tech",
    desc: "Advanced non-invasive thermal laser systems prioritizing exceptional texture uniformity and clarity.",
    services: [
      { name:"Precision Epilatory Clearance", slug:"laser-hair-removal", desc:"State-of-the-art cooling diode technology safely targeting deep root structures.", price:"$40 - $250", time:"30-90 min" },
      { name:"Epidermal Rejuvenation", slug:"laser-skin-rejuvenation", desc:"Non-ablative structural skin tone refinement clearing subtle fine lines.", price:"$80 - $180", time:"45-60 min" },
      { name:"Targeted Dermal Purifying", slug:"laser-acne-treatment", desc:"Deep light wavelengths clearing blockages and calming hyperactive sebaceous glands.", price:"$70 - $150", time:"30-60 min" },
      { name:"Melanin Path Correction", slug:"laser-pigmentation-removal", desc:"Controlled pulse cycles addressing dark sun spots and localized uneven skin tones.", price:"$90 - $200", time:"45-75 min" }
    ],
    specialists: [
      { name:"Rania Khoury", role:"Senior Medical Laser Operator", rating:"5.0", exp:8, img:"/images/rania.jpg" },
      { name:"Carla Saad", role:"Dermal Refinement Practitioner", rating:"4.9", exp:6, img:"/images/carla.jpg" },
      { name:"Melissa Nader", role:"Advanced Light Wave Specialist", rating:"4.8", exp:5, img:"/images/melissa.jpg" },
    ],
    benefitsTitle: "The Clinical Light Standard",
    benefits: [
      { title: "FDA-Cleared Systems", desc: "Advanced medical-grade laser hardware with active epidermal cooling shields." },
      { title: "Sustainable Smoothness", desc: "Progressive, long-lasting reduction in density and texturing variations." },
      { title: "Certified Clinical Safety", desc: "All processes executed under strict skin safety operational guidelines." },
      { title: "Custom Pulse Mapping", desc: "Every setting is individually configured to align safely with your skin profile." }
    ]
  }
};

const current = computed(() => data[serviceType] || data.hair);
</script>