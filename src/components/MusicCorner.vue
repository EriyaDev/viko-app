<script setup>
import { ref, reactive, computed, onUnmounted, watch } from 'vue'
import purpleDreamUrl from '@/assets/music/lofi/Ghostrifter-Official-Purple-Dream(chosic.com).mp3'
import bedtimeAfterCoffeeUrl from '@/assets/music/lofi/barradeen-bedtime-after-a-coffee(chosic.com).mp3'
import goldenHourUrl from '@/assets/music/lofi/Golden-Hour-chosic.com_.mp3'
import midnightStrollUrl from '@/assets/music/lofi/Midnight-Stroll-Lofi-Study-Music(chosic.com).mp3'
import onMyWayUrl from '@/assets/music/lofi/On-My-Way-Lofi-Study-Music(chosic.com).mp3'
import stillAwakeUrl from '@/assets/music/lofi/Still-Awake-Lofi-Study-Music(chosic.com).mp3'
import wildFlowerUrl from '@/assets/music/lofi/Wildflowers-chosic.com_.mp3'



const tracks = reactive([
  {
    title: 'Purple Dream',
    artist: 'Ghostrifter Official',
    url: purpleDreamUrl,
    duration: '2:14'
  },
  {
    title: 'Bedtime After a Coffee',
    artist: 'barradeen',
    url: bedtimeAfterCoffeeUrl,
    duration: '1:30'
  },
  {
    title: 'Golden Hour',
    artist: 'Lofi Records',
    url: goldenHourUrl,
    duration: '3:14'
  },
  {
    title: 'Midnight Stroll',
    artist: 'Lofi Records',
    url: midnightStrollUrl,
    duration: '3:29'
  },
  {
    title: 'On My Way',
    artist: 'Lofi Records',
    url: onMyWayUrl,
    duration: '2:22'
  },
  {
    title: 'Still Awake',
    artist: 'Lofi Records',
    url: stillAwakeUrl,
    duration: '2:48'
  },
  {
    title: 'Wild Flower',
    artist: 'Lofi Records',
    url: wildFlowerUrl,
    duration: '2:13'
  },
])

const currentTrackIndex = ref(0)
const isPlaying = ref(false)
const volume = ref(0.5) // Default 50%
const audioRef = ref(null)

const currentTrack = computed(() => tracks[currentTrackIndex.value])

const togglePlay = () => {
  if (!audioRef.value) return
  if (isPlaying.value) {
    audioRef.value.pause()
    isPlaying.value = false
  } else {
    audioRef.value.play().then(() => {
      isPlaying.value = true
    }).catch(err => {
      console.warn('Audio play failed:', err)
    })
  }
}

const prevTrack = () => {
  currentTrackIndex.value = (currentTrackIndex.value - 1 + tracks.length) % tracks.length
  isPlaying.value = false
  // Wait for DOM updates to load new src, then play
  setTimeout(() => {
    if (audioRef.value) {
      audioRef.value.load()
      audioRef.value.play().then(() => {
        isPlaying.value = true
      }).catch(err => console.warn(err))
    }
  }, 50)
}

const nextTrack = () => {
  currentTrackIndex.value = (currentTrackIndex.value + 1) % tracks.length
  isPlaying.value = false
  setTimeout(() => {
    if (audioRef.value) {
      audioRef.value.load()
      audioRef.value.play().then(() => {
        isPlaying.value = true
      }).catch(err => console.warn(err))
    }
  }, 50)
}

const handleVolumeChange = (e) => {
  const val = parseFloat(e.target.value)
  volume.value = val
  if (audioRef.value) {
    audioRef.value.volume = val
  }
}

const onAudioEnded = () => {
  nextTrack()
}

// Keep volume in sync if audioRef loads
watch(audioRef, (newRef) => {
  if (newRef) {
    newRef.volume = volume.value
  }
})

onUnmounted(() => {
  if (audioRef.value) {
    audioRef.value.pause()
  }
})
</script>

<template>
  <div class="flex flex-col h-full justify-between text-[#4a3f35]">
    <!-- Header -->
    <div class="w-full mb-4">
      <h2 class="text-lg font-semibold text-[#5c4d3c] flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-[#a98467]"></span>
        Music Corner
      </h2>
    </div>

    <!-- Album Art / Cozy Vinyl -->
    <div class="flex flex-col items-center my-2">
      <div 
        class="w-28 h-28 rounded-full bg-[#a98467] flex items-center justify-center relative shadow-md"
        :class="{ 'animate-spin': isPlaying }"
        style="animation-duration: 8s;"
      >
        <!-- Center circle -->
        <div class="w-8 h-8 rounded-full bg-[#fdfbf7] border-2 border-[#eee7dc] flex items-center justify-center">
          <div class="w-2.5 h-2.5 rounded-full bg-[#a98467]"></div>
        </div>

        <!-- Ambient pulse when playing -->
        <div 
          v-if="isPlaying"
          class="absolute inset-0 rounded-full border border-[#a98467]/30 animate-ping opacity-75"
          style="animation-duration: 2s;"
        ></div>
      </div>

      <!-- Playing Wave Animation -->
      <div class="flex items-end gap-1 h-4 mt-4">
        <div 
          v-for="i in 5" 
          :key="i"
          class="w-1 bg-[#8fa88b] rounded-full transition-all duration-300"
          :class="isPlaying ? 'animate-bounce' : 'h-1.5'"
          :style="{ 
            animationDelay: `${i * 0.15}s`,
            animationDuration: isPlaying ? '1s' : '0s',
            height: isPlaying ? '100%' : '6px'
          }"
        ></div>
      </div>
    </div>

    <!-- Track Info -->
    <div class="text-center px-4">
      <h3 class="text-sm font-bold text-[#4a3f35] truncate max-w-full">
        {{ currentTrack.title }}
      </h3>
      <p class="text-xs text-[#8c7d70] truncate mt-0.5">
        {{ currentTrack.artist }}
      </p>
    </div>

    <!-- Native Audio Element -->
    <audio 
      ref="audioRef" 
      :src="currentTrack.url" 
      @ended="onAudioEnded"
    ></audio>

    <!-- Controls -->
    <div class="space-y-4 mt-4">
      <!-- Media Buttons -->
      <div class="flex items-center justify-center gap-6">
        <button 
          @click="prevTrack"
          class="p-2 text-[#8c7d70] hover:text-[#4a3f35] transition-all cursor-pointer rounded-lg hover:bg-[#faf5eb]"
          title="Previous Track"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
          </svg>
        </button>

        <button 
          @click="togglePlay"
          class="w-12 h-12 rounded-full bg-[#8fa88b] hover:bg-[#7a9476] text-white flex items-center justify-center shadow-sm hover:shadow-md transition-all transform active:scale-95 cursor-pointer"
          :title="isPlaying ? 'Pause' : 'Play'"
        >
          <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        <button 
          @click="nextTrack"
          class="p-2 text-[#8c7d70] hover:text-[#4a3f35] transition-all cursor-pointer rounded-lg hover:bg-[#faf5eb]"
          title="Next Track"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.934 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 005 8v8a1 1 0 001.6.8l5.334-4zM19.934 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.334-4z" />
          </svg>
        </button>
      </div>

      <!-- Volume Slider -->
      <div class="flex items-center gap-2 px-2 text-[#8c7d70]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          :value="volume" 
          @input="handleVolumeChange"
          class="w-full h-1 bg-[#e6ded4] rounded-full appearance-none cursor-pointer accent-[#8fa88b] focus:outline-none"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Range input styling helper */
input[type="range"]::-webkit-slider-runnable-track {
  background: #e6ded4;
  border-radius: 9999px;
  height: 4px;
}
input[type="range"]::-webkit-slider-thumb {
  margin-top: -4px;
}
</style>
