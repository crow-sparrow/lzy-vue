<template>
  <div class="wrapper center">
    <p class="tit">{{$route.name}}</p>
    <el-tabs v-model="activeName" @tab-click="handleClick" style="padding:0 40px">
      <el-tab-pane label="维修" name="first">
        <f-station></f-station>
      </el-tab-pane>
      <el-tab-pane label="维修评论" name="second">
        <f-comment></f-comment>
      </el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>
<script type='text/ecmascript-6'>
import fStation from '../views/fStation'
import fComment from '../views/fComment'
export default {
  components: {
    fStation,
    fComment
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