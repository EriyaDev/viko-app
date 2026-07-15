<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

const router = useRouter()
const spaceName = ref('')
const error = ref('')

const handleEnterSpace = () => {
  const trimmed = spaceName.value.trim()
  
  if (!trimmed) {
    error.value = 'Space name cannot be empty.'
    return
  }

  // Alphanumeric check (letters and numbers only)
  const isAlphanumeric = /^[a-zA-Z0-9]+$/.test(trimmed)
  if (!isAlphanumeric) {
    error.value = 'Space name must contain letters and numbers only (no spaces or special characters).'
    return
  }

  error.value = ''
  
  // Save to cookie for 7 days
  Cookies.set('user_space_name', trimmed, { expires: 365 })
  
  // Route to workspace
  router.push({ name: 'workspace', params: { spaceName: trimmed } })
}
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-[#f5efe6] p-4 relative overflow-hidden select-none">
    <!-- Ambient Earth-Tone Blobs -->
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8fa88b]/15 rounded-full filter blur-[100px] animate-pulse"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a98467]/10 rounded-full filter blur-[100px] animate-pulse" style="animation-delay: 2s;"></div>

    <div class="w-full max-w-md glass-panel rounded-3xl p-8 shadow-xl relative z-10 transition-all duration-300 hover:border-[#dcd1c4]">
      <!-- Icon/Logo -->
      <div class="flex justify-center mb-6">
        <div class="w-16 h-16 rounded-2xl bg-[#8fa88b] p-0.5 shadow-sm">
          <div class="w-full h-full bg-[#fdfbf7] rounded-[14px] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#8fa88b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Heading -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-extrabold tracking-tight text-[#4a3f35] mb-2">
          Viko Space
        </h1>
        <p class="text-[#8c7d70] text-sm">
          Create or open your cozy, distraction-free workspace
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleEnterSpace" class="space-y-6">
        <div>
          <label for="space-name" class="block text-xs font-semibold text-[#5c4d3c] uppercase tracking-wider mb-2">
            Space Name
          </label>
          <div class="relative">
            <input
              id="space-name"
              v-model="spaceName"
              type="text"
              placeholder="e.g. vikospace"
              class="w-full px-4 py-3.5 bg-[#fdfbf7] border border-[#dcd1c4] rounded-xl text-[#4a3f35] placeholder-[#b5a89b] focus:outline-none focus:ring-2 focus:ring-[#8fa88b]/30 focus:border-[#8fa88b] transition-all duration-200 shadow-sm"
              autocomplete="off"
            />
          </div>
          <p v-if="error" class="mt-2 text-xs text-rose-600 flex items-center gap-1.5 animate-shake">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {{ error }}
          </p>
        </div>

        <button
          type="submit"
          class="w-full py-3.5 px-4 bg-[#8fa88b] hover:bg-[#7a9476] text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8fa88b]/40 transform active:scale-[0.98] cursor-pointer"
        >
          Enter Space
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.animate-shake {
  animation: shake 0.2s ease-in-out 0s 2;
}
</style>
