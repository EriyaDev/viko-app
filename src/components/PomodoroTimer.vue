<script setup>
import { storeToRefs } from 'pinia'
import { usePomodoroStore } from '../stores/usePomodoroStore'

const store = usePomodoroStore()
const { isRunning, isBreakMode, progress, formattedTime } = storeToRefs(store)
const { startTimer, pauseTimer, resetTimer, switchMode } = store
</script>

<template>
  <div class="flex flex-col items-center justify-between h-full text-[#4a3f35]">
    <!-- Header -->
    <div class="w-full mb-4">
      <h2 class="text-lg font-semibold text-[#5c4d3c] flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full" :class="isBreakMode ? 'bg-[#8fa88b]' : 'bg-[#a98467]'"></span>
        Pomodoro
      </h2>
    </div>

    <!-- Timer Ring & Text -->
    <div class="relative w-44 h-44 my-4 flex items-center justify-center">
      <!-- Background Circle -->
      <svg class="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle 
          cx="50" 
          cy="50" 
          r="44" 
          stroke="#e6ded4" 
          stroke-width="5" 
          fill="transparent"
        />
        <!-- Progress Circle -->
        <circle 
          cx="50" 
          cy="50" 
          r="44" 
          :stroke="isBreakMode ? '#8fa88b' : '#a98467'" 
          stroke-width="5" 
          fill="transparent"
          stroke-dasharray="276.46"
          :stroke-dashoffset="276.46 - (276.46 * progress) / 100"
          stroke-linecap="round"
          class="transition-all duration-300"
        />
      </svg>

      <!-- Digital Display -->
      <div class="text-center z-10">
        <div 
          class="text-4xl font-sans font-extrabold tracking-widest mb-1 transition-colors duration-300" 
          :class="isBreakMode ? 'text-[#8fa88b] text-glow-sage' : 'text-[#a98467] text-glow-brown'"
        >
          {{ formattedTime }}
        </div>
        <div class="text-xs uppercase tracking-widest font-semibold" :class="isBreakMode ? 'text-[#8fa88b]' : 'text-[#a98467]'">
          {{ isBreakMode ? 'Break' : 'Focus' }}
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="flex gap-3 justify-center w-full mt-4">
      <button
        v-if="!isRunning"
        @click="startTimer"
        class="flex-1 py-2.5 px-4 bg-[#8fa88b] hover:bg-[#7a9476] text-white rounded-xl text-sm font-semibold shadow-sm transition-all duration-200 cursor-pointer text-center hover:shadow-md active:scale-95"
      >
        Start
      </button>
      <button
        v-else
        @click="pauseTimer"
        class="flex-1 py-2.5 px-4 bg-[#a98467] hover:bg-[#917056] text-white rounded-xl text-sm font-semibold shadow-sm transition-all duration-200 cursor-pointer text-center hover:shadow-md active:scale-95"
      >
        Pause
      </button>

      <button
        @click="resetTimer"
        class="p-2.5 bg-[#fdfbf7] hover:bg-[#faf5eb] text-[#8c7d70] hover:text-[#4a3f35] border border-[#dcd1c4] rounded-xl shadow-sm transition-all duration-200 cursor-pointer"
        title="Reset Timer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2V4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 9.25022 5.38734 6.82447 7.50024 5.38451L7.5 8H9.5V2L3.5 2V4L5.99918 3.99989C3.57075 5.82434 2 8.72873 2 12Z"></path></svg>
      </button>

      <button
        @click="switchMode"
        class="p-2.5 bg-[#fdfbf7] hover:bg-[#faf5eb] text-[#8c7d70] hover:text-[#4a3f35] border border-[#dcd1c4] rounded-xl shadow-sm transition-all duration-200 cursor-pointer"
        :title="isBreakMode ? 'Switch to Focus Mode' : 'Switch to Break Mode'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.text-glow-sage {
  text-shadow: 0 0 12px rgba(143, 168, 139, 0.25);
}
.text-glow-brown {
  text-shadow: 0 0 12px rgba(169, 132, 103, 0.25);
}
</style>
