<template>
  <div class="wrapper">
    <el-button round @click="showAdd()">添加</el-button>
    <el-dialog title="添加家教类型" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="img" label="图片地址" :label-width="formLabelWidth">
          <el-input v-model="form.img" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="type" label="类型" :label-width="formLabelWidth">
          <el-input v-model="form.type" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBanner">确 定</el-button>
      </div>
    </el-dialog>
    <div class="table" style="padding:0 155px;margin-top:20px;">
      <el-table :data="tBanner" style="width:100% " max-height="400">
        <el-table-column type="index" :index="indexMethod" width="180" label="序号"></el-table-column>
        <el-table-column prop="img" label="图片" width="240">
          <template slot-scope="scope">
            <img :src="scope.row.img" style="height:100px" />
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="220"></el-table-column>

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
      } else {
        this.check = false;
      }
    };
    return {
      dialogFormVisible: false,
      form: {
        img: "",
        type: "",
        id: ""
      },
      rules: {
        img: [{ validator: checkNull, trigger: "blur" }],
        type: [{ validator: checkNull, trigger: "blur" }],
      },
      formLabelWidth: "70px",
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
        url: API.teacherType,
        method: "get"
      }).then(res => {
        console.log(res);

        this.tBanner = res.data.data;
      });
    },
    addBanner() {
      this.$axios({
        url: API.addTeacherType ,
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
    delTBanner(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: API.delTeacherType ,
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