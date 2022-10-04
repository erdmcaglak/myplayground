<template>
  <div class="menu-main">
    <router-link tag="div" to="/" class="menu-header">
      Menu
    </router-link>
    <router-link tag="div" active-class="menu-items-active" :to="item.path" v-for="(item,i) in menuItems" :key="'menu-item'+i" class="menu-items">
      {{item.title}}
    </router-link>
  </div>
</template>

<script>
import {menuItems} from "@/enum.js"
export default {
  data(){
    return{
      menuItems,
    }
  },
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/colors.scss";
  .menu-main{
    height: 100%;
    @include d-flex(column,flex-start,stretch);
    background-color: $gray;
    min-width: 250px;
    gap: 10px;
    .menu-header{
      cursor: pointer;
      user-select: none;
      font-size: 3rem;
      color: $white;
      font-weight: 700;
      @include d-flex-center;
      padding: 10px 0;
    }
    .menu-items{
      @include d-flex(row,flex-start,center);
      color: $white;
      font-size: 2.5rem;
      padding: 0 10px;
      user-select: none;
      cursor: pointer;
      transition: all .1s linear;
      &:hover{
        color: $green;
      }
    }
    .menu-items-active{
      @include d-flex(row,flex-start,center);
      color: $green;
      font-size: 2.5rem;
      padding: 0 10px;
      user-select: none;
      cursor: pointer;
    }
  }
</style>