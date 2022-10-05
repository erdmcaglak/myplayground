<template>
  <div class="app-main">
    <Alert :err="getAlert"/>
    <Menu />
    <router-view style="width:100%"></router-view>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue"
import Alert from "@/generic-components/alert/Alert.vue"
import {mapGetters} from "vuex"
export default {
  components:{
    Menu,
    Alert
  },
  computed:{
    ...mapGetters([
      "getAlert"
    ])
  }
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/colors.scss";
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
*{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  list-style-type: none;
  text-decoration: none;
}
html,body{
  -webkit-tap-highlight-color: transparent;
  background-color: $black;
  width: 100%;
  height: 100%;
  font-size: 10px;
  font-family: 'Source Sans Pro', sans-serif;
  @media (min-width: 1025px) and (max-width: 1440px){
    font-size: 9px;
  }
  @media (min-width: 769px) and (max-width: 1024px){
    font-size: 8px;
  }
  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 7px;
  }
  @media (max-width: 480px) {
    font-size: 6px;
  }
}
.app-main{
  position: relative;
  width: 100%;
  height: 100%;
  @include d-flex(row,flex-start,stretch);
}
</style>