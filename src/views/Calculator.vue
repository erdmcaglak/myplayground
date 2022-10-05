<template>
  <div class="snake-main">
    <div class="calculator-main">
      <div class="calculator-result-area">
        <div v-if="isOperating" class="input-second-holder">
          {{inputHolder}}
        </div>
        {{showCurrentHolder}}
      </div>
      <div class="calculator-key-area">
        <div class="calculator-number-keys">
          <div @click="calculatorOperation(item)" v-for="(item,i) in numberKeyArr" :key="'numberKeys'+i" pattern="\d*" class="number-key-content">
            {{item.title}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex"
export default {
  data(){
    return{
      isOperating:false,
      inputHolder:"0",
      inputSecondHolder:"0",
      oldValueHolder:"",
      selectedOperation:"",
      numberKeyArr:[
        {title:'CE',value:'CE'},
        {title:'C',value:'C'},
        {title:'<',value:'<'},
        {title:'/',value:'/'},
        {title:'7',value:'7'},
        {title:'8',value:'8'},
        {title:'9',value:'9'},
        {title:'x',value:'x'},
        {title:'4',value:'4'},
        {title:'5',value:'5'},
        {title:'6',value:'6'},
        {title:'-',value:'-'},
        {title:'1',value:'1'},
        {title:'2',value:'2'},
        {title:'3',value:'3'},
        {title:'+',value:'+'},
        {title:'+/-',value:'+/-'},
        {title:'0',value:'0'},
        {title:',',value:','},
        {title:'=',value:'='},
        
      ],
    }
  },
  methods:{
    ...mapMutations([
      "setAlert"
    ]),
    calculatorOperation(item){
      if(item.value!=='/'&&item.value!=='x'&&item.value!=='+'&&item.value!=='='&&item.value!=='-'&&item.value!=='CE'&&item.value!=='C'&&item.value!=='<'&&item.value!=='+/-'){
        
        if(!this.isOperating){
          if(this.inputHolder === '0')
            this.inputHolder=''
          if(item.value ===',' && this.inputHolder.includes(',')) 
            return
          else 
            this.inputHolder += item.value;
          
        }
        else{
          
          if(this.inputSecondHolder === '0')
            this.inputSecondHolder=''
          this.inputSecondHolder += item.value
        }
      }
      else if (this.isOperating && item.value==='='){
        if(this.inputSecondHolder===""){
          this.setAlert({
            title:'Please type second number',
            type:'danger'
          })
        }
        else{
          let firstNumber = parseFloat(this.inputHolder.replace(',','.'))
          let secondNumber = parseFloat(this.inputSecondHolder.replace(',','.'))
          if(this.selectedOperation === '/'){
            this.isOperating = false;
            this.inputHolder = (Math.floor((firstNumber/secondNumber)*100)/100).toString().replace('.',',');
            this.inputSecondHolder = "0";
          }
          else if(this.selectedOperation === 'x'){
            this.isOperating = false;
            this.inputHolder = (Math.floor((firstNumber*secondNumber)*100)/100).toString().replace('.',',');
            this.inputSecondHolder = "0";
          }
          else if(this.selectedOperation === '+'){
            this.isOperating = false;
            this.inputHolder = (Math.floor((firstNumber+secondNumber)*100)/100).toString().replace('.',',');
            this.inputSecondHolder = "0";
          }
          else{
            this.isOperating = false;
            this.inputHolder = (Math.floor((firstNumber-secondNumber)*100)/100).toString().replace('.',',');
            this.inputSecondHolder = "0";
          }
        }
      }
      else if ((item.value==='/' || item.value==='x' || item.value==='+' || item.value==='-')){
        if(this.inputHolder === ""){
          this.setAlert({
            title:'Please type a number',
            type:'danger'
          })
        }
        else{
          this.isOperating = true;
          this.selectedOperation = item.value
        }
      }
      else if(item.value === 'CE' || item.value === 'C'){
        this.isOperating = false;
        this.inputHolder = "0";
        this.inputSecondHolder = "0";
      }
      else if(item.value === '<'){
        if(this.isOperating){
          let arr=this.inputSecondHolder.split('');
          arr.splice(arr.length-1,1);
          this.inputSecondHolder = arr.join('');
          if(this.inputSecondHolder==='' )
            this.inputSecondHolder='0'
        }
        else{
          let arr=this.inputHolder.split('');
          arr.splice(arr.length-1,1);
          this.inputHolder = arr.join('');
          if(this.inputHolder==='' )
            this.inputHolder='0'
          
        }
      }
      else if(item.value === '+/-'){
        if(this.isOperating){
          if(this.inputSecondHolder!=='0')
            this.inputSecondHolder= (parseFloat(this.inputSecondHolder) * -1).toString()
        }
        else{
          if(this.inputHolder!=='0')
            this.inputHolder= (parseFloat(this.inputHolder) * -1).toString()
          
        }
      }
      else if(!this.isOperating){
        this.setAlert({
            title:'Please select a operation',
            type:'danger'
          })
      }
    }
  },
  computed:{
    showCurrentHolder(){
      return this.isOperating ? this.inputSecondHolder : this.inputHolder;
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/colors.scss";
@import "@/scss/transition.scss";
.snake-main{
  color: $white;
  @include d-flex-center;
  .calculator-main{
    border-radius: 8px;
    height: 70%;
    width: 35%;
    background-color: $gray;
    @include d-flex(column,flex-start,stretch);
    padding: 30px;
    gap: 50px;
    @media (min-width: 1025px) and (max-width: 1440px){
      width: 50%;
      height: 75%;
      padding: 25px;
      gap: 40px;
    }
    @media (min-width: 769px) and (max-width: 1024px){
      width: 70%;
      height: 85%;
      padding: 25px;
      gap: 35px;
    }
    @media (min-width: 481px) and (max-width: 768px) {
      width: 80%;
      height: 80%;
    }
    @media (max-width: 480px) {
      width: 95%;
      height: 80%;
      padding: 25px;
      gap: 35px;
    }
    .calculator-result-area{
      @include d-flex(row,flex-end,center);
      font-size: 4rem;
      padding: 20px;
      background-color: $gray1;
      min-height: 100px;
      position: relative;
      user-select: none;
      border-radius: 8px;
      @media (min-width: 1025px) and (max-width: 1440px){
        padding: 15px;
        min-height: 90px;
      }
      @media (min-width: 769px) and (max-width: 1024px){
        padding: 10px;
        min-height: 80px;
      }
      @media (min-width: 481px) and (max-width: 768px) {
        padding: 20px;
        min-height: 90px;
        font-size: 5rem;
      }
      @media (max-width: 480px) {
        padding: 15px;
        min-height: 80px;
        font-size: 5rem;
      }
      .input-second-holder{
        position: absolute;
        left: 5px;
        top: 5px;
        color: $black1;
        font-size: 2rem;
        @media (min-width: 481px) and (max-width: 768px) {
          font-size: 3.5rem;
        }
        @media (max-width: 480px) {
          font-size: 3.5rem;
        }
      }
    }
    .calculator-key-area{
      height: 100%;
      @include d-flex(row,flex-start,stretch);
      .calculator-number-keys{
        flex: 3 0 1px;
        flex-wrap: wrap;
        @include d-flex(row,space-around,stretch);
        border: 1px solid $black;
        border-radius: 8px;
        overflow: hidden;
        .number-key-content{
          border-top: 1px solid $black;
          border-right: 1px solid $black;
          @include d-flex-center;
          flex: 1 0 25%;
          font-size: 4rem;
          cursor: pointer;
          transition: all .1s linear;
          user-select: none;
          @media(hover: hover) and (pointer: fine){
            &:hover{
              background-color: $black;
            }
          }
          @media(hover: none) {
            &:active{
              background-color: $black;
            }
          }
          @media (min-width: 481px) and (max-width: 768px) {
            font-size: 5rem;
          }
          @media (max-width: 480px) {
            font-size: 5rem;
          }
          &:nth-child(1),&:nth-child(2),&:nth-child(3),&:nth-child(4){
            border-top: none;
          }
          &:nth-child(4n){
            border-right: none;
          }
          
        }
      }
    }
  }
}
</style>