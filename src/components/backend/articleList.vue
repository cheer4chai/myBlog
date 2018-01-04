<template>
  <el-main>
      <el-table class="containTable" :data="tableData" max-height="80vh" @cell-click="viewDetail">
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column prop="cat" label="类别">
        </el-table-column>
        <el-table-column prop="image" label="封面">
        </el-table-column>
        <el-table-column prop="summary" label="摘要">
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
  name: "articleList",
  mounted() {
    //检验登录状态
    this.$http
      .get('/api/getSession')
      .then(response => {
        if(response.data.code == 201) {
          this.$router.push({ path: "/login"});
        }
      })
    let url = "/api/account/getArticleList";
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
      let url = "/api/account/getArticleList";
      this.$http
        .get(url, {
          params: {
            pageSize: 10,
            count: val-1
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
    viewDetail(row, column, cell, event) {
      console.log(row._id);
      this.$router.push({ path: "/backend/articleList/id/" + row._id });
    }
  }
};
</script>

