<template>
  <div class="wrapper">
    <el-button round @click="showAdd()">添加</el-button>
    <el-dialog title="添加维修站" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="name" label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="score" label="评分" :label-width="formLabelWidth">
          <el-input v-model="form.score" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="type" label="维修类型" :label-width="formLabelWidth">
          <el-input v-model.number="form.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="likeNum" label="点赞数量" :label-width="formLabelWidth">
          <el-input v-model.number="form.likeNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="readNum" label="关注人数" :label-width="formLabelWidth">
          <el-input v-model.number="form.readNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="address" label="商家地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="len" label="距离" :label-width="formLabelWidth">
          <el-input v-model.number="form.len" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="info" label="商家信息" :label-width="formLabelWidth">
          <el-input v-model="form.info" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="tel" label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.tel" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRepair" v-if="show==''" :disabled="check">确 定</el-button>
        <el-button type="primary" @click="updateRepair" v-else :disabled="check">修 改</el-button>
      </div>
    </el-dialog>
    <div class="table" style="padding:0 45px;margin-top:20px;">
      <el-table :data="fStation" style="width:100% " max-height="350">
        <el-table-column type="index" :index="indexMethod" width="180" label="序号"></el-table-column>
        <el-table-column prop="name" label="维修站名称" width="220"></el-table-column>
        <el-table-column prop="tel" label="电话" width="220"></el-table-column>
        <el-table-column prop="type" label="类型" width="220"></el-table-column>

        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="info" icon="el-icon-edit" circle @click="showFind(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="delRepair(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
import API from "../common/API";
import RE from "../common/re";
export default {
  components: {},
  props: {},
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
        this.check = true;
      } else {
        this.check = false;
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
          this.check = true;
        } else if (value < 0) {
          callback(new Error('不能为负'))
        } else {
          this.check = false;
        }
      }, 1000);
    };
    var checkNull = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("此为必填项"));
        this.check = true;
      } else {
        this.check = false;
      }
    };
    
    var checkTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("此为必填项"));
        this.check = true;
      } else if (!RE.telRe1(value)) {
        return callback(new Error("电话号码格式不正确"));
        this.check = true;
      } else {
        this.check = false;
      }
    };
    var checkScore = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("此为必填项"));
        this.check = true;
      } else if (value > 5 || value < 0) {
        return callback(new Error("必须在0-5之间"));
        this.check = true;
      } else {
        this.check = false;
      }
    };
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        likeNum: "",
        type: "",
        readNum: "",
        address: "",
        score: "",
        tel: "",
        info: "",
        len: "",
        id: ""
      },
      check: true,
      show: "",
      formLabelWidth: "80px",
      fStation: [],
      rules: {
        likeNum: [{ validator: checkAge, trigger: "blur" }],
        readNum: [{ validator: checkAge, trigger: "blur" }],
        len: [{ validator: checkAge, trigger: "blur" }],
        name: [{ validator: checkNull, trigger: "blur" }],
        address: [{ validator: checkNull, trigger: "blur" }],
        info: [{ validator: checkNull, trigger: "blur" }],
        score: [{ validator: checkScore, trigger: "blur" }],
        tel: [{ validator: checkTel, trigger: "blur" }],
        type: [{ validator: checkNull, trigger: "blur" }]
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    showAdd() {
      this.dialogFormVisible = true;
      this.form = {};
    },
    tel() {
      console.log("1`23");
    },
    indexMethod(index) {
      return index + 1;
    },
    find() {
      this.$axios({
        url: API.findRepair,
        method: "get"
      }).then(res => {
        console.log(res);

        this.fStation = res.data.data;
      });
    },
    showFind(id) {
      this.dialogFormVisible = true;
      this.show = id;
      this.$axios({
        url: API.findRepair,
        method: "get",
        params: {
          id: id
        }
      }).then(res => {
        console.log(res);
        this.form = res.data.data[0];
      });
    },
    addRepair() {
      this.$axios({
        url: API.addRepair,
        method: "get",
        params: this.form
      }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          alert("添加成功");
          this.find();
          this.dialogFormVisible = false;
        } else {
          alert(res.data.info);
        }
      });
    },
    delRepair(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: API.delRepair,
            method: "get",
            params: {
              id: id
            }
          }).then(res => {
            this.find();
            console.log(res);
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    updateRepair() {
      this.$axios({
        url: API.updateRepair,
        method: "get",
        params: this.form
      }).then(res => {
        console.log(res);
        this.find();
        this.dialogFormVisible = false;
      });
    }
  },
  created() {},
  mounted() {
    this.find();
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../stylus/index.styl';

.wrapper {
}
</style>