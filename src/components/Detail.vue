<template>
  <div id="main">
      <div id="progress">
        <div class="left"><span></span>病生人卫</div>
        <div class="right">
          <span class="current">{{this.idx}}</span>/
          <span class="totalNum">{{totalNum}}</span>
        </div>
      </div>

      <div id="body">
        <div id="question">
          {{question}}
        </div>
        <div class="select" :class="{active: AActive, error: AError}" id="A" @click="selected">{{A}}</div>
        <div class="select" :class="{active: BActive, error: BError}" id="B" @click="selected">{{B}}</div>
        <div class="select" :class="{active: CActive, error: CError}" id="C" @click="selected">{{C}}</div>
        <div class="select" :class="{active: DActive, error: DError}" id="D" @click="selected">{{D}}</div>
        <div class="select" :class="{active: EActive, error: EError}" id="E" @click="selected">{{E}}</div>
<!--        <div id="tips" ref="tips"></div>-->
      </div>

      <div id="operate">
        <el-button @click="previous">上一题</el-button>
        <el-button @click="next">下一题</el-button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Detail",
  data() {
    return {
      idx: this.$route.query.idx,
      question: "",
      A: "",
      B: "",
      C: "",
      D: "",
      E: "",
      ans: "",
      AActive: false,
      BActive: false,
      CActive: false,
      DActive: false,
      EActive: false,
      AError: false,
      BError: false,
      CError: false,
      DError: false,
      EError: false,
      totalNum: 0
    }
  },
  methods: {
    next() {
      if (this.idx >= this.totalNum) {
        this.$message({
          message: 'Congratulations,你完成了所有的题目',
          type: 'success'
        });
        return;
      }
      this.idx = parseInt(this.idx) + 1
      this.getData(this.idx)
    },
    previous() {
      if (this.idx <= 1) {
        this.$message.error('前面没有了呢');
        return
      }
      this.idx = parseInt(this.idx) - 1
      this.getData(this.idx)
    },
    getData(idx = 1) {
      this.clear()
      localStorage.setItem('recordIdx', idx)
      axios.get(`http://www.api.waheng.fun/lxy_exam/getBsrw.php?id=${idx}`).then(
          response => {
            let {status} = response
            if (status == 404) alert('似乎出了点问题，请联系我')
            else {
              let {data:{que, A, B, C, D, E, ans, totalNum}} = response
              // console.log(response.data)
              this.question = que
              this.A = A
              this.B = B
              this.C = C
              this.D = D
              this.E = E
              this.ans = ans.trim()
              this.totalNum = totalNum
              // console.log(window.location)
              // 不跳转路由，改变url，目的：方便李星雨复制链接给别人
              history.replaceState(null, null, window.location.href.split('=')[0] + `=${idx}`)
            }
          },
          error => {
            console.log(error.message)
            alert('似乎出了点大问题，请联系我')
          }
      )
    },
    selected(e) {
      this.clear()
      let id = e.target.id

      if (id === this.ans.substr(this.ans.indexOf('.') + 1)) {
        if(id == 'A') this.AActive = true
        else if (id == "B") this.BActive = true
        else if (id == "C") this.CActive = true
        else if (id == "D") this.DActive = true
        else if (id == "E") this.EActive = true
        this.$message({
          message: '答对了，继续努力~',
          type: 'success',
          duration: 800
        });
      }else{
        if(id == 'A') this.AError = true
        else if (id == "B") this.BError = true
        else if (id == "C") this.CError = true
        else if (id == "D") this.DError = true
        else if (id == "E") this.EError = true
        this.$message({
          message: '选错了哦，再仔细看看~',
          type: 'error',
          duration: 800
        })
      }
    },
    clear(){
      this.AActive = false
      this.BActive = false
      this.CActive = false
      this.DActive = false
      this.EActive = false
      this.AError = false
      this.BError = false
      this.CError = false
      this.DError = false
      this.EError = false
    }
  },
  mounted() {
    this.getData(this.idx)
  }
}
</script>

<style scoped lang="less">
  #main{
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    //background-color: #f8f7f8;
    #progress{
      display: flex;
      height: 40px;
      justify-content: space-between;
      align-items: center;
      padding: 5px 10px;
      background-color: white;
      .left{
        display: flex;
        align-items: center;
        color: #00b8fc;
        font-weight: 700;
        span{
          display: inline-block;
          width: 3px;
          height: 18px;
          margin-right:10px;
          background-color: #00b8fc;
        }
      }
      .right{
        .current{
          color: #00b8fc;
          font-size: 1.6rem;
        }
      }
    }
    #body{
      padding: 10px;
      #question{
        margin-top: 35px;
        margin-bottom: 40px;
      }
      .select{
        margin: 5px 0;
        padding: 20px 10px;
        cursor: pointer;
        border: 1px solid #e4edf1;
        border-radius: 10px;
      }
      .select.active{
        background-color: #00b8fc;
      }
      .select.error{
        color: white;
        background-color: #d05c4e;
      }
    }
    #operate{
      display: flex;
      justify-content: space-between;
      padding: 0 30px;
      margin: 50px 0;
    }
  }
</style>