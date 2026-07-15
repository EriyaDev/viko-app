<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePomodoroStore } from '../stores/usePomodoroStore'

const store = usePomodoroStore()
const { progress, isBreakMode, harvestedCount, isRunning } = storeToRefs(store)

// Simulation mode for testing growth easily
const isSimulating = ref(false)
const simProgress = ref(0)

const activeProgress = computed(() => {
  return isSimulating.value ? simProgress.value : progress.value
})

const growthStage = computed(() => {
  const p = activeProgress.value
if (p < 15) return { stage: 0, name: 'Seed', desc: 'Planting the seed in fertile soil...' }
  if (p < 40) return { stage: 1, name: 'Sprout', desc: 'A tiny sprout begins to search for sunlight!' }
  if (p < 70) return { stage: 2, name: 'Growing', desc: 'The stem grows tall and leaves are popping up.' }
  if (p < 90) return { stage: 3, name: 'Flowering', desc: 'Small yellow flowers are blooming. Tomatoes are coming soon!' }
  return { stage: 4, name: 'Ripe!', desc: 'Fresh red tomatoes are ready to harvest once the timer finishes!' }
})

// CSS styles to control SVG element sizes and visibility based on growth stage
const stemScaleY = computed(() => {
  // Scale stem from 0.1 to 1.0 based on progress
  return Math.min(1.0, 0.1 + (activeProgress.value / 100) * 0.9)
})

const leafScale = computed(() => {
  if (activeProgress.value < 15) return 0
  if (activeProgress.value < 40) return (activeProgress.value - 15) / 25 // 0 to 1
  return 1
})

const branchScale = computed(() => {
  if (activeProgress.value < 40) return 0
  if (activeProgress.value < 70) return (activeProgress.value - 40) / 30
  return 1
})

const flowerScale = computed(() => {
  if (activeProgress.value < 70) return 0
  if (activeProgress.value < 90) return (activeProgress.value - 70) / 20
  return 1
})

const tomatoScale = computed(() => {
  if (activeProgress.value < 90) return 0
  return Math.min(1.0, (activeProgress.value - 90) / 10)
})

const resetHarvest = () => {
  store.harvestedCount = 0
  localStorage.setItem('pomodoro_harvested_count', '0')
}
</script>

<template>
  <div class="flex flex-col items-center justify-between h-full text-[#4a3f35]">
    <!-- Header -->
    <div class="w-full mb-2 flex justify-between items-center">
      <h2 class="text-lg font-semibold text-[#5c4d3c] flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-[#e76f51]"></span>
        Pomodoro Garden
      </h2>
      <!-- Sim Dev Toggle -->
      <button 
        @click="isSimulating = !isSimulating"
        class="text-[10px] px-2 py-0.5 rounded bg-[#e6ded4] text-[#6b4e3d] hover:bg-[#dcd1c4] transition-all cursor-pointer font-semibold uppercase tracking-wider"
      >
        {{ isSimulating ? 'Real Timer' : 'Simulate' }}
      </button>
    </div>

    <!-- Simulation Controls -->
    <div v-if="isSimulating" class="w-full px-2 py-1.5 bg-[#fdfbf7] rounded-xl border border-[#e6ded4] flex items-center gap-3 text-xs mb-2">
      <span class="font-medium shrink-0">Simulasi: {{ Math.round(simProgress) }}%</span>
      <input 
        type="range" 
        min="0" 
        max="100" 
        v-model.number="simProgress" 
        class="w-full h-1 bg-[#e6ded4] rounded-full appearance-none cursor-pointer accent-[#e76f51] focus:outline-none"
      />
    </div>

    <!-- Plant Canvas (SVG Graphic) -->
    <div class="relative w-40 h-44 my-1 flex items-center justify-center bg-gradient-to-b from-sky-50/20 to-amber-50/20 rounded-2xl border border-[#efe7dc]/50 p-2 shadow-inner">
      <svg viewBox="0 0 100 120" class="w-full h-full drop-shadow-sm">
        <!-- Definitions for gradients -->
        <defs>
          <linearGradient id="potGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#b07d62" />
            <stop offset="100%" stop-color="#7f5539" />
          </linearGradient>
          <linearGradient id="stemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#72efdd" />
            <stop offset="50%" stop-color="#52b788" />
            <stop offset="100%" stop-color="#2d6a4f" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#74c69d" />
            <stop offset="100%" stop-color="#1b4332" />
          </linearGradient>
          <linearGradient id="tomatoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffb5a7" />
            <stop offset="30%" stop-color="#f25c54" />
            <stop offset="100%" stop-color="#c32f27" />
          </linearGradient>
        </defs>

        <!-- Wind/Sway effect group -->
        <g :class="{ 'sway-anim': isRunning || isSimulating }" style="transform-origin: 50px 95px;">
          <!-- 1. The Main Stem -->
          <path 
            v-if="activeProgress >= 15"
            d="M 50,95 Q 48,60 50,25" 
            fill="none" 
            stroke="url(#stemGrad)" 
            stroke-dasharray="100"
            :stroke-dashoffset="100 - (100 * stemScaleY)"
            stroke-width="3.5" 
            stroke-linecap="round"
            class="transition-all duration-500 ease-out"
          />

          <!-- 2. Sprout Leaves (Stage 1) -->
          <g v-if="activeProgress >= 15 && activeProgress < 40" :style="`transform: scale(${leafScale}); transform-origin: 50px 75px;`" class="transition-transform duration-500">
            <!-- Left Sprout Leaf -->
            <path d="M 50,75 Q 40,68 36,73 Q 44,80 50,75" fill="url(#leafGrad)" />
            <!-- Right Sprout Leaf -->
            <path d="M 50,75 Q 60,68 64,73 Q 56,80 50,75" fill="url(#leafGrad)" />
          </g>

          <!-- 3. Upper Branches & Leaves (Stage 2+) -->
          <g v-if="activeProgress >= 40" :style="`transform: scale(${branchScale}); transform-origin: 50px 95px;`" class="transition-transform duration-500">
            <!-- Left Branch & Leaves -->
            <path d="M 49,70 Q 35,65 30,55" fill="none" stroke="url(#stemGrad)" stroke-width="2.5" stroke-linecap="round" />
            <path d="M 30,55 Q 22,50 20,56 Q 26,62 30,55" fill="url(#leafGrad)" />
            <path d="M 35,62 Q 28,64 28,70 Q 36,68 35,62" fill="url(#leafGrad)" />

            <!-- Right Branch & Leaves -->
            <path d="M 51,60 Q 65,54 72,48" fill="none" stroke="url(#stemGrad)" stroke-width="2.5" stroke-linecap="round" />
            <path d="M 72,48 Q 80,44 82,50 Q 76,56 72,48" fill="url(#leafGrad)" />
            <path d="M 60,56 Q 68,58 68,64 Q 60,62 60,56" fill="url(#leafGrad)" />

            <!-- Top Leaves -->
            <path d="M 50,30 Q 42,20 50,12 Q 58,20 50,30" fill="url(#leafGrad)" />
            <path d="M 50,35 Q 38,32 40,26 Q 48,32 50,35" fill="url(#leafGrad)" />
            <path d="M 50,35 Q 62,32 60,26 Q 52,32 50,35" fill="url(#leafGrad)" />
          </g>

          <!-- 4. Flowers (Stage 3) -->
          <g v-if="activeProgress >= 70" :style="`transform: scale(${flowerScale}); transform-origin: 30px 55px;`" class="transition-transform duration-500">
            <!-- Flower 1 (on left branch) -->
            <circle cx="30" cy="55" r="4" fill="#ffd166" />
            <circle cx="28" cy="52" r="2.5" fill="#f4a261" />
            <circle cx="32" cy="52" r="2.5" fill="#f4a261" />
            <circle cx="28" cy="58" r="2.5" fill="#f4a261" />
            <circle cx="32" cy="58" r="2.5" fill="#f4a261" />
          </g>
          <g v-if="activeProgress >= 78" :style="`transform: scale(${flowerScale}); transform-origin: 72px 48px;`" class="transition-transform duration-500">
            <!-- Flower 2 (on right branch) -->
            <circle cx="72" cy="48" r="4" fill="#ffd166" />
            <circle cx="70" cy="45" r="2.5" fill="#f4a261" />
            <circle cx="74" cy="45" r="2.5" fill="#f4a261" />
            <circle cx="70" cy="51" r="2.5" fill="#f4a261" />
            <circle cx="74" cy="51" r="2.5" fill="#f4a261" />
          </g>

          <!-- 5. Ripe Tomatoes (Stage 4) -->
          <g v-if="activeProgress >= 90" :style="`transform: scale(${tomatoScale}); transform-origin: 30px 60px;`" class="transition-transform duration-500">
            <!-- Tomato 1 (Left branch hang) -->
            <line x1="30" y1="55" x2="30" y2="64" stroke="#52b788" stroke-width="1.5" />
            <!-- Little green stem cap -->
            <path d="M 27,62 Q 30,64 33,62 L 30,65 Z" fill="#2d6a4f" />
            <!-- The tomato body -->
            <circle cx="30" cy="68" r="7" fill="url(#tomatoGrad)" />
            <!-- Shiny reflection -->
            <ellipse cx="27.5" cy="65.5" rx="2" ry="1" fill="#fff" opacity="0.6" transform="rotate(-30, 27.5, 65.5)" />
          </g>
          <g v-if="activeProgress >= 95" :style="`transform: scale(${tomatoScale}); transform-origin: 72px 54px;`" class="transition-transform duration-500">
            <!-- Tomato 2 (Right branch hang) -->
            <line x1="72" y1="48" x2="72" y2="58" stroke="#52b788" stroke-width="1.5" />
            <!-- Little green stem cap -->
            <path d="M 69,56 Q 72,58 75,56 L 72,59 Z" fill="#2d6a4f" />
            <!-- The tomato body -->
            <circle cx="72" cy="62" r="6.5" fill="url(#tomatoGrad)" />
            <!-- Shiny reflection -->
            <ellipse cx="69.5" cy="59.5" rx="1.8" ry="0.9" fill="#fff" opacity="0.6" transform="rotate(-30, 69.5, 59.5)" />
          </g>

          <!-- 6. Ground details (Seed growing crack / little sprout stem) -->
          <path 
            v-if="activeProgress < 15" 
            d="M 47,94 Q 50,91 52,94" 
            stroke="#8fa88b" 
            stroke-width="2" 
            fill="none" 
            class="transition-opacity duration-300"
            :class="{ 'opacity-100 animate-pulse': activeProgress > 5, 'opacity-40': activeProgress <= 5 }"
          />
        </g>

        <!-- Pot and Soil (Stays static) -->
        <!-- Soil layer -->
        <ellipse cx="50" cy="95" rx="24" ry="6" fill="#582f0e" />
        <!-- Terracotta Pot -->
        <path d="M 28,95 L 33,115 Q 50,118 67,115 L 72,95 Z" fill="url(#potGrad)" />
        <ellipse cx="50" cy="95" rx="22" ry="4" fill="#a06cd5" opacity="0.1" />
        <!-- Pot rim -->
        <path d="M 25,92 C 25,90 75,90 75,92 L 75,95 C 75,97 25,97 25,95 Z" fill="#b07d62" />
        <ellipse cx="50" cy="92" rx="24" ry="2" fill="#ddb892" opacity="0.3" />
      </svg>

      <!-- Overlay Status Badge -->
      <span 
        v-if="isBreakMode && !isSimulating"
        class="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#8fa88b] text-white text-[10px] font-bold shadow-sm animate-pulse"
      >
        Break Time
      </span>
    </div>

    <!-- Description & Progress -->
    <div class="text-center px-4 w-full">
      <h3 class="text-xs font-bold text-[#5c4d3c] truncate">
        {{ growthStage.name }}
      </h3>
      <p class="text-[11px] text-[#8c7d70] leading-snug h-8 mt-1 flex items-center justify-center">
        {{ growthStage.desc }}
      </p>
    </div>

    <!-- Harvest Counter -->
    <div class="w-full border-t border-[#e6ded4] pt-2 mt-2 flex justify-between items-center text-xs">
      <div class="flex items-center gap-1.5">
        <span class="text-lg">🍅</span>
        <span class="text-[#5c4d3c] font-semibold">Today's Harvest:</span>
        <span class="px-2 py-0.5 rounded-full bg-[#fceade] text-[#e76f51] font-extrabold">{{ harvestedCount }}</span>
      </div>
      <button 
        v-if="harvestedCount > 0"
        @click="resetHarvest"
        class="text-[10px] text-[#a98467] hover:text-[#e76f51] font-medium transition-colors cursor-pointer"
        title="Reset hitungan panen"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Sway animation for the plant in the wind */
.sway-anim {
  animation: sway 4s ease-in-out infinite alternate;
}

@keyframes sway {
  0% {
    transform: rotate(-1.5deg);
  }
  100% {
    transform: rotate(1.5deg);
  }
}

/* Custom styles for range slider matching main design */
input[type="range"]::-webkit-slider-runnable-track {
  background: #e6ded4;
  border-radius: 9999px;
  height: 4px;
}
input[type="range"]::-webkit-slider-thumb {
  margin-top: -4px;
}
</style>
