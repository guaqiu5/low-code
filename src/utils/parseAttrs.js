let parseAttrs=(attrs)=>{
    let res=``
    attrs.forEach((attr)=>{
        res+=`${attr.key}=${attr.value} `
    })
    return res
}
export default parseAttrs