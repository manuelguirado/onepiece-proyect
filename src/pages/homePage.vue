<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getCharacters } from '../api/getCharacters'
import type { Character } from '../types/characterType'
import { Search, Heart, Skull, Zap, Users } from 'lucide-vue-next'

const characters = ref<Character[]>([])
const search = ref('')
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    characters.value = await getCharacters()
  } catch (e) {
    error.value = 'Error loading characters'
    console.error(e)
  } finally {
    loading.value = false
  }
})

const filteredCharacters = computed(() =>
  characters.value.filter((c) => c.name.toLowerCase().includes(search.value.toLowerCase())),
)
</script>

<template>
  <div class="container">
    <h1 class="text-4xl font-bold mb-8 text-center text-blue-400">One Piece Characters</h1>

    <div class="flex justify-center mb-8">
      <div class="relative w-full max-w-md">
        <Search class="absolute left-2 top-3 w-5 h-5 text-gray-400" />
        <input
          v-model="search"
          type="text"
          placeholder="  Search character..."
          class="search-input pl-10 "
        />
      </div>
    </div>

    <div class="text-center mb-6 text-gray-400">
      <p v-if="loading" class="text-lg flex items-center justify-center gap-2">
        <span class="animate-spin">⚙️</span> Loading...
      </p>
      <p v-else-if="error" class="text-red-500">{{ error }}</p>
      <p v-else class="flex items-center justify-center gap-2">
        <Users class="w-5 h-5 text-blue-400" />
        <span>
          Showing <span class="text-blue-400 font-bold">{{ filteredCharacters.length }}</span> /
          <span class="text-blue-400 font-bold">{{ characters.length }}</span> characters
        </span>
      </p>
    </div>

    <div class="characters-grid">
      <div v-for="character in filteredCharacters" :key="character.id" class="character-card">
        <img
          v-if="character.fruit?.filename"
          :src="character.fruit.filename"
          :alt="character.fruit.name || character.name"
          class="w-full  object-cover rounded-md mb-4 border border-gray-700"
        />
        <h2 class="text-2xl font-bold mb-4 text-blue-300">{{ character.name }}</h2>

        <div class="space-y-2 text-sm">
          <p v-if="character.age" class="text-gray-300">
            <span class="font-semibold text-gray-200">Age:</span> {{ character.age }}
          </p>
          <p v-if="character.size" class="text-gray-300">
            <span class="font-semibold text-gray-200">Size:</span> {{ character.size }}
          </p>
          <p v-if="character.job" class="text-gray-300">
            <span class="font-semibold text-gray-200">Job:</span> {{ character.job }}
          </p>
          <p v-if="character.bounty" class="text-gray-300">
            <span class="font-semibold text-gray-200">Bounty:</span> {{ character.bounty }}
          </p>
          <p class="pt-2 flex items-center gap-2">
            <span class="font-semibold text-gray-200">Status:</span>
            <span
              :class="[
                'font-bold flex items-center gap-1',
                character.status === 'deceased' ? 'text-red-500' : 'text-green-500',
              ]"
            >
              <component :is="character.status === 'deceased' ? Skull : Heart" class="w-4 h-4" />
              {{ character.status }}
            </span>
          </p>
          <p v-if="character.fruit" class="pt-2 border-t border-gray-700 flex items-start gap-2">
            <Zap class="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
            <span>
              <span class="font-semibold text-gray-200">{{ character.fruit.name }}</span>
              <em class="text-gray-400 block">({{ character.fruit.type }})</em>
            </span>
          </p>
        </div>
      </div>
    
    </div>

  </div>
</template>
