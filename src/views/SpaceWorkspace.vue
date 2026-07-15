<script setup>
import { useRoute, useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import TodoList from '../components/TodoList.vue'
import PomodoroTimer from '../components/PomodoroTimer.vue'
import TomatoPlant from '../components/TomatoPlant.vue'
import MusicCorner from '../components/MusicCorner.vue'

const route = useRoute()
const router = useRouter()
const spaceName = route.params.spaceName

const handleChangeSpace = () => {
  // Clear the cookie
  Cookies.remove('user_space_name')
  // Redirect to landing
  router.push({ name: 'landing' })
}
</script>

<template>
  <div class="min-h-screen w-full bg-[#f5efe6] p-4 sm:p-6 md:p-8 relative overflow-hidden select-none text-[#4a3f35]">
    <!-- Ambient Earth-Tone Blobs -->
    <div class="absolute top-1/10 left-1/10 w-[500px] h-[500px] bg-[#8fa88b]/10 rounded-full filter blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-1/10 right-1/10 w-[500px] h-[500px] bg-[#a98467]/5 rounded-full filter blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Dashboard Header -->
      <header class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 pb-6 border-b border-[#e8e2d5]">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-[#8fa88b] p-0.5 shadow-sm">
            <div class="w-full h-full bg-[#fdfbf7] rounded-[10px] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#8fa88b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <div>
            <h1 class="text-xl font-extrabold text-[#4a3f35] tracking-tight flex items-center gap-2">
              {{ spaceName }}<span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#e6ded4] text-[#6b4e3d] border border-[#dcbfa6]">Space</span>
            </h1>
            <p class="text-xs text-[#8c7d70]">Welcome to your cozy personal productivity dashboard</p>
          </div>
        </div>

        <button
          @click="handleChangeSpace"
          class="flex items-center gap-2 px-4 py-2 bg-[#fdfbf7] hover:bg-[#faf5eb] text-[#8c7d70] hover:text-[#4a3f35] border border-[#dcd1c4] rounded-xl text-xs font-semibold tracking-wider uppercase shadow-sm transition-all duration-200 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Change Space
        </button>
      </header>

      <!-- Dashboard Widgets Grid -->
      <main class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <!-- Widget 1: Todo List -->
        <section class="glass-panel md:col-span-2 rounded-3xl p-6 shadow-md flex flex-col justify-between hover:border-[#c8bcb0] transition-all duration-300">
          <TodoList />
        </section>

        <!-- Widget 2: Pomodoro Timer -->
        <section class="glass-panel rounded-3xl p-6 shadow-md flex flex-col justify-between hover:border-[#c8bcb0] transition-all duration-300">
          <PomodoroTimer />
        </section>

        <!-- Widget 3: Tomato Plant -->
        <section class="glass-panel rounded-3xl p-6 shadow-md flex flex-col justify-between hover:border-[#c8bcb0] transition-all duration-300">
          <TomatoPlant />
        </section>

        <!-- Widget 3: Music Corner -->
        <section class="glass-panel rounded-3xl p-6 shadow-md flex flex-col justify-between hover:border-[#c8bcb0] transition-all duration-300">
          <MusicCorner />
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
</style>
