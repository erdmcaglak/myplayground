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
  background-color: $black;
  width: 100%;
  height: 100%;
  font-size: 10px;
  font-family: 'Source Sans Pro', sans-serif;
}
.app-main{
  position: relative;
  width: 100%;
  height: 100%;
  @include d-flex(row,flex-start,stretch);
}
</style>