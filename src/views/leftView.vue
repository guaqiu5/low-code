<template>
<!-- 物料仓库 -->
 <div class='wrapper'>
    <div class='container' >
        <div 
        class='container-item'
        draggable="true"
        v-for="item in store"
        :key="item.id"
        :compType=item.type
        :compName=item.name
        @dragstart="handleDragStart"
        >
            {{item.name}}
        </div>
    </div>
</div>
</template>

<script>
import store from '../warehouse/store'
export default {
    data(){
        return{
            store:store,
        }
    },
    methods:{
        handleDragStart(e){
           let type=e.target.getAttribute('compType')
           let name=e.target.getAttribute('compName')
           //console.log(type,name)
           let info={
               'name':name,
               'type':type
           }
           e.dataTransfer.setData('info',JSON.stringify(info))

           
        }
    }
}
</script>

<style lang="less" scoped>
.wrapper{
    width:250px;
}
.container{
   padding: 5px;
   width:243px;
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   align-items: center;
   
}
.container-item{
    width: 100px;
    height: 100px;
    background: #eee;
    text-align: center;
    line-height: 100px;
    margin: 10px;
}
</style>