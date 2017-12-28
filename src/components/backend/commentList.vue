<template>
  <el-main>
      <el-table class="containTable" :data="tableData" max-height="80vh">
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="content" label="内容">
        </el-table-column>
        <el-table-column prop="time" label="时间">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="check(scope.row)" type="text" size="small">查看</el-button>
                <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="this.count">
    </el-pagination>
    </el-main>
</template>

<script>
export default {
  name: "commentList",
  mounted() {
    //检验登录状态
    this.$http.get("/api/api/getSession").then(response => {
      if (response.data.code == 201) {
        this.$router.push({ path: "/login" });
      }
    });
    let url = "/api/api/account/getComment";
    this.$http
      .get(url, {
        params: {
          pageSize: 10,
          count: 0
        }
      })
      .then(
        response => {
          console.log(response);
          this.tableData = response.data.data;
          this.count = response.data.count;
        },
        response => {
          console.log(response);
        }
      );
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      count: 0
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      let url = "/api/api/account/getComment";
      this.$http
        .get(url, {
          params: {
            pageSize: 10,
            count: val - 1
          }
        })
        .then(
          response => {
            console.log(response);
            this.tableData = response.data.data;
          },
          response => {
            console.log(response);
          }
        );
    },
    handleClick(row) {
      console.log(row);
    },
    remove(row) {
      this.$http.get("/api/api/account/deleteComment?id=" + row._id).then(
          response => {
              if (response.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
          }
      );
    }
  }
};
</script>

