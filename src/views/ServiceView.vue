<template>
  <div class="bg-secondary text-primary font-[Poppins]">
    <!-- HERO -->
    <section data-aos="fade-up" class="pt-32 pb-16 text-center">
      <h1 class="text-5xl font-bold mb-4 text-primary">{{ current.title }}</h1>
      <p class="text-secondary max-w-2xl mx-auto">{{ current.desc }}</p>
      <router-link :to="`/book?service=${serviceType}`" class="mt-8 inline-block bg-[#D4AF37] text-white px-8 py-4 rounded-full hover:scale-105 transition">
        Book {{ current.title }}
      </router-link>
    </section>

    <!-- SERVICES GRID -->
    <section data-aos="fade-up" class="max-w-7xl mx-auto px-6 pb-24">
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <a v-for="item in current.services" :key="item.name" :href="`/book?service=${item.slug}`" class="bg-card rounded-3xl border border-[#D4AF37] shadow-theme p-6 hover:-translate-y-2 transition block">
          <h3 class="text-xl font-bold mb-2 text-primary">{{ item.icon }} {{ item.name }}</h3>
          <p class="text-secondary text-sm mb-3">{{ item.desc }}</p>
          <p class="text-[#D4AF37] font-bold">{{ item.price }}</p>
          <p class="text-muted text-sm">{{ item.time }}</p>
        </a>
      </div>
    </section>

    <!-- SPECIALISTS -->
    <section data-aos="fade-up" class="bg-card py-24">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold mb-12 text-primary">{{ current.title }} Specialists</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="spec in current.specialists" :key="spec.name" class="border border-[#D4AF37] rounded-3xl p-6 shadow-theme bg-card">
            <img v-if="spec.img" :src="spec.img" class="h-56 w-full object-cover rounded-2xl mb-4" />
            <h3 class="text-xl font-bold text-primary">{{ spec.name }}</h3>
            <p class="text-[#D4AF37]">{{ spec.role }}</p>
            <p class="text-secondary text-sm mt-3">⭐ {{ spec.rating }} | {{ spec.exp }} Years</p>
            <router-link :to="`/book?specialist=${spec.name}&service=${serviceType}`" class="mt-5 inline-block bg-[#D4AF37] text-white px-6 py-2 rounded-full text-sm hover:bg-[#c39d28] transition">
              Book {{ spec.name.split(' ')[0] }}
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- BENEFITS SECTION -->
    <section data-aos="fade-up" class="py-24 bg-secondary">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold mb-12 text-primary">{{ current.benefitsTitle }}</h2>
        <div class="grid md:grid-cols-4 gap-8">
          <div v-for="benefit in current.benefits" :key="benefit.title" class="bg-card rounded-3xl p-6 shadow-theme border border-theme">
            <h3 class="font-bold text-[#D4AF37] mb-2">{{ benefit.title }}</h3>
            <p class="text-secondary text-sm">{{ benefit.desc }}</p>
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
    title: "Hair Services",
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
      { title: "Expert Stylists", desc: "Professional hair specialists trained in the latest cutting, coloring, and styling techniques." },
      { title: "Premium Products", desc: "High-quality haircare products that protect, nourish, and enhance your hair." },
      { title: "Personalized Consultation", desc: "Every service is tailored to your hair type, face shape, and personal style." },
      { title: "Luxury Experience", desc: "Relax in a welcoming environment while enjoying exceptional care and attention." }
    ]
  },
  nails: {
    title: "Nail Services",
    desc: "Elegant manicures, luxury pedicures, and creative nail art designed to match your unique style.",
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
      { title: "Clean & Safe", desc: "Strict hygiene and sterilized tools." },
      { title: "Creative Designs", desc: "From simple to artistic nail styles." },
      { title: "Long-Lasting Finish", desc: "Durable, high-quality results." },
      { title: "Skilled Technicians", desc: "Precise and detail-focused specialists." }
    ]   
  },
  makeup: {
    title: "Makeup Services",
    desc: "Professional makeup services designed to enhance your natural beauty for every occasion.",
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
      { title: "Pro Artists", desc: "Experienced in bridal and event makeup." },
      { title: "Quality Products", desc: "Long-lasting, premium cosmetics." },
      { title: "Custom Looks", desc: "Makeup adapted to your features." },
      { title: "All Occasions", desc: "Perfect for events, weddings, and photoshoots." }
    ]
  },
  massage: {
    title: "Massage Services",
    desc: "Relax, recharge, and restore your wellbeing with our luxury massage treatments.",
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
      { title: "Certified Therapists", desc: "Trained wellness professionals." },
      { title: "Stress Relief", desc: "Reduces tension and fatigue." },
      { title: "Personal Sessions", desc: "Customized to your needs." },
      { title: "Calm Space", desc: "Relaxing and peaceful environment." }
    ]
  },
  laser: {
    title: "Laser Services",
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
      { title: "Safe Technology", desc: "FDA-approved equipment and procedures." },
      { title: "Long-Term Results", desc: "Noticeable improvements after a few sessions." },
      { title: "Expert Specialists", desc: "Treatments performed by trained professionals." },
      { title: "Personalized Care", desc: "Customized plans based on your skin needs." }
    ]
  }
};

const current = computed(() => data[serviceType] || data.hair);
</script>