import Vue from 'vue'
let mountComponent=(comp)=>{
    const id =comp.id;
    let data={};
   //console.log(typeof id)
    //将attrs塞到组件的data里面
    comp.attrs.forEach(item=>{  
        let index=`"${item.keys}"`
        //console.log(index)
        data[index]=item.value
    })

    //console.log(document.getElementById(id).innerHTML)
    new Vue({
        name:id.toString(),
        el:document.getElementById(id),
        template:comp.template,
        data(){
            return data;
        },
        mounted(){
            //挂载后组件的原来的id什么的都没了 得mounted的时候加一下 并且确定组件的位置
            this.$el.id=id;
            this.$el.style.position='absolute';
            this.$el.style.cursor='pointer';
            this.$el.style.left=`${comp.position.left}px`
            this.$el.style.top=`${comp.position.top}px`
            this.$el.style.zIndex=comp.position.zIndex
            this.$el.style.width=`${this.width}px`
            this.$el.style.height=`${this.height}px`
        }
    })
}


export default mountComponent