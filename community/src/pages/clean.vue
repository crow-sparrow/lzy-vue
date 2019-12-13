<template>
  <div class="wrapper center">
    <p class="tit">{{$route.name}}</p>
    <el-tabs v-model="activeName" @tab-click="handleClick" style="padding:0 40px">
      <el-tab-pane label="家政轮播图" name="first">
        <c-banner></c-banner>
      </el-tab-pane>
      <el-tab-pane label="人员管理" name="second">
        <c-worker></c-worker>
      </el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>
<script type='text/ecmascript-6'>
import cBanner from '../views/cBanner'
import cWorker from '../views/cWorker'
export default {
  components: {
    cBanner,
    cWorker
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