<template>
    <div class='wrapper'> 
          right--{{this.comp}}
    </div>
</template>

<script>
import {EventBus} from "../utils/EventBus"
export default {
    mounted(){
        EventBus.$on('sendcomp',(comp)=>{
            this.comp=comp
        })
    },
    data(){
        return{
            comp:null
        }
    }
}
</script>

<style lang="less" scoped>
.wrapper{
    width:250px;
}
</style>