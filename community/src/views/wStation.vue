<template>
  <div class="wrapper">
    <el-button round @click="showAdd()">添加</el-button>
    <el-dialog title="添加水站" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item prop="name" label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="score" label="评分" :label-width="formLabelWidth">
          <el-input v-model.number="form.score" autocomplete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item prop="count" label="月销售量" :label-width="formLabelWidth">
          <el-input v-model.lazy="form.count" autocomplete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item prop="likeNum" label="点赞数量" :label-width="formLabelWidth">
          <el-input v-model.number="form.likeNum" autocomplete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item prop="readNum" label="浏览量" :label-width="formLabelWidth">
          <el-input v-model.number="form.readNum" autocomplete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item prop="address" label="商家地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="len" label="距离" :label-width="formLabelWidth">
          <el-input v-model.number="form.len" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="des" label="商家信息" :label-width="formLabelWidth">
          <el-input v-model="form.des" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="tel" label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="price" label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off" placeholder='元/桶'></el-input>
        </el-form-item>
        <el-form-item prop="img" label="图片地址" :label-width="formLabelWidth">
          <el-input v-model="form.img" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addWater" v-if="show==''">确 定</el-button>
        <el-button type="primary" @click="updateWater" v-else>修 改</el-button>
      </div>
    </el-dialog>
    <div class="table" style="padding:0 45px;margin-top:20px;">
      <el-table :data="wStation" style="width:100% " max-height="350">
        <el-table-column type="index" :index="indexMethod" width="180" label="序号"></el-table-column>
        <el-table-column prop="name" label="水站名称" width="220"></el-table-column>
        <el-table-column prop="tel" label="电话" width="220"></el-table-column>
        <el-table-column prop="price" label="价格" width="220"></el-table-column>

        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="info" icon="el-icon-edit" circle @click="showFind(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="delWater(scope.row.id)"></el-button>
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
    var checkNull = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("此为必填项"));
        this.check = true;
      }
    };
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
          callback(new Error("不能为负"));
        } else {
          this.check = false;
        }
      }, 1000);
    };
    var checkPrice = (rule, value, callback) => {
      if (!RE.price1(value)) {
        return callback(new Error("请输入正确的价格格式"));
        this.check = true;
      } else {
        this.check = false;
      }
    };
    return {
      dialogFormVisible: false,
      form: {
        img: "",
        name: "",
        count: "",
        likeNum: "",
        readNum: "",
        address: "",
        score: "",
        price: "",
        tel: "",
        des: "",
        len: "",
        id: ""
      },
      rules: {
        img: [{ validator: checkNull, trigger: "blur" }],
        name: [{ validator: checkNull, trigger: "blur" }],
        count: [{ validator: checkAge, trigger: "blur" }],
        likeNum: [{ validator: checkAge, trigger: "blur" }],
        des: [{ validator: checkNull, trigger: "blur" }],
        score: [{ validator: checkScore, trigger: "blur" }],
        price: [{ validator: checkPrice, trigger: "blur" }],
        len: [{ validator: checkAge, trigger: "blur" }],
        address: [{ validator: checkNull, trigger: "blur" }],
        tel: [{ validator: checkTel, trigger: "blur" }],
        readNum: [{ validator: checkAge, trigger: "blur" }]
      },
      show: "",
      formLabelWidth: "70px",
      wStation: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    showAdd() {
      this.dialogFormVisible = true;
      this.form = {};
    },
    indexMethod(index) {
      return index + 1;
    },
    find() {
      this.$axios({
        url: API.findWater,
        method: "get"
      }).then(res => {
        console.log(res);

        this.wStation = res.data.data;
      });
    },
    showFind(id) {
      this.dialogFormVisible = true;
      this.show = id;
      this.$axios({
        url: API.findWater,
        method: "get",
        params: {
          id: id
        }
      }).then(res => {
        console.log(res);
        this.form = res.data.data[0];
      });
    },
    addWater() {
      this.$axios({
        url: API.addWater,
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
    delWater(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: API.delWater,
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
    updateWater() {
      this.$axios({
        url: API.updateWater,
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