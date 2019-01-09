<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img">
      <!-- 新图片进入 -->
        <transition name="slide-trans">
          <img v-if="isShow" :src="slides[nowIndex].src">
        </transition>
        <!-- 老图片移除 -->
    <transition name="slide-trans-old">
          <img v-if="!isShow" :src="slides[nowIndex].src">
        </transition>
    </div>
    <ul class="slide-pages">
      <li @click="goto(prevIndex)">&lt;</li>
      <li v-for="(item, index) in slides"
      @click="goto(index)"
      >
        <a :class="{active: index === nowIndex}">{{ index + 1 }}</a>
      </li>
      <li @click="goto(nextIndex)">&gt;</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      nowIndex: 0,
      isShow: true
    }
  },
  computed: {
    prevIndex () {
      // 首先定义 nowIndex 为 0，所以初始化的时候，显示的是第一张图片。
      if (this.nowIndex === 0) {  
        return this.slides.length - 1
        // console.log(this.slides.length - 1);
      }
      else {
        // 返回
        return this.nowIndex - 1     
      }
    },
    /* 如果 nowIndex 为 0，那么现在应该显示的最后一张图片。
    代码中 this.slides.length - 1 ，不然就是 减1. 上一张图片。点击 next 同理： */
    nextIndex () {
      if (this.nowIndex === this.slides.length - 1) {
        return 0
      }
      else {
        return this.nowIndex + 1
      }
    }
  },
  methods: {
    goto (index) {
      this.isShow = false
      // 加一个定时器 制作一个假象 快速的让图片显示 并且改变索引
      setTimeout(() => {
        this.isShow = true
        this.nowIndex = index
      }, 10)
    },
    // 定时器自动播放
    runInv () {
      this.invId = setInterval(() => {
        this.goto(this.nextIndex)
      }, 2000)
    },
    // 停止播放
    clearInv () {
      clearInterval(this.invId)
    }
  },
    mounted () {
    this.runInv();
    }
}
</script>

<style scoped>
/* v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，
                   在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，
                   延迟和曲线函数。 
                   
 可以设置不同的进入和离开动画
 设置持续时间和动画函数 
                   */
.slide-trans-enter-active {
  transition: all .5s;
}
/* v-enter：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。 */
.slide-trans-enter {
  /* translateX(x)  定义转换，只是用 X 轴的值。
   大小需要和 show-img 外框的大小一致 */
  transform: translateX(700px); 
}
.slide-trans-old-leave-active{
  transition: all .5s;
  transform: translateX(-700px);  
}
.slide-show {
  position: relative;
  margin: 0 auto;
  width: 700px;
  height: 400px;
  overflow: hidden;
  border: 3px solid #333;
}
.slide-show h2 {
  position: absolute;
  width: 100%;
  color: #fff;
  background: #000;
  opacity: .5;
  bottom: 0;
  margin: 0;
  height: 32px;
  padding-left: 15px;
}
.slide-img {
  width: 100%;
}
.slide-img img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}
.slide-pages {
  position: absolute;
  bottom: 0;
  margin-bottom: 5px;
  margin-left: 30%
}
.slide-pages li {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
}
.slide-pages li .active {
  color:black;
}
</style>
