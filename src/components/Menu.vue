<template>
  <div class="menu-main-wrapper">
    <div @click.stop class="hamburder-menu-wrapper">
      <Icon
        v-if="isSmalled"
        pointer
        icon="hamburger-menu.svg"
        :width="30"
        iconColor="#f6f8ff"
        @clickEvent="toggleMenu"
      />
    </div>
    <transition name="menu-slide">
      <div @click.stop v-if="openMenu" :class="isSmalled ? 'menu-main-smalled':'menu-main'">
        <div :class="isSmalled ? 'menu-header-wrapper-smalled':'menu-header-wrapper'">
          <router-link  tag="div" to="/" @click.native="closeMenuWhenChangeRoute" class="menu-header">
            Menu
          </router-link>
          <Icon
            v-if="isSmalled"
            pointer
            icon="close.svg"
            :width="15"
            iconColor="#f6f8ff"
            @clickEvent="closeMenu"
          />
        </div>
        <router-link tag="div" @click.native="closeMenuWhenChangeRoute" active-class="menu-items-active" :to="item.path" v-for="(item,i) in menuItems" :key="'menu-item'+i" class="menu-items">
          {{item.title}}
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script>
import Icon from "@/generic-components/icon/Icon.vue"
import {menuItems} from "@/enum.js"
export default {
  components:{
    Icon,
  },
  data(){
    return{
      menuItems,
      isSmalled:false,
      openMenu:true,
    }
  },
  methods:{
    closeMenuWhenChangeRoute(){
      if(this.isSmalled)
        this.openMenu = false;
    },
    closeMenu(){
      this.openMenu = false;
      this.removeListenClick();
    },
    toggleMenu(){
      this.openMenu = true;
      this.listenClick();
    },
    listenClickControl(e){
      if(e.target !== document.querySelector('.menu-main-wrapper')){
        this.closeMenu()
      }
    },
    removeListenClick(){
      window.removeEventListener('click',this.listenClickControl)
    },
    listenClick(){
      window.addEventListener('click',this.listenClickControl)
    }
  },
  mounted(){
    
  },
  created(){
    if(window.innerWidth <= 768 && !this.isSmalled){
      this.isSmalled = true;
      this.openMenu = false;  
    }
    else if(window.innerWidth > 768 && this.isSmalled){
      this.isSmalled = false;
      this.openMenu = true;  
    }
    window.addEventListener('resize',e=>{
        if(window.innerWidth <= 768 && !this.isSmalled){
          this.isSmalled = true;
          this.openMenu = false;  
        }
        else if(window.innerWidth > 768 && this.isSmalled){
          this.isSmalled = false;
          this.openMenu = true;  
        }
    })
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
    max-width: 250px;
    gap: 10px;
    @media (min-width: 1025px) and (max-width: 1440px){
      min-width: 230px;
      max-width: 230px;
    }
    @media (min-width: 769px) and (max-width: 1024px){
      min-width: 190px;
      max-width: 190px;
    }
    @media (min-width: 481px) and (max-width: 768px) {
      min-width: 250px;
      max-width: 250px;
    }
    @media (max-width: 480px) {
      min-width: 250px;
      max-width: 250px;
    }
    .menu-header-wrapper-smalled{
      @include d-flex(row,space-between,center);
      width: 100%;
      padding: 0 10px;
      .menu-header{
        cursor: pointer;
        user-select: none;
        font-size: 3rem;
        color: $white;
        font-weight: 700;
        @include d-flex-center;
        padding: 10px 0;
        @media (min-width: 1025px) and (max-width: 1440px){
        }
        @media (min-width: 769px) and (max-width: 1024px){
        }
        @media (min-width: 481px) and (max-width: 768px) {
          font-size: 4rem;
        }
        @media (max-width: 480px) {
          font-size: 4rem;
        }
      }
    }
    .menu-header-wrapper{
      @extend .menu-header-wrapper-smalled;
      @include d-flex-center;
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
      @media (min-width: 1025px) and (max-width: 1440px){
      }
      @media (min-width: 769px) and (max-width: 1024px){
      }
      @media (min-width: 481px) and (max-width: 768px) {
        font-size: 3.5rem;
      }
      @media (max-width: 480px) {
        font-size: 3.5rem;
      }
    }
    .menu-items-active{
      @include d-flex(row,flex-start,center);
      color: $green;
      font-size: 2.5rem;
      padding: 0 10px;
      user-select: none;
      cursor: pointer;
      @media (min-width: 481px) and (max-width: 768px) {
        font-size: 3.5rem;
      }
      @media (max-width: 480px) {
        font-size: 3.5rem;
      }
    }
  }
  .menu-main-smalled{
    @extend .menu-main;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 9;
  }
  .hamburder-menu-wrapper{
    position: absolute;
    left: 20px;
    top: 20px;
    cursor: pointer;
  }
</style>