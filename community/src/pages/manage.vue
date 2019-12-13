<template>
  <div class="manage center">
    <p class="tit">{{$route.name}}</p>
    <el-button round @click="showAdd()">添加</el-button>

    <el-dialog title="添加/修改管理员" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="name" label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" :disabled="isD"></el-input>
        </el-form-item>
        <el-form-item prop="pass" label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.pass" autocomplete="off" type="password" :disabled="isD"></el-input>
        </el-form-item>
        <el-form-item prop="pass2" label="确认密码" :label-width="formLabelWidth" v-if="show==''">
          <el-input v-model="form.pass2" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="des" label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.des" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="time" label="时间" :label-width="formLabelWidth">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.time"
            autocomplete="off"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addManage" v-if="show==''">确 定</el-button>
        <el-button type="primary" @click="updataManage" v-else>修 改</el-button>
      </div>
    </el-dialog>
    <div class="table">
      <el-table :data="manages" style="width:100% " max-height="350">
        <el-table-column type="index" :index="indexMethod" width="180" label="序号"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="des" label="属性" width="180"></el-table-column>
        <el-table-column prop="time" label="时间" width="180">
          <template slot-scope="scope">{{scope.row.time|timeFilter}}</template>
        </el-table-column>

        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="info" icon="el-icon-edit" circle @click="showFind(scope.row)"></el-button>
            <el-button
              type="danger"
              @click="del(scope.$index, scope.row)"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
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
    var checkNull = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("此为必填项"));
        this.check = true;
      }
    };
    return {
      check:false,
      manages: [],
      dialogFormVisible: false,
      form: {
        name: "",
        pass: "",
        pass2: "",
        des: "",
        time: ""
      },
      updata: {
        des: "",
        time: ""
      },
      rules: {
        name: [{ validator: checkNull, trigger: "blur" }],
        pass: [{ validator: checkNull, trigger: "blur" }],
        pass2: [{ validator: checkNull, trigger: "blur" }],
        time: [{ validator: checkNull, trigger: "blur" }],
        des: [{ validator: checkNull, trigger: "blur" }]
      },
      formLabelWidth: "70px",
      visible: false,
      show: "",
      isD: true
    };
  },
  watch: {},
  computed: {},
  methods: {
    showFind(row) {
      this.dialogFormVisible = true;
      this.show = row.id;
      this.isD = true;
      this.$axios({
        url: API.findManage,
        method: "post",
        data: {
          id: row.id
        }
      }).then(res => {
        console.log(res);
        this.form = res.data.data[0];
        this.form.time = new Date(Number(res.data.data[0].time));
        console.log(this.form.time);
      });
    },
    showAdd() {
      this.dialogFormVisible = true;
      this.show = "";
      this.isD = false;
      this.form = {};
    },
    addManage() {
      console.log("123");

      if (this.form.pass == this.form.pass2 && this.form.time) {
        this.$axios({
          url: API.addManage,
          method: "post",
          data: {
            name: this.form.name,
            pass: this.form.pass,
            des: this.form.des,
            time: this.form.time.getTime()
          }
        }).then(res => {
          console.log(res);
          this.find();
          if (res.data.isok) {
            alert(res.data.info);
            this.dialogFormVisible = false;
          } else {
            alert(res.data.info);
          }
        });
      } else if (this.form.pass != this.form.pass2) {
        alert("两次密码不一致");
      } else if (!this.form.time) {
        alert("时间不能为空");
      }
    },
    indexMethod(index) {
      return index + 1;
    },
    find() {
      this.$axios({
        url: API.findManage,
        method: "post"
      }).then(res => {
        // console.log(res);

        if (res.data.code == -1) {
          alert(res.data.info);
        } else {
          this.manages = res.data.data;
        }
      });
    },
    del(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: API.delManage,
            method: "post",
            data: {
              id: row.id
            }
          }).then(res => {
            console.log(res);
            this.find();
          });
          console.log(row);

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
    updataManage() {
      this.$axios({
        url: API.updateManage,
        method: "post",
        data: {
          time: this.form.time.getTime(),
          des: this.form.des,
          id: this.form.id
        }
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

.manage {
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
  overflow: hidden;
}
</style>