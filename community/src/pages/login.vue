<template>
  <div class="wrapper">
    <h1>登录</h1>
    <div class="input">
      <template>
        <el-select v-model="user.type" placeholder="请选择" style="width:300px;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </template>
    </div>
    <div class="input">
      <el-input v-model="user.name" placeholder="请输入账号"></el-input>
    </div>
    <div class="input" style="margin-bottom:10px;">
      <el-input v-model="user.pass" placeholder="请输入密码" show-password></el-input>
    </div>
    <el-button @click="login">登录</el-button>
  </div>
</template>
  </div>
</div>
</template>
<script type='text/ecmascript-6'>
import API from "../common/API";
import qs from "qs";
export default {
  components: {},
  props: {},
  data() {
    return {
      options: [
        {
          value: "0",
          label: "超级管理员"
        },
        {
          value: "1",
          label: "普通管理员"
        }
      ],
      value: "",
      user:{
          name:'',
          type:'',
          pass:''
        }
    };
  },
  watch: {},
  computed: {},
  methods: {
    login() {
      console.log(12);

      this.$axios({
        url: API.login,
        method: "post",
        data: qs.stringify(this.user)
      }).then(res => {
        console.log(res);
        if(res.data.isok){
          localStorage.setItem('isAdmin',res.data.type);
          localStorage.setItem('username',this.user.name);
          this.$router.push('/index');
        }else{
          alert(res.data.info)
        }
      });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.wrapper {
  height: 300px;
  width: 400px;
  margin: 150px auto;
  background-color: rgb(209, 214, 214);
  text-align: center;
  border-radius: 30px;
  padding: 0 50px;
  box-sizing: border-box;
}
h1 {
  font-size: 40px;
  font-weight: normal;
  color: rgb(131, 133, 134);
}
.input {
  margin-top: 20px;
}
</style>