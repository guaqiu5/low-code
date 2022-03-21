import textHandler from "./textHandler";
let handlerList={
    textHandler,
}
let getHandler=(info)=>{
    return handlerList[info.type]
}
export default getHandler