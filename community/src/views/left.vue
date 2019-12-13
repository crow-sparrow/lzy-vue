<template>
  <div class="left">
    <div
      class="list"
      is="router-link"
      to="/index/manage"
      active-class="select"
      v-if="power=='0'"
    >管理员管理</div>
    
    <div v-else>
      <div class="list" is="router-link" to='/index/banner' active-class="select" >banner管理</div>
      <div class="list" is="router-link" to='/index/teacher' active-class="select">家教管理</div>
      <div class="list" is="router-link" to='/index/water' active-class="select">水站管理</div>
      <div class="list" is="router-link" to='/index/fix' active-class="select">维修管理</div>
      <div class="list" is="router-link" to='/index/clean' active-class="select">家政管理</div>
      <div class="list" is="router-link" to='/index/reset' active-class="select">修改密码</div>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
export default {
  components: {},
  props: {},
  data() {
    return {
      power: ""
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {
    var power = localStorage.getItem("isAdmin");
    this.power = power
  }
};
</script>
<style scoped>
.left {
  width: 150px;
  background-color: rgb(94, 91, 91);
}
.left .list {
  display: block;
  text-align: center;
  width: 100%;
  margin-top: 10px;
  height: 40px;
  line-height: 40px;
  color: white;
  background-color: rgb(94, 91, 91);
}
.select {
  background-color: black;
}
</style>