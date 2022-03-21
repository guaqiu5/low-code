<template>
  <div class='wrapper'>
    <h2>low-code</h2>
    <div class='btns'>
        <div class='btn active'>
        预览
        </div>
        <div class='btn'>
        保存
        </div>
        <div class='btn'>
        发布
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.wrapper{
    background: #3A3737;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:#fff;
    padding: 0 15px;
}
.btns{
    display: flex;
    width:200px;
    justify-content: space-around;
    .btn{
        background: white;
        color:#333;
        font-size:15px;
        padding: 2px 10px;
        border-radius: 4px;
        &.active{
            color: white;
            background:#61CFFE;
        }
    }
}
</style>


