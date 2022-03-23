import textHandler from "./textHandler";
let handlerList={
    textComp:textHandler
}
let getHandler=(info)=>{
    return handlerList[info.type]()
}
export default getHandler