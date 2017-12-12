<template>
  <el-main>
      <el-table class="containTable" :data="tableData" max-height="80vh" @cell-click="viewDetail">
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column prop="cat" label="类别">
        </el-table-column>
        <el-table-column prop="summary" label="摘要">
        </el-table-column>
        <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
      </el-table>
      <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="10">
    </el-pagination>
    </el-main>
</template>

<script>
export default {
  name: "articleList",
  mounted() {
    let url = "/api/api/account/getArticleList";
    this.$http.get(url, {
      params: {
        pageSize: 10,
        count: 1
      }
    }).then(
      response => {
        console.log(response);
        this.tableData = response.data;
      },
      response => {
        console.log(response);
      }
    );
  },
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: [],
      currentPage: 1
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    viewDetail(row, column, cell, event) {
      console.log(row._id)
      this.$router.push({path: '/backend/articleList/id/' + row._id})
    }
  }
};
</script>

