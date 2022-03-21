import textComp from '../components/textComp.vue'
let textCompList={
    textComp
}
function install(Vue){
    Object.keys(textCompList).forEach((key)=>{
        Vue.component(key,textCompList[key])
    })
}
let textCompApi={
    version:`1.0.0`,
    install
}
export default textCompApi
