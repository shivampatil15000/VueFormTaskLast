<template>
  <div id="app">
    <HeaderComp/>
    <router-view />
  </div>
</template>

<script>
import HeaderComp from './components/HeaderComp.vue';

export default {
  name: 'App',
  components: {
    HeaderComp,
  },
};
</script>

