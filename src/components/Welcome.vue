<template>
  <div id="welcome">
    <img src="../assets/header.png" alt="">
    <div class="small_size">这是一个微不足道的刷题小程序，以便让你可以</div>
    <div class="normal_size">更快</div>
    <div class="bigger_size">更高效</div>
    <div class="large_size">更好的利用碎片化时间</div>
    <div class="last">完成期末复习</div>
    <el-button @click="begin">开始刷题</el-button>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Welcome",
  methods: {
    begin () {
      this.$router.push({
        path: '/detail',
        query: {
          idx: 1
        }
      })
    }
  },
  mounted() {
    let recordIdx = localStorage.getItem('idx')
    if (recordIdx != null || recordIdx != undefined) return
  }
}
</script>

<style scoped>
  #welcome{
    text-align: center;
  }
  img{
    margin-top: 60px;
    width: 96px;
    height: 96px;
    margin-bottom: 80px;
  }
  div{
    margin:10px 0;
  }
  .small_size{
    font-size: 10px;
    color: #99a6b2;
  }
  .normal_size{
    font-size: 13px;
    color: skyblue;
  }
  .bigger_size{
    font-size: 16px;
    color: blue;
  }
  .large_size{
    font-size: 20px;
    color: #e30631;
  }
  .last{
    color: black;
  }
  .el-button{
    margin-top:calc(100vh - calc(100vh - 20vh));
  }
</style>