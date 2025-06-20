<template>
  <section class="bg-white shadow rounded-lg p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4">Utwórz nowego użytkownika</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <input v-model="form.name" placeholder="Pełne imię i nazwisko" class="border rounded px-3 py-2" />
      <input v-model="form.shortName" placeholder="Short name" class="border rounded px-3 py-2" />
      <input v-model="form.sortableName" placeholder="Sortable name" class="border rounded px-3 py-2" />
      <input v-model="form.loginId" placeholder="Login (unique_id)" class="border rounded px-3 py-2" />
      <input v-model="form.email" placeholder="Email" class="border rounded px-3 py-2 col-span-full" />
    </div>
    <button @click="createUser" class="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600">Utwórz w Canvas</button>
  </section>
</template>

<script>
export default {
  name: 'UserForm',
  data() {
    return {
      form: {
        name: '',
        shortName: '',
        sortableName: '',
        loginId: '',
        email: ''
      }
    }
  },
  methods: {
    async createUser() {
      try {
        const res = await this.$axios.post('/canvas/user', this.form)
        this.$emit('user-created', res.data)
        alert('Użytkownik utworzony z ID ' + res.data.id)
        this.form = { name: '', shortName: '', sortableName: '', loginId: '', email: '' }
      } catch {
        alert('Błąd tworzenia użytkownika Canvas')
      }
    }
  }
}
</script>