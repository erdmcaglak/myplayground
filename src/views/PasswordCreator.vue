<template>
  <div class="password-creator-main">
    <div class="creator-wrapper">
      <div class="password-show-area-wrapper">
        <div class="password-show-area">
          {{getPasswordResult}}
        </div>
        <div @click="copyPassword" class="copy">
          Copy
        </div>
      </div>
      <div class="check-list-wrapper">
        <div class="passwort-length-input-wrapper">
          <input @keyup="inputKeypressControl" v-model="passwordLength" class="passwort-length-input" type="number" spellcheck="false" autocomplete="false">
          <div class="password-length-text">
            Password Length
          </div>
        </div>
        <div v-for="(item,i) in checkList" :key="'checkBox'+i" class="check-list">
          <input class="checkbox" type="checkbox" name="checkbox" v-model="item.inputHolder"/>
          <div class="check-box-text">
            {{item.title}}
          </div>
        </div>
      </div>
      <div @click="createPassword" class="create-password-button">
        Create Password
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex"
export default {
  data(){
    return{
      passwordLength:'3',
      passwordResult:"",
      checkList:[
        {title:'Lower letters',inputHolder:true,getFunc:this.getLowerLetter},
        {title:'Upper letters',inputHolder:false,getFunc:this.getUpperLetter},
        {title:'Numbers',inputHolder:false,getFunc:this.getNumbers},
        {title:'Special characters',inputHolder:false,getFunc:this.getSpecialChar},
      ],
      lowerLetters:"abcdefghijklmnopqrstuvwxyz",
      upperLetters:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      numbers:"0123456789",
      specialChar:"!#$+%&/()[]{}=?*-_<|>;,.~",
    }
  },
  computed:{
    getPasswordResult(){
      if(this.passwordResult.includes('undefined')){
        this.passwordResult=''
      }
      return this.passwordResult 
    }
  },
  methods:{
    ...mapMutations([
      "setAlert"
    ]),
    copyPassword(){
      if(this.passwordResult!==''){
        navigator.clipboard.writeText(this.passwordResult).then(()=>{
          this.setAlert({
            type:'success',
            title:'Copy Successful'
          })
        })
      }
    },
    getLowerLetter(){
      return this.lowerLetters[Math.floor(Math.random()*this.lowerLetters.length)]
    },
    getUpperLetter(){
      return this.upperLetters[Math.floor(Math.random()*this.upperLetters.length)]
    },
    getNumbers(){
      return this.numbers[Math.floor(Math.random()*this.numbers.length)]
    },
    getSpecialChar(){
      return this.specialChar[Math.floor(Math.random()*this.specialChar.length)]
    },
    createPassword(){
      this.passwordResult = "";
      let _passwordLength = parseInt(this.passwordLength)
      for(let i =0;i<_passwordLength;i++){
        this.passwordResult+=this.getRandomSelectedChar()
      }
    },
    getRandomSelectedChar(){
      let randomArr =[];
      for(let item of this.checkList){
        if(item.inputHolder){
          randomArr.push(item.getFunc());
        }
      }
      return randomArr[Math.floor(Math.random()*randomArr.length)];
    },
    inputKeypressControl(){
      if(this.passwordLength.length>1){
        this.passwordLength=this.passwordLength.slice(0, 2)
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/colors.scss";
@import "@/scss/transition.scss";

.password-creator-main{
  overflow: hidden;
  @include d-flex-center;
  .creator-wrapper{
    width: 35%;
    @include d-flex(column,flex-start,stretch);
    padding: 20px;
    border-radius: 8px;
    background-color: $dark;
    position: relative;
    gap: 30px;
    @media (min-width: 1025px) and (max-width: 1440px){
      width: 50%;
    }
    @media (min-width: 769px) and (max-width: 1024px){
      width: 70%;
    }
    @media (min-width: 481px) and (max-width: 768px) {
      width: 70%;
    }
    @media (max-width: 480px) {
      width: 95%;
    }
    .password-show-area-wrapper{
      width: 100%;
      flex: 1 0 60px;
      background-color: $dark1;
      position: relative;
      .password-show-area{
        padding: 0 10px;
        overflow: hidden;
        width: 100%;
        height: 100%;
        color: $white;
        font-size: 3rem;
        word-wrap: normal;
        @include d-flex(row,flex-start,center);
        @media (max-width: 480px) {
          font-size: 4rem;
        }
      }
      .copy{
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 6px 10px;
        background-color: $green1;
        border-radius: 4px;
        transform: translate(0,50%);
        color: $white;
        font-size: 2.5rem;
        user-select: none;
        cursor: pointer;
        @media(hover: hover) and (pointer: fine){
          &:hover{
            background-color: $green;
          }
        }
        @media(hover: none) {
          &:active{
            background-color: $green;
          }
        }
        @media (max-width: 480px) {
          font-size: 3rem;
        }
      }
    }
    .check-list-wrapper{
      flex: 5 0 1px;
      @include d-flex(column,center,stretch);
      color: $white;
      gap: 20px;
      @media (max-width: 480px) {
          gap: 17px;
        }
      .passwort-length-input-wrapper{
        @include d-flex(row,flex-start,center);
        gap: 20px;
        @media (max-width: 480px) {
          gap: 10px;
        }
        .passwort-length-input{
          outline: none;
          background-color: rgb(255, 255, 255, .1);
          color: $white;
          border: none;
          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          border-radius: 8px;
          width: 15%;
          -moz-appearance: textfield;
          padding: 10px;
          font-size: 2.5rem;
          @media (max-width: 480px) {
            font-size: 3.5rem;
            padding: 5px 10px;
          }
        }
        .password-length-text{
          @include d-flex(row,flex-start,center);
          font-size: 3rem;
          user-select: none;
          @media (max-width: 480px) {
            font-size: 4rem;
          }
        }
      }
      .check-list{
        @include d-flex(row,flex-start,center);
        gap: 20px;
        font-size: 3rem;
        @media (max-width: 480px) {
          gap: 10px;
        }
        .checkbox{
          cursor: pointer;
          -webkit-appearance: none;
          appearance: none;
          background-color: transparent;
          margin: 0;
          width: 25px;
          height: 25px;
          border: 2px solid $white;
          border-radius: 4px;
          @include d-flex-center;
          &::before{
            content: "";
            width: 13px;
            height: 13px;
            transform: scale(0);
            transition: .1s transform ease-in-out;
            background-color: $purple;
          }
          &:checked::before{
            transform: scale(1);
          }
        }
        .check-box-text{
          user-select: none;
          @include d-flex(row,flex-start,center);
          font-size: 3rem;
          @media (max-width: 480px) {
            font-size: 4rem;
          }
        }
      }
    }
    .create-password-button{
      @include d-flex-center;
      font-size: 3rem;
      color: $white;
      flex: 1 0 60px;
      border-radius: 8px;
      background-color: $blue;
      user-select: none;
      cursor: pointer;
      transition: all .1s linear;
      @media(hover: hover) and (pointer: fine){
        &:hover{
          background-color: $dark-blue;
        }
      }
      @media(hover: none) {
        &:active{
          background-color: $dark-blue;
        }
      }
    }
  }
}
</style>