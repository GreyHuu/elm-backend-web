<template>
  <div class="logo">
    <router-link :to="{name:'dashboard'}">
<!--      <LogoSvg alt="logo" />-->
      <img src="../../../public/elm.png" height="32" width="32" alt="logo"/>
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.svg?inline'

export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: '饿了么',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
