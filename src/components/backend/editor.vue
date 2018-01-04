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
  <el-form-item label="文章封面">
    <el-upload
  class="avatar-uploader"
  action="/api/ueditor/ue?action=uploadimage&encode=utf-8"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
>
  <img v-if="image" :src="image" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>
</el-form>
    <p class="label">文章内容：</p>
    <div class="m10">
      <UE :defaultMsg=defaultMsg :config=config :id=ue1 ref="ue"></UE>
    </div>
    <div class="uploadButton">
      <el-button type="primary" @click="getUEContent">上传</el-button>
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
.uploadButton {
  margin: 10px;
}
.uploadButton .el-button {
  width: 120px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>


<script>
import { Loading } from "element-ui";
import UE from "../backend/UE.vue";

export default {
  name: "editor",
  components: { UE },
  data() {
    return {
      defaultMsg: "",
      image: "",
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      ue1: "ue1",
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
          let URL = "/api/account/createContent";
          let obj = {
            account: "chaiyanchen",
            title: this.form.title,
            image: this.image,
            cat: this.form.cat.join(';'),
            summary: this.form.summary,
            detail: content
          };
          this.$http.post(URL, obj).then(
            response => {
              if (response.status == 200) {
                this.$message({
                  message: response.data.sucess,
                  type: "success"
                });
                this.$router.push('/backend/articleList')
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
    },
    handleAvatarSuccess(res, file) {
      this.image =  res.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>