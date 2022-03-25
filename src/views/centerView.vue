<template>
    <div class='wrapper'
     @dragover="handleDragOver"
     @drop="handleDrop"
     > 
        <div
        v-for="(item) of components"
        :key=item.id
        :id=item.id
        >
        1
        </div>     
    </div>
</template>

<script>
import getHandler from '../handlers/index'
import genId from '../utils/genId'
import mountComponent from '../utils/mountComponent'
export default{
    data(){
        return {
            components:[],//画布上用到的组件
            zIndex:0,//组件堆叠 越大就能覆盖其他的
        }
    },
    methods:{
        handleDragOver(e){
            e.preventDefault()//阻止默认行为 让画布可以接受到 
            
        },
        handleDrop(e){
            e.preventDefault()//阻止默认行为 让画布可以接受到
            let info=JSON.parse(e.dataTransfer.getData('info'))
            //console.log(info.id)
            let component=getHandler(info)
            component.id=genId()
            //console.log(attrs,payload,template)
            this.zIndex++;
            let compWidth=0;
            let compHeight=0;
            //解析attributes
            component.attrs.forEach((item)=>{
                if(item.keys=='width'){
                    compWidth=item.value;
                }
                if(item.keys=='height'){
                    compHeight=item.value;
                }
            })
            let left=e.offsetX-compWidth/2;
            let top=e.offsetY-compHeight/2;
            if(left<0) left=0;
            if(top<0) top=0;
            component.position={left,top,zIndex:this.zIndex};
            console.log(`component`,component)
            this.components.push(component);
            this.$nextTick(()=>{
                mountComponent(component)
            })


        }
    }
}
</script>

<style lang="less" scoped>
.wrapper{
    flex:1;
    position: relative;
}
</style>