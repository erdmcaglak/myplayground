<template>
  <div class="welcome-main">
    Welcome
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/colors.scss";
.welcome-main{
  @include d-flex-center;
  color: #fff;
  font-weight: 700;
  font-size: 4rem;
}
</style>