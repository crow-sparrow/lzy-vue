<template>
  <div class="wrapper">
    <div>
      <el-button round @click="showAdd()">添加</el-button>
      <el-dialog title="添加人员" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules">
          <el-form-item prop="name" label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="age" label="年龄" :label-width="formLabelWidth">
            <el-input v-model.number="form.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="tel" label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.tel" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item prop="qualification" label="资格认证" :label-width="formLabelWidth">
            <el-checkbox-group v-model="form.qualification">
              <el-checkbox
                v-for="item in qualification"
                :key="item"
                :label="item"
                :value="item"
                name="qualification"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item prop="type" label="服务项目" :label-width="formLabelWidth">
            <el-checkbox-group v-model="form.type">
              <el-checkbox v-for="item in type" :key="item" :label="item" :value="item" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item prop="edu" label="学历" :label-width="formLabelWidth">
            <el-select v-model="form.edu" placeholder="请选择" style="width:100%;">
              <el-option label="小学" value="小学"></el-option>
              <el-option label="初中" value="初中"></el-option>
              <el-option label="高中" value="高中"></el-option>
              <el-option label="本科" value="本科"></el-option>
              <el-option label="研究生" value="研究生"></el-option>
              <el-option label="博士" value="博士"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="year" label="工作年限" :label-width="formLabelWidth">
            <el-input v-model.number="form.year" autocomplete="off" type="number"></el-input>
          </el-form-item>
          <el-form-item prop="vNum" label="级别" :label-width="formLabelWidth">
            <el-input v-model="form.vNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="price" label="价格" :label-width="formLabelWidth">
            <el-input v-model="form.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="city" label="城市" :label-width="formLabelWidth">
            <el-input v-model="form.city" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="experience" label="经验" :label-width="formLabelWidth">
            <el-input v-model="form.experience" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="likeNum" label="点赞数量" :label-width="formLabelWidth">
            <el-input v-model.number="form.likeNum" autocomplete="off" type="number"></el-input>
          </el-form-item>
          <el-form-item prop="readNum" label="关注人数" :label-width="formLabelWidth">
            <el-input v-model="form.readNum" autocomplete="off" type="number"></el-input>
          </el-form-item>
          <el-form-item prop="len" label="距离" :label-width="formLabelWidth">
            <el-input v-model.number="form.len" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="info" label="自我评价" :label-width="formLabelWidth">
            <el-input v-model="form.info" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="img" label="免冠照片" :label-width="formLabelWidth">
            <el-input v-model="form.img" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addHomeWorker" v-if="show==''">确 定</el-button>
          <el-button type="primary" @click="updateHomeWorker" v-else>修 改</el-button>
        </div>
      </el-dialog>
    </div>
    <el-select v-model="value" placeholder="全部">
      <el-option label="全部" value @click.native="find"></el-option>
      <el-option
        v-for="item in type"
        :key="item"
        :label="item"
        :value="item"
        @click.native="findHomeWorker(item)"
      ></el-option>
    </el-select>
    <div class="table" style="padding:0 35px;margin-top:20px;">
      <el-table :data="workers" style="width:100% " max-height="350">
        <el-table-column type="index" :index="indexMethod" width="80" label="序号"></el-table-column>
        <el-table-column prop="name" label="名称" width="140"></el-table-column>
        <el-table-column prop="tel" label="电话" width="140"></el-table-column>
        <el-table-column prop="price" label="价格" width="140"></el-table-column>
        <el-table-column prop="age" label="年龄" width="140"></el-table-column>
        <el-table-column prop="edu" label="学历" width="140"></el-table-column>
        <el-table-column prop="type" label="服务类型" width="140"></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="info" icon="el-icon-edit" circle @click="showFind(scope.row.id)"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="delHomeWorker(scope.row.id)"
            ></el-button>
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
          callback(new Error("不能为负"));
        } else {
          this.check = false;
        }
      }, 1000);
    };
    var checkAge2 = (rule, value, callback) => {
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
        } else if (value < 0 || value > 150) {
          callback(new Error("请输入正确的年龄"));
        } else {
          this.check = false;
        }
      }, 1000);
    };
    var checkNull = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("此为必填项"));
        this.check = true;
      }
    };
    var checkTel = (rule, value, callback) => {
      if (!RE.telRe2(value)) {
        return callback(new Error("请填写正确的手机号码"));
        this.check = true;
      }
    };
    var checkPrice = (rule, value, callback) => {
      if (!RE.price2(value)) {
        return callback(new Error("请填写正确的价格格式"));
        this.check = true;
      }
    };
    var checkExp = (rule, value, callback) => {
      if (!RE.experience(value)) {
        return callback(new Error("请填写正确的价格格式"));
        this.check = true;
      }
    };
    return {
      show: "",
      form: {
        img: "",
        id: "",
        city: "",
        age: "",
        experience: "",
        info: "",
        len: "",
        likeNum: "",
        name: "",
        qualification: [],
        price: "",
        tel: "",
        type: [],
        readNum: "",
        year: "",
        vNum: "",
        edu: "小学"
      },
      rules: {
        img: [{ required: true, validator: checkNull, trigger: "blur" }],
        name: [{ validator: checkNull, trigger: "blur" }],
        info: [{ validator: checkNull, trigger: "blur" }],
        likeNum: [{ validator: checkAge, trigger: "blur" }],
        vNum: [{ validator: checkAge, trigger: "blur" }],
        edu: [
          {
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        year: [{ validator: checkAge, trigger: "blur" }],
        type: [
          {
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        price: [{ validator: checkPrice, trigger: "blur" }],
        // type: [{ validator: checkNull, trigger: "change" }],
        len: [{ validator: checkAge, trigger: "blur" }],
        experience: [{ validator: checkExp, trigger: "blur" }],
        qualification: [
          {
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        age: [{ validator: checkAge2, trigger: "blur" }],
        city: [{ validator: checkNull, trigger: "blur" }],
        tel: [{ validator: checkTel, trigger: "blur" }],
        readNum: [{ validator: checkAge, trigger: "blur" }]
      },
      dialogFormVisible: false,
      formLabelWidth: "80px",
      qualification: [],
      type: [],
      fStation: [],
      workers: [],
      value: "",
      type2: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    showAdd() {
      this.dialogFormVisible = true;
      this.form = {
        img: "",
        id: "",
        city: "",
        age: "",
        experience: "",
        info: "",
        len: "",
        likeNum: "",
        name: "",
        qualification: [],
        price: "",
        tel: "",
        type: [],
        readNum: "",
        year: "",
        vNum: "",
        edu: "小学"
      };
    },
    indexMethod(index) {
      return index + 1;
    },
    addHomeWorker() {
      // console.log(this.form.type);
      // console.log(this.form);
      // if(this.form.)
      this.$axios({
        url: API.addHomeWorker,
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
    find() {
      this.$axios({
        url: API.findHomeWorker,
        method: "get"
      }).then(res => {
        var arr = res.data.data;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].type.includes("[")) {
            arr[i].type = JSON.parse(arr[i].type);
          } else {
            arr[i].type = arr[i].type.split(",");
          }
          if (arr[i].qualification.includes("[")) {
            arr[i].qualification = JSON.parse(arr[i].qualification);
          } else {
            arr[i].qualification = arr[i].qualification.split(",");
          }
          arr[i].type = arr[i].type.join(",");
          arr[i].qualification = arr[i].qualification.join(",");
        }
        // console.log(arr[2].type);
        this.workers = arr;
        // console.log(this.workers);
      });
    },
    indexMethod(index) {
      return index + 1;
    },
    showFind(id) {
      this.dialogFormVisible = true;
      this.show = id;
      this.$axios({
        url: API.findHomeWorker,
        method: "get",
        params: {
          id: id
        }
      }).then(res => {
        this.form = res.data.data[0];
        if (this.form.type.includes("[")) {
          this.form.type = JSON.parse(this.form.type);
        } else {
          this.form.type = this.form.type.split(",");
        }
        if (this.form.qualification.includes("[")) {
          this.form.qualification = JSON.parse(this.form.qualification);
        } else {
          this.form.qualification = this.form.qualification.split(",");
        }
      });
    },
    findHomeWorker(type) {
      // console.log("123");
      this.$axios({
        url: API.findHomeWorker,
        method: "get",
        params: {
          type: type
        }
      }).then(res => {
        console.log(res);
        this.workers = res.data.data;
      });
    },
    indexMethod(index) {
      return index + 1;
    },
    updateHomeWorker() {
      this.$axios({
        url: API.updateHomeWorker,
        method: "get",
        params: this.form
      }).then(res => {
        // console.log(res);
        this.find();
        this.dialogFormVisible = false;
      });
    },

    delHomeWorker(id, repairId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: API.delHomeWorker,
            method: "get",
            params: {
              id: id
            }
          }).then(res => {
            this.find();
            // console.log(res);
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
    this.$axios({
      url: API.getQualification,
      method: "get"
    }).then(res => {
      this.qualification = res.data.qualification;
    });
    this.$axios({
      url: API.getHomeType,
      method: "get"
    }).then(res => {
      this.type = res.data.type;
    });
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.wrapper {
}
</style>