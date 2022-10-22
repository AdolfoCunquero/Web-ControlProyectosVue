<template>
  <v-app style="background-color:#fafafa;">
    <MainView></MainView>
  </v-app>
</template>

<script>

import MainView from './views/MainView.vue'

export default {
  name: 'App',
  components:{
    MainView,
},
  data: () => ({
    
  }),
};
</script>