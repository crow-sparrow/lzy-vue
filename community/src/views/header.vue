<template>
  <div class="header">
    <h1>后台管理系统</h1>
    <p>欢迎您，{{name}}</p>
    <el-link type="danger" @click="out">退出登录</el-link>
  </div>
</template>
<script type='text/ecmascript-6'>
import API from "../common/API";
export default {
  components: {},
  props: {},
  data() {
    return {
      name: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    out() {
      this.$alert("确定要退出登录吗？", "提示", {
        confirmButtonText: "确定",
        callback: action => {
          localStorage.removeItem('isAdmin');
          localStorage.removeItem('username');
          // localStorage.setItem('isLogin','false')
          this.$axios({
            url: API.exit,
            method: "get"
          }).then(res => {
            this.$message({
              type: "info",
              message: `退出成功`
            });
            this.$router.replace('/login')
          });
        }
      });
    }
  },
  created() {},
  mounted() {
    this.name = localStorage.getItem("username");
  }
};
</script>
<style scoped>
.header {
  height: 100px;
  background-color: rgb(14, 13, 13);
  color: white;
  text-align: center;
}
.header h1 {
  font-size: 30px;
  margin-top: 10px;
}
</style>