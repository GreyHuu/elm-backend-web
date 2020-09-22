<template>
  <div>
    <router-view />
  </div>
</template>

<script>

import Vue from 'vue'
import { ACCESS_TOKEN, CURRENT_USER } from '@/store/mutation-types'
import { getCurrentUser } from '@/api/userApi'

export default {
  name: 'BlankLayout',
  data() {
  }
}
</script>

<style scoped>

</style>
