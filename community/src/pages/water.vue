<template>
  <div class="wrapper center">
    <p class="tit">{{$route.name}}</p>
    <el-tabs v-model="activeName" @tab-click="handleClick" style="padding:0 40px">
      <el-tab-pane label="水站" name="first">
        <w-station></w-station>
      </el-tab-pane>
      <el-tab-pane label="水站评论" name="second">
        <w-comment></w-comment>
      </el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>
<script type='text/ecmascript-6'>
import wStation from '../views/wStation'
import wComment from '../views/wComment'
export default {
  components: {
    wStation,
    wComment
  },
  props: {},
  data() {
    return {
      activeName: "first"
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleClick(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../stylus/index.styl';

.wrapper {
}
</style>