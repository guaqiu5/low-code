<template>
  <div class='wrapper' :style="selfStyle">
      <span>
          {{payload.plainTxt}}
      </span>
  </div>
</template>

<script>
export default {
    props:{
        width:{
            type:[String,Number]
        },
        height:{
            type:[String,Number]
        },
        color:{
            type:String
        },
        fontSize:{
            type:[String,Number]
        },
        payload:{
            type:Object,
            default(){
                return {
                    plainTxt:`默认值`
                }
            }
        }  
    },
    computed:{
      selfStyle(){
          return{
              width:this.width+`px`,
              height:this.height+`px`,
              color:this.color,
              fontSize:this.fontSize+`px`,
          }
      }
    }
}
</script>

<style>

</style>