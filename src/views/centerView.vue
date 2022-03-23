<template>
    <div class='wrapper'
     @dragover="handleDragOver"
     @drop="handleDrop"
     >      
    </div>
</template>

<script>
import getHandler from '../handlers/index'
export default{
    methods:{
        handleDragOver(e){
            e.preventDefault()//阻止默认行为 让画布可以接受到
            
          

            

        },
        handleDrop(e){
            e.preventDefault()//阻止默认行为 让画布可以接受到
            let info=JSON.parse(e.dataTransfer.getData('info'))
            const{attrs,payload,template}=getHandler(info)
            console.log(attrs,payload,template)
            //解析attributes
            attrs.forEach((item)=>{
                if(item.key=='width'){

                }
                if(item.key=='height'){
                    
                }
            })


        }
    }
}
</script>

<style lang="less" scoped>
.wrapper{
    flex:1;
}
</style>