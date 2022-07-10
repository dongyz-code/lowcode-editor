<template>
  <Card title="文件上传" style="width: 500px">
    <Uplode action="/api/upload/avatar" name="avatar" :drop="true" list-type="picture" :data="{ a: '456' }">
      <div class="upload-btn">
        <PlusOutlined class="icon" />
        <div>Select Files</div>
      </div>
    </Uplode>
  </Card>

  <Card title="手动上传" style="width: 500px">
    <Uplode
      ref="uploadRef"
      action="/api/upload/avatar"
      list-type="picture"
      :drop="true"
      :data="{ a: '456' }"
      :auto-upload="false"
    >
      <div class="upload-btn">
        <PlusOutlined class="icon" />
        <div>Upload</div>
      </div>
    </Uplode>
    <Button @click="manualUpload">上传文件</Button>
  </Card>

  <Card title="Ant Design Vue Upload" style="width: 500px; margin-top: 15px">
    <AntUpload action="/jiji" :multiple="true" :data="{ a: 456 }" :custom-request="customRequest"> 点击上传 </AntUpload>
  </Card>
</template>

<script lang="ts">
export default {
  name: 'home-page',
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import Uplode from '@/components/Upload/index.vue'
import { Card, Upload as AntUpload, Button } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'

const uploadRef = ref<any | null>(null)

const beforeUpload = (file: any) => {
  // return new Promise<File>((resolve, reject) => {
  //   const a = 123 as unknown as File
  //   resolve(a)
  // })
  return true
}
const customRequest = (...arg: any) => {
  console.log('arg', arg)
}
const manualUpload = () => {
  uploadRef?.value.handleUploadFiles()
}
</script>

<style lang="less" scoped>
.upload-btn {
  width: 110px;
  height: 110px;
  box-sizing: border-box;
  border: 1px solid @border-color-base;
  text-align: center;
  .icon {
    padding-top: 30px;
  }
}
</style>
