<template>
  <div class="index-wrap">
    <slide-show :slides="slides"></slide-show>
  </div>
</template>

<script>
import slideShow from './components/slideShow'
export default {
  components: {
    slideShow
  },
  /* 

            Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡

                    条件渲染 (使用 v-if)
                    条件展示 (使用 v-show)
                    动态组件
                    组件根节点

        
       轮播图中，它显示的那张图片在浏览器中可以看到有dom元素。隐藏的是没有dom元素的。所以如果显示一张图片，实际上，
       轮播列表中只有一个元素是存在的，其他的都被删掉了。按照这个思路，就很简单了。
       想要轮播，设置：enter：右边→enter-to：正常位置，并且过渡完成→leave：正常位置→leave-to：左边，并且过渡完成。
                  
            方法1.直接将图片引入为模块
                require img from "../assets/test.png"
            方法2.将img放在数据里
                data(){
                    return {
                    img:require("../assets/test.png")
                }
              }

  */
  data () {
    return {
      slides: [
        {
          src: require('./assets/6.jpg'),
          title: 'xxx1',
        },
        {
          src: require('./assets/7.jpg'),
          title: 'xxx2',
        },
        {
          src: require('./assets/8.jpg'),
          title: 'xxx3',
        },
        {
          src: require('./assets/9.jpg'),
          title: 'xxx4',
        },
        {
          src: require('./assets/11.jpg'),
          title: 'xxx5',
        },
      ]
    }
  }
}
</script>

<style scoped>
  .index-wrap {
    overflow: hidden;
}
</style>
