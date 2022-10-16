<template>
  <div>
    <!-- 这个组件传上图片以后会自动上传，同时本地上传会在上传一边 -->
    <!-- 用:http-request覆盖默认的上传行为，可以自定义上传的实现 -->
    <el-upload
      v-loading="loading"
      class="uploadImg"
      action="#"
      :file-list="fileList"
      list-type="picture-card"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-change="onChange"
      :http-request="onHttpRequest"
      :limit="1"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!-- 弹出层 -->
    <el-dialog title="图片预览" :visible.sync="dialogVisible" width="30%">
      <img :src="previewImg" alt="" width="100%">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDfchPKKJNg9ofy9FBwZ2FF6nJdkeN3Xny',
  SecretKey: 'CRbaO7jDrPpaLyUsJfsqjP1UmKht1b6Z'
})
console.log(COS)
export default {
  name: 'UploadImg',
  props: {
    img: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      fileList: [],
      dialogVisible: false,
      previewImg: '',
      loading: false
    }
  },
  watch: {
    img() {
      this.fileList.push({
        name: 'default',
        url: this.img
      })
    }
  },
  methods: {
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      this.dialogVisible = true
      this.previewImg = file.url
    },
    // 本地选择上传 原来有一个数据+选择的数据
    // 请求上传成功/失败原来有一个数据
    // 会出现上传一张图片上传两张的情况

    // file上传的图片的file对象，fileList更新后的数值
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onHttpRequest({ file }) {
      this.loading = true
      // 上传到存储桶
      cos.putObject(
        {
          Bucket: 'huang-1314348611' /* 填入您自己的存储桶，必须字段 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，例如ap-beijing，必须字段 */,
          Key: file.name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
          Body: file /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */,
          onProgress: function(progressData) {
            // console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          // err上传失败的信息如果上传成功err为nuLL
          // data上传成功的信息
          if (err) return this.$message.error('上传图片失败')
          // 上传图片成功，剩余功能让父组件去操作，
          this.loading = false
          this.$emit('on-success', { imgUrl: 'https://' + data.Location })
        }
      )
    },
    beforeUpload(file) {
      // 控制图片格式
      const formatImg = ['image/png', 'image/jpeg', 'image/gif']
      const isFormat = formatImg.includes(file.type)
      if (!isFormat) {
        this.$message.error('格式必须是' + formatImg.join(',') + '类型')
        return false
      }
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('大小不能超过1MB')
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.uploadImg {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
