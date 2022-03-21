<template>
  <div>
   <head-view/>
   <div class='container'>
      <left-view/>
      <center-view/>
      <right-view/>
    </div>
  
  </div>
</template>

<script>
import centerView from './views/centerView.vue'
import headView from './views/headView.vue'
import leftView from './views/leftView.vue'
import rightView from './views/rightView.vue'


export default {
  name: 'App',
  components: {
    centerView,
    headView,
    leftView,
    rightView,
  }
}
</script>

<style lang="less">

.container{
  display: flex;
  height: calc(100vh-80px);

}
</style>
