<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1']" :router='true'>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>文章管理</template>
          <el-menu-item index="/backend/articleList">文章列表</el-menu-item>
          <el-menu-item index="/backend/editor">新建文章</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>评论管理</template>
        <el-menu-item index="/backend/commentList">评论查看</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <span>后台管理</span>
    </el-header>
    <router-view></router-view>
  </el-container>
</el-container>

</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .containTable{
      height: 80vh;
  }
  .el-pagination{
      float: right;
      margin-top: 2vh;
  }
</style>

<script>
  export default {
    name: 'backend',
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(15).fill(item),
        currentPage: 1
      }
    },
    methods: {
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
  };
</script>