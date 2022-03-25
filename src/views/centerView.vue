<template>
    <div class='wrapper'
     id="canvas"
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
        <div
        id="selectBorder"
        v-if="curComp"
        @mousedown="handleReplace"
        :style="hasSelected"></div>     
    </div>
</template>

<script>
import getHandler from '../handlers/index'
import genId from '../utils/genId'
import mountComponent from '../utils/mountComponent'
import {EventBus} from '../utils/EventBus'
export default{
    data(){
        return {
            components:[],//画布上用到的组件
            zIndex:0,//组件堆叠 越大就能覆盖其他的
            curComp:undefined,//当前选中的组件
            preReplaceX:0,
            preReplaceY:0,//记录组件重新排列前的坐标
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
                if(item.keys=='height'){
                    height=item.value
                }
            })
         
            let left=this.curComp.position.left
       
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
    mounted(){
        EventBus.$on('compsyn',(comp)=>{
            this.curComp=comp
            this.$nextTick(()=>{
                mountComponent(comp)
            })
            console.log(`!`)
        })
    },
    methods:{
        handleSendComp(comp){
            EventBus.$emit("sendcomp",comp)
        },

        handleReplace(e){
            this.preReplaceX=e.clientX;
            this.preReplaceY=e.clientY;
            document.addEventListener('mousemove',this.mouseMove,true)
            document.addEventListener('mouseup',this.mouseUp,true)
        },

        mouseMove(e){
            //计算偏移量
            let offsetX=e.clientX-this.preReplaceX;
            let offsetY=e.clientY-this.preReplaceY;

            //设置组件的位置
            let comp=document.getElementById(this.curComp.id)
            Object.assign(comp.style,{
                left:this.handleOutRange('x',this.curComp.position.left+offsetX,this.curComp)+'px',
                top:this.handleOutRange('y',this.curComp.position.top+offsetY,this.curComp)+'px'
            })
            let border=document.getElementById('selectBorder')
            Object.assign(border.style,{
                left:this.handleOutRange('x',this.curComp.position.left+offsetX,this.curComp)+'px',
                top:this.handleOutRange('y',this.curComp.position.top+offsetY,this.curComp)+'px'
            })
         
        },

        mouseUp(e){
            document.removeEventListener('mousemove',this.mouseMove,true)
            document.removeEventListener('mouseup',this.mouseUp,true)
            this.curComp.position.left=this.handleOutRange('x',this.curComp.position.left+e.clientX-this.preReplaceX,this.curComp)
            this.curComp.position.top=this.handleOutRange('y',this.curComp.position.top+e.clientY-this.preReplaceY,this.curComp)
        },

        handleOutRange(type,val,comp){
            const canvas=document.getElementById('canvas')
            const canvasWidth=canvas.clientWidth
            const canvasHeight=canvas.clientHeight
            let compWidth=0
            let compHeight=0
            comp.attrs.forEach((i)=>{
                if(i.keys=='width') compWidth=i.value
                if(i.keys=='height') compHeight=i.value
            })
            let maxX=canvasWidth-compWidth
            let maxY=canvasHeight-compHeight
            let res=0;
            if(type=='x'){
                if(val<0) res=0
                else if(val>maxX) res=maxX
                else res=val
            }
            if(type=='y'){
                if(val<0) res=0
                else if(val>maxY) res=maxY
                else res=val
            }
            return res
        },

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
            
            this.components.push(component);
            this.$nextTick(()=>{
                mountComponent(component)
            })
        },
        handleSelect(e){
            
            //通过事件冒泡得到所需要的选中的组件
            //正则匹配
            let reg=/\w{8}-\w{4}/;
            let node=e.target;
            let count=0;
           while(node&&!reg.test(node.id)){
               count++;
               if(count==30){
                   return
               }
               node=node.parentNode;
           }
            if(node&&node.id){
                this.curComp=this.components.find((item)=>{
                    return item.id==node.id
                })
                this.handleSendComp(this.curComp)
            }else{
                this.curComp=undefined
            }
           
            
        }
    }
}
</script>

<style lang="less" scoped>
.wrapper{
    background: #eee;
    flex:1;
    position: relative;
    #selectBorder{
        border: 1px solid green;
        position:absolute;
    }
}
</style>