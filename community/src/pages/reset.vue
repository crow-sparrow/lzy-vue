<template>
  <div class="wrapper center">
    <p class="tit">{{$route.name}}</p>
    <div class="table center">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item prop="name" label="账号">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item prop="oldpass" label="原始密码">
          <el-input v-model="form.oldpass" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="newpass" label="新密码">
          <el-input v-model="form.newpass" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="newpass2" label="确认密码">
          <el-input v-model="form.newpass2" type="password"></el-input>
        </el-form-item>
        <el-button type="warning" @click="reset">修改</el-button>
      </el-form>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
import API from "../common/API";
export default {
  components: {},
  props: {},
  data() {
    var checkNull = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("此为必填项"));
        this.check = true;
      }
    };
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.newpass !== '') {
            this.$refs.form.validateField('newpass2');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.newpass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
    return {
      form: {
        name: localStorage.getItem("username"),
        oldpass: "",
        newpass: "",
        newpass2: ""
      },
      rules: {
        oldpass: [{ validator: checkNull, trigger: "blur" }],
        newpass: [{ validator: validatePass, trigger: "blur" }],
        newpass2: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    reset() {
      if (this.form.newpass == this.form.newpass2) {
        this.$axios({
          url: API.changePassManage,
          method: "post",
          data: this.form
        }).then(res => {
          alert(res.data.info);
          this.$router.push("/index");
        });
      } else {
        alert("两次密码不一致，请重新输入");
      }
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