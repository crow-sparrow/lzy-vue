<template>
  <div class="wrapper center">
    <p class="tit">{{$route.name}}</p>
    <el-tabs v-model="activeName" @tab-click="handleClick" style="padding:0 40px">
      <el-tab-pane label="家教图片" name="first">
        <t-img></t-img>
      </el-tab-pane>
      <el-tab-pane label="家教类型" name="second">
        <t-type></t-type>
      </el-tab-pane>
      <el-tab-pane label="家教排行" name="third">
        <t-order></t-order>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script type='text/ecmascript-6'>
import tOrder from "../views/tOrder";
import tImg from "../views/tImg";
import tType from "../views/tType";
export default {
  components: {
    tOrder,
    tType,
    tImg
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