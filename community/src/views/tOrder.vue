<template>
  <div class="wrapper">
    <el-button round @click="showAdd()">添加</el-button>
    <el-dialog title="添加家教排行" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="img" label="图片地址" :label-width="formLabelWidth">
          <el-input v-model="form.img" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="teacherImg" label="机构图片" :label-width="formLabelWidth">
          <el-input v-model="form.teacherImg" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="num" label="报名人数" :label-width="formLabelWidth">
          <el-input v-model.number="form.num" autocomplete="off" min="0"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBanner">确 定</el-button>
      </div>
    </el-dialog>
    <div class="table" style="padding:0 35px;margin-top:20px;">
      <el-table :data="tBanner" style="width:100% " max-height="400">
        <el-table-column type="index" :index="indexMethod" width="180" label="序号"></el-table-column>
        <el-table-column prop="img" label="图片" width="240">
          <template slot-scope="scope">
            <img :src="scope.row.img" style="height:100px" />
          </template>
        </el-table-column>
        <el-table-column prop="num" label="报名人数" width="220"></el-table-column>
        <el-table-column prop="teacherImg" label="授课机构" width="240">
          <template slot-scope="scope">
            <img :src="scope.row.img" style="height:100px" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" circle @click="delTBanner(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
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
    return {
      dialogFormVisible: false,
      form: {
        img: "",
        num: "",
        id: "",
        teacherImg: ""
      },
      rules: {
        num: [{ validator: checkAge, trigger: "blur" }],
        teacherImg: [{ validator: checkNull, trigger: "blur" }],
        img: [{ validator: checkNull, trigger: "blur" }]
      },
      formLabelWidth: "80px",
      tBanner: []
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
        url: API.teacherTop,
        method: "get"
      }).then(res => {
        console.log(res);

        this.tBanner = res.data.data;
      });
    },
    addBanner() {
      this.$axios({
        url: API.addTeacherTop,
        method: "get",
        params: this.form
      }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          alert(res.data.info);
          this.find();
          this.dialogFormVisible = false;
        } else {
          alert(res.data.info);
        }
      });
    },
    delTBanner(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: API.delTeacherTop,
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