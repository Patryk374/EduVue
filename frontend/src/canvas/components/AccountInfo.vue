<template>
  <section class="bg-white shadow rounded-lg p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4">Informacje o koncie Canvas</h2>
    <div v-if="account">
      <p>
        <span class="font-medium">ID:</span>
        <span :class="account.id ? '' : 'text-red-500'">
          {{ account.id ?? 'puste' }}
        </span>
      </p>
      <p>
        <span class="font-medium">Nazwa konta:</span>
        <span :class="account.name ? '' : 'text-red-500'">
          {{ account.name ?? 'puste' }}
        </span>
      </p>
      <p>
        <span class="font-medium">Sortable Name:</span>
        <span :class="account.sortable_name ? '' : 'text-red-500'">
          {{ account.sortable_name ?? 'puste' }}
        </span>
      </p>
      <p>
        <span class="font-medium">Email:</span>
        <span :class="account.email ? '' : 'text-red-500'">
          {{ account.email ?? 'puste' }}
        </span>
      </p>
      <p>
        <span class="font-medium">Login ID:</span>
        <span :class="account.login_id ? '' : 'text-red-500'">
          {{ account.login_id ?? 'puste' }}
        </span>
      </p>
    </div>
    <div v-else>
      <p class="text-gray-500">Ładowanie informacji o koncie...</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AccountInfo',
  props: { account: Object }
}
</script>
