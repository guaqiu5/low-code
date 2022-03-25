
let parseAttrs=(attrs)=>{
    let res=``
    attrs.forEach((attr)=>{
        res+=`${attr.keys}=${attr.value} `
    })
    return res
}
export default parseAttrs