<template>
  <section class="bg-white shadow rounded-lg p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4">Lista użytkowników</h2>
    <ul class="space-y-2">
      <li v-for="user in users" :key="user.id" class="p-2 border rounded hover:bg-gray-50">
        {{ user.name }} ({{ user.short_name }})
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'UsersList',
  props: {
    users: {
      type: Array,
      default: () => []
    }
  }
}
</script>