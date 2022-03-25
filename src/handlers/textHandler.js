import parseAttrs from '../utils/parseAttrs'

//给文本组件添加options

let textHandler=()=>{
    let attrs=[
        {   
            name:`宽度`,
            keys:`width`,
            value:100,
            type:`input`,
            placeholder:`请输入文本组件的宽度`,
        },
        {
            name:`高度`,
            keys:`height`,
            value:20,
            type:`input`,
            placeholder:`请输入文本组件的高度`,
        },
        {
            name:`颜色`,
            keys:`color`,
            value:100,
            type:`color`,
            placeholder:`请选择文本组件的颜色`,
        },
        {
            name:`字体大小`,
            keys:`fontSize`,
            value:12,
            type:`input`,
            placeholder:`请输入文本组件的字体大小`,
        },
    ]
let payload={
        plainTxt: `刘亦菲`
    }

const template=`<text-Comp ${parseAttrs(attrs)} />`

return {attrs,payload,template}

}
export default textHandler