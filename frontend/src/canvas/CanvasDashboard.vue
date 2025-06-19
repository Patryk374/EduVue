<template>
  <div class="max-w-4xl mx-auto p-8 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-8">Panele Canvas LMS</h1>
    <AccountInfo :account="accountInfo"/>
    <UsersList :users="usersList"/>
    <UserDetail/>
    <UserForm @user-created="refreshUsers"/>
  </div>
</template>

<script>

import AccountInfo from './components/AccountInfo.vue'
import UsersList from './components/UsersList.vue'
import UserDetail from './components/UserDetail.vue'
import UserForm from './components/UserForm.vue'

export default {
  name: 'CanvasDashboard',
  components: {AccountInfo, UsersList, UserDetail, UserForm},
  data() {
    return {
      accountInfo: null,
      usersList: []
    }
  },
  created() {
    this.loadAccount()
    this.loadUsers()
  },
  methods: {
    async loadAccount() {
      try {
        const res = await this.$axios.get('/canvas/user/self')
        this.accountInfo = res.data
      } catch {
        this.accountInfo = null
      }
    },
    async loadUsers() {
      try {
        const res = await this.$axios.get('/canvas/users')
        this.usersList = res.data
      } catch {
        this.usersList = []
      }
    },
    async refreshUsers() {
      await this.loadUsers()
    }
  }
}
</script>
