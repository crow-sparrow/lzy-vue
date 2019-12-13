<template>
  <div class="wrapper">
    <el-select v-model="value" placeholder="全部">
      <el-option label="全部" value @click.native="find"></el-option>
      <el-option
        v-for="item in wStation"
        :key="item.id"
        :label="item.name"
        :value="item.id"
        @click.native="findComment(item.id)"
      ></el-option>
    </el-select>
    <div class="table" style="padding:0 45px;margin-top:20px;">
      <el-table :data="wComment" style="width:100% " max-height="350">
        <el-table-column type="index" :index="indexMethod" width="180" label="序号"></el-table-column>
        <el-table-column prop="name" label="用户名称" width="220"></el-table-column>
        <el-table-column prop="content" label="评论内容" width="220"></el-table-column>
        <el-table-column prop="time" label="时间" width="220">
          <template slot-scope="scope">{{scope.row.time|timeFilter}}</template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" circle @click="delComment(scope.row.id,scope.row.waterId)"></el-button>
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
    return {
      wComment: [],
      wStation: [],
      value: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    find() {
      this.$axios({
        url: API.findComment,
        method: "get"
      }).then(res => {
        console.log(res);
        this.wComment = res.data.data;
      });
    },
    indexMethod(index) {
      return index + 1;
    },
    find2() {
      this.$axios({
        url: API.findWater,
        method: "get"
      }).then(res => {
        console.log(res);
        this.wStation = res.data.data;
      });
    },
    findComment(id) {
      console.log("123");
      this.$axios({
        url: API.findComment,
        method: "get",
        params: {
          waterId: id
        }
      }).then(res => {
        console.log(res);
        this.wComment = res.data.data;
      });
    },
    indexMethod(index) {
      return index + 1;
    },
    delComment(id,waterId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: API.delComment,
            method: "get",
            params: {
              id: id
            }
          }).then(res => {
            this.findComment(waterId);
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
    this.find2();
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.wrapper {
}
</style>