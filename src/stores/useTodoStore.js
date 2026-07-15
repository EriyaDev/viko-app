import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([])

  // Load from localStorage
  const savedTodos = localStorage.getItem('productivity_todos')
  if (savedTodos) {
    try {
      todos.value = JSON.parse(savedTodos)
    } catch (e) {
      todos.value = []
    }
  }

  // Watch & Save
  watch(
    todos,
    (newTodos) => {
      localStorage.setItem('productivity_todos', JSON.stringify(newTodos))
    },
    { deep: true }
  )

  const addTodo = (text) => {
    if (!text.trim()) return
    todos.value.push({
      id: Date.now(),
      text: text.trim(),
      isCompleted: false,
    })
  }

  const toggleTodo = (id) => {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) {
      todo.isCompleted = !todo.isCompleted
    }
  }

  const deleteTodo = (id) => {
    todos.value = todos.value.filter((t) => t.id !== id)
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
  }
})
