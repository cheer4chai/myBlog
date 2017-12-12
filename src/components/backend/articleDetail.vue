<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
  <el-form-item label="文章标题" prop="title">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="文章分类" prop="cat">
    <el-select
    v-model="form.cat"
    multiple
    filterable
    allow-create
    placeholder="请选择文章标签">
    <el-option
      v-for="item in catOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="文章摘要" prop="summary">
    <el-input type="textarea" v-model="form.summary"></el-input>
  </el-form-item>
</el-form>
    <p class="label">文章内容：</p>
    <div class="m10">
      <UE :defaultMsg=defaultMsg :config=config :id=this.$route.params.id ref="ue" v-if="flag"></UE>
    </div>
    <div class="uploadButton">
      <el-button type="primary" @click="getUEContent">修改</el-button>
    </div>
    
  </div>
</template>

<style>
.mt20 {
  margin-top: 20px;
}
.center {
  text-align: center;
}
.el-form {
  margin-top: 20px;
  width: 60vw;
}
.label {
  width: 80px;
  text-align: right;
  font-size: 14px;
  color: #5a5e66;
  line-height: 40px;
}
.m10 {
  margin: 10px;
}
.uploadButton {
  margin: 10px;
}
.uploadButton .el-button {
  width: 120px;
}
</style>


<script>
import { Loading } from "element-ui";
import UE from "../backend/UE.vue";

export default {
  name: "articleDetail",
  components: { UE },
  data() {
    return {
      defaultMsg: "",
      flag: false,
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      ue2: "ue2",
      form: {
        title: "",
        summary: "",
        cat: []
      },
      rules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        summary: [
          { required: true, message: "请输入文章概要", trigger: "blur" },
          { min: 1, max: 100, message: "长度在 1 到 100 个字符", trigger: "blur" }
        ],
        cat: [{ required: true, message: "请选择文章分类", trigger: "change" }]
      },
      catOptions: [
        {
          value: "HTML",
          label: "HTML"
        },
        {
          value: "CSS",
          label: "CSS"
        },
        {
          value: "JavaScript",
          label: "JavaScript"
        }
      ]
    };
  },
  mounted() {
    let url = "/api/api/account/getContent?_id=" + this.$route.params.id;
    this.$http.get(url).then(
      response => {
        this.defaultMsg = response.data[0].detail;
        this.form.title = response.data[0].title;
        this.form.cat = response.data[0].cat?response.data[0].cat.split(';'):[];
        this.form.summary = response.data[0].summary;
        this.flag = true;
      },
      response => {
        console.log(response);
      }
    );
  },
  methods: {
    getUEContent() {
      // 获取内容方法
      this.$refs["form"].validate(valid => {
        if (valid) {
          let loadingInstance = Loading.service();
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          let content = this.$refs.ue.getUEContent();
          let URL = "/api/api/account/changeContent";
          let obj = {
            id: this.$route.params.id,
            account: "chaiyanchen",
            title: this.form.title,
            cat: this.form.cat.join(';'),
            summary: this.form.summary,
            detail: content
          };
          this.$http.post(URL, obj).then(
            response => {
              if (response.status == 200) {
                this.$message({
                  message: "修改成功！",
                  type: "success"
                });
                this.$router.push("/backend/articleList");
              } else {
                this.$message.error(response.data);
              }
            },
            response => {
              console.log(response);
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>