<template>
  <section class="bg-white shadow rounded-lg p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4">Pobierz użytkownika</h2>
    <div class="flex space-x-2 items-center mb-4">
      <input v-model="id" placeholder="User ID" class="border rounded px-3 py-2 flex-1" />
      <button @click="fetchUser" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Pobierz</button>
    </div>
    <div v-if="user" class="space-y-2">
      <p><strong class="font-bold">{{ user.name }}</strong> ({{ user.short_name }})</p>
      <p>
        <span class="font-medium">Email:</span>
        <span v-if="!editing">{{ user.email }}</span>
        <input v-if="editing" v-model="user.email" class="border rounded px-2 py-1 ml-2" />
      </p>
      <div class="flex space-x-2">
        <button v-if="!editing" @click="editing = true" class="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500">Edytuj</button>
        <button v-if="editing" @click="updateUser" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Zapisz</button>
        <button v-if="editing" @click="cancelEdit" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Anuluj</button>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-500">Brak pobranego użytkownika.</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'UserDetail',
  data() {
    return {
      id: '',
      user: null,
      editing: false
    }
  },
  methods: {
    async fetchUser() {
      try {
        const res = await this.$axios.get(`/canvas/user/${this.id}`)
        this.user = res.data
      } catch {
        alert('Nie znaleziono użytkownika Canvas')
        this.user = null
      }
      this.editing = false
    },
    async updateUser() {
      try {
        await this.$axios.put('/canvas/user', this.user)
        this.editing = false
        alert('Zaktualizowano w Canvas')
      } catch {
        alert('Błąd aktualizacji Canvas')
      }
    },
    cancelEdit() {
      this.editing = false
    }
  }
}
</script>
