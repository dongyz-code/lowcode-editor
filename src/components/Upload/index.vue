<template>
  <div>
    <input ref="inputRef" @change="onChange" class="upload-input" type="file" />
    <button @click="handleClick" class="upload-btn">
      <UploadOutlined />
      <span v-if="!isUploading" class="upload-text">点击上传</span>
      <span v-else class="upload-text">正在上传</span>
      <!-- <span v-else-if="uploadStatus === 'success'" class="upload-text">上传成功</span>
      <span v-else class="upload-text">上传失败</span> -->
    </button>

    <ul class="uploadded-file-list">
      <li v-for="file of uploadedFiles" :key="file.uid" :class="`uploaded-file upload-${file.status}`">
        <span>{{ file.name }}</span>
        <DeleteOutlined class="del-icon" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default { name: 'upload_base' }
</script>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons-vue'

type res = {
  code: string
  data: any
}

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
interface UploadFile {
  uid: string
  size: number
  name: string
  status: UploadStatus
  raw: File
}

const inputRef = ref<HTMLButtonElement | null>(null)
const uploadedFiles = ref<UploadFile[]>([
  {
    uid: 'sfe',
    name: '123.png',
    raw: 456 as unknown as File,
    status: 'loading',
    size: 500,
  },
])

const handleClick = () => {
  inputRef?.value?.click()
}

const postSingleFiles = async (files: FileList) => {
  const uplaodedFile = files[0]

  const fileObj = reactive<UploadFile>({
    uid: uuid(),
    size: uplaodedFile.size,
    name: uplaodedFile.name,
    status: 'loading',
    raw: uplaodedFile,
  })
  uploadedFiles.value.push(fileObj)

  const formData = new FormData()
  formData.append('avatar', uplaodedFile)
  try {
    const res = await axios.post<res>('/api/upload/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    fileObj.status = 'success'
    console.log('res.data.code', res.data.code)
  } catch (e) {
    fileObj.status = 'error'
  } finally {
    if (inputRef.value) inputRef.value.value = ''
  }
}

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (!files) return

  postSingleFiles(files)
}

const isUploading = computed(() => uploadedFiles.value.some((file) => file.status === 'loading'))
</script>
<style lang="less" scoped>
.upload-input {
  display: none;
}
.upload-btn {
  padding: 4px 15px;
  text-align: center;
  border: 1px solid #d9d9d9;
  .upload-text {
    margin-left: 8px;
  }
}

.uploadded-file-list {
  width: 100%;
  .uploaded-file {
    position: relative;
    line-height: 1.4;
    margin-top: 8px;
    &:hover {
      background-color: @info-color;
    }
    .del-icon {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
