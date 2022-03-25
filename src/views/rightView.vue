<template>
    <div class='wrapper'> 
         <el-tabs v-model="activeName" @tab-click="handleClick"  type="card">
            <el-tab-pane label="数据配置" name="data">
                数据配置<br/>
            {{comp}}
                <el-input
                 v-model="payload"
                 @input="handleSyn"
                >

                </el-input>
            </el-tab-pane>
            <el-tab-pane label="样式配置" name="style">样式配置</el-tab-pane>
            
  </el-tabs>

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
            comp:null,
            activeName:'data'
        }
    },
    computed:{
        payload:{
            get(){
            if(this.comp==null) return `NULL COMP`
            return this.comp.payload
            },
            set(val){
                this.comp.payload=val
            }
        }
    },
    methods:{
        handleClick(){
            console.log(11)
        },
        handleSyn(){
            this.comp.template=`<text-Comp width=100 height=20 color=100 fontSize=12 payload=${this.comp.payload} />`
            EventBus.$emit('compsyn',this.comp)
            console.log(1);
        }
    }
}
</script>

<style lang="less" scoped>
.wrapper{
    width:250px;
}
</style>