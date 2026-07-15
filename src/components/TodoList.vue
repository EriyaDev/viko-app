<script setup>
import { ref, computed } from 'vue'
import { useTodoStore } from '../stores/useTodoStore'

const todoStore = useTodoStore()
const newTodoText = ref('')
const currentFilter = ref('all') // 'all' | 'active' | 'completed'

const handleSubmit = () => {
  if (newTodoText.value.trim()) {
    todoStore.addTodo(newTodoText.value)
    newTodoText.value = ''
  }
}

const filteredTodos = computed(() => {
  if (currentFilter.value === 'active') {
    return todoStore.todos.filter(t => !t.isCompleted)
  }
  if (currentFilter.value === 'completed') {
    return todoStore.todos.filter(t => t.isCompleted)
  }
  return todoStore.todos
})

const completedCount = computed(() => {
  return todoStore.todos.filter(t => t.isCompleted).length
})

const totalCount = computed(() => {
  return todoStore.todos.length
})

const completionPercentage = computed(() => {
  if (totalCount.value === 0) return 0
  return Math.round((completedCount.value / totalCount.value) * 100)
})
</script>

<template>
  <div class="flex flex-col h-full text-[#4a3f35]">
    <div class="mb-6">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-semibold text-[#5c4d3c] flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-[#8fa88b]"></span>
          Tasks
        </h2>
        <span class="text-xs text-[#8c7d70] font-medium tracking-wide">
          {{ completedCount }}/{{ totalCount }} completed
        </span>
      </div>
      <div class="w-full h-2 bg-[#e6ded4] rounded-full overflow-hidden shadow-inner">
        <div 
          class="h-full bg-[#a98467] transition-all duration-500 ease-out rounded-full"
          :style="{ width: `${completionPercentage}%` }"
        ></div>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="mb-5 flex gap-2">
      <input
        v-model="newTodoText"
        type="text"
        placeholder="Write a cozy task..."
        class="flex-1 px-4 py-2.5 bg-[#fdfbf7] border border-[#dcd1c4] rounded-xl text-sm text-[#4a3f35] placeholder-[#b5a89b] focus:outline-none focus:ring-1 focus:ring-[#a98467] focus:border-[#a98467] transition-all duration-200 shadow-sm"
      />
      <button
        type="submit"
        class="px-5 py-2.5 bg-[#8fa88b] hover:bg-[#7a9476] text-white rounded-xl text-sm font-medium shadow-sm transition-all duration-200 hover:shadow-md active:scale-95"
      >
        Add
      </button>
    </form>

    <div class="flex gap-2 mb-4">
      <button
        v-for="filter in ['all', 'active', 'completed']"
        :key="filter"
        @click="currentFilter = filter"
        class="px-3 py-1.5 rounded-lg text-xs font-medium capitalize tracking-wide transition-all duration-200 border"
        :class="currentFilter === filter 
          ? 'bg-[#eddcd2] text-[#6b4e3d] border-[#dcbfa6] shadow-sm' 
          : 'text-[#8c7d70] border-transparent hover:text-[#4a3f35] hover:bg-[#f4ebe1]'"
      >
        {{ filter }}
      </button>
    </div>

    <div class="flex-1 overflow-y-auto pr-1 space-y-2.5 max-h-[300px] custom-scrollbar">
      <TransitionGroup name="list">
        <div
          v-for="todo in filteredTodos"
          :key="todo.id"
          class="flex items-center justify-between p-3.5 bg-[#fcf9f2] hover:bg-[#faf5eb] border border-[#eee7dc] rounded-xl transition-all duration-200 group shadow-sm hover:shadow-md"
        >
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <button
              @click="todoStore.toggleTodo(todo.id)"
              class="w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 cursor-pointer shadow-inner"
              :class="todo.isCompleted 
                ? 'bg-[#8fa88b] border-[#8fa88b] text-white' 
                : 'border-[#c8bcb0] bg-[#fffdfa] hover:border-[#8fa88b]'"
            >
              <svg 
                v-if="todo.isCompleted" 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-3.5 w-3.5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            <span
              @click="todoStore.toggleTodo(todo.id)"
              class="text-sm cursor-pointer select-none truncate transition-all duration-300"
              :class="todo.isCompleted ? 'text-[#b5a89b] line-through decoration-[#b5a89b]/60' : 'text-[#4a3f35]'"
            >
              {{ todo.text }}
            </span>
          </div>

          <button
            @click="todoStore.deleteTodo(todo.id)"
            class="opacity-0 group-hover:opacity-100 p-1.5 text-[#b5a89b] hover:text-[#c97a7a] hover:bg-[#fcf1f1] rounded-lg transition-all duration-200 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </TransitionGroup>

      <div 
        v-if="filteredTodos.length === 0" 
        class="text-center py-10 text-[#b5a89b] text-xs font-medium tracking-wide"
      >
        Take a breath. No tasks left for now.
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.list-leave-active {
  position: absolute;
  width: calc(100% - 8px);
}
</style>
