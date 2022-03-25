<template>
    <div class='wrapper'
     @dragover="handleDragOver"
     @drop="handleDrop"
     @click="handleSelect"
     > 
        <div
        v-for="(item) of components"
        :key=item.id
        :id=item.id
        >
        
        </div>
        <div class="selectBorder" v-if="curComp" :style="hasSelected"></div>     
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
            curComp:undefined,//当前选中的组件
        }
    },
    computed:{
        hasSelected(){
            if(!this.curComp) return;
            let width=0;
            let height=0;
            this.curComp.attrs.forEach((item)=>{
                if(item.keys=='width'){
                    width=item.value
                }
                if(item.keys='height'){
                    height=item.value
                }
            })
            let left=this.curComp.position.left
            console.log(left)
            let top=this.curComp.position.top
            let zIndex=this.curComp.position.zIndex
            return{
                width:`${width}px`,
                height:`${height}px`,
                left:`${left}px`,
                top:`${top}px`,
                zIndex:`${zIndex}`
            }
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
            //console.log(`component`,component)
            this.components.push(component);
            this.$nextTick(()=>{
                mountComponent(component)
            })
        },
        handleSelect(e){
            //console.log(e)
            //通过事件冒泡得到所需要的选中的组件
            //正则匹配
            let reg=/\w{8}-\w{4}/;
            let node=e.target;
            let count=0;
           while(node&&!reg.test(node.id)){
               count++;
               if(count==20){
                   return
               }
               node=node.parentNode;
           }
            if(node&&node.id){
                this.curComp=this.components.find((item)=>{
                    return item.id==node.id
                })
                console.log(this.curComp)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.wrapper{
    flex:1;
    position: relative;
    .selectBorder{
        border: 1px solid green;
        position:absolute;
    }
}
</style>