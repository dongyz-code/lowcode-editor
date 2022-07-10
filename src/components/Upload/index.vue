<template>
  <div>
    <input ref="inputRef" :accept="props.accept" @change="onUploadInputChange" class="upload-input" type="file" />
    <div class="upload-wrap">
      <!-- picture -->
      <template v-if="props.listType === 'picture'">
        <div v-for="file of uploadedFiles" :key="file.uid" :class="`pictrue picture-${file.status}`">
          <Image :src="file.url" width="110px" height="110px" />
          <div v-if="file.status === 'loading'" class="progress-mask">
            <div class="progress" :style="{ width: `${file.percent || 0}%` }"></div>
          </div>
        </div>
      </template>

      <!-- 上传按钮 -->
      <div v-if="!isHideUploadBtn" v-on="triggerEvent" class="upload-btn-wrap">
        <slot>
          <button class="upload-btn">
            <span class="upload-text">点击上传</span>
          </button>
        </slot>
      </div>
    </div>

    <ul v-if="props.listType === 'text'" class="uploadded-file-list">
      <li v-for="file of uploadedFiles" :key="file.uid" :class="`uploaded-file upload-${file.status}`">
        <span>{{ file.name }}</span>
        <DeleteOutlined class="del-icon" />
        <div v-if="file.status === 'loading'" class="progress" :style="{ width: `${file.percent || 0}%` }"></div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default { name: 'upload_base' }
</script>

<script lang="ts" setup>
import { reactive, ref, computed, PropType } from 'vue'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { Image } from 'ant-design-vue'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { isEmpty, isObject } from 'lodash-es'
import { fileToBase64 } from '@/utils'

type res = {
  code: string
  data: any
}

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type ListType = 'text' | 'picture'
type BeforeUpload = (uploddFile: UploadFile) => boolean | Promise<UploadFile>
type OnSuccess = (res: any, file: File, fileList: UploadFile[]) => void
type HttpRequest = (option: RequestOption) => void
interface UploadFile {
  uid: string
  size: number
  name: string
  status: UploadStatus
  percent?: number
  raw: File
  response?: any
  url?: string
}
interface TriggerEvent {
  click: () => void
  dragover?: (e: DragEvent) => void
  dragleave?: (e: DragEvent) => void
  drop?: (e: DragEvent) => void
}
interface RequestOption {
  action?: string
  name: string
  Headers: { [key: string]: string }
  data?: { [key: string]: string }
  onProgress: (e: any) => void
  file: File
}

const props = defineProps({
  action: String,
  name: {
    type: String,
    require: true,
  },
  accept: String,
  beforeUpload: Function as PropType<BeforeUpload>,
  onSuccess: Function as PropType<OnSuccess>,
  limit: Number,
  drop: Boolean,
  data: Object as PropType<{ [key: string]: string }>, // 上传时额外的参数
  httpRequest: Function as PropType<HttpRequest>,
  autoUpload: {
    // 是否自动上传文件
    type: Boolean,
    default: true,
  },
  listType: {
    type: String as PropType<ListType>,
    default: 'text',
  },
  headers: {
    type: Object as PropType<{ [key: string]: string }>,
    default: () => ({}),
  },
})

const inputRef = ref<HTMLButtonElement | null>(null)
const isDragOver = ref<boolean>(false)
const uploadedFiles = ref<UploadFile[]>([])

const onUploadProgress = (e: any, uploadFile: UploadFile) => {
  const progress = Math.floor((e.loaded / e.total) * 100)
  uploadFile.percent = progress
}

const defaultPostFiles = (option: RequestOption) => {
  if (!option.action) return

  const formData = new FormData()
  formData.append(option.name, option.file)

  // 合并其他参数
  const data = option.data
  if (data && !isEmpty(data) && isObject(data)) {
    Object.keys(data).forEach((param) => {
      formData.append(param, data[param])
    })
  }

  return axios.post<res>(option.action, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...option.Headers,
    },
    onUploadProgress: option.onProgress,
  })
}

const beforeUploadCheck = async (uploadFile: UploadFile): Promise<UploadFile | undefined> => {
  if (!props.beforeUpload) {
    return uploadFile
  }

  try {
    const res = props.beforeUpload(uploadFile)
    if (res instanceof Promise) {
      const transformFile = await res
      if (transformFile.raw instanceof File) {
        return transformFile
      } else {
        throw new Error('beforeUpload Promise should return File object')
      }
    } else if (typeof res === 'boolean') {
      return uploadFile
    } else {
      return
    }
  } catch (e) {
    let err = e as string
    throw new Error(err)
  }
}

const addToFilesList = async (uploadFile: UploadFile) => {
  const base64Url = await fileToBase64(uploadFile.raw)
  uploadFile.url = base64Url
  uploadedFiles.value.push(uploadFile)
}

const handleUploadFiles = () => {
  const readyFiles = uploadedFiles.value.filter((uploadFile) => uploadFile.status === 'ready')
  const postFileMethods = props.httpRequest || defaultPostFiles
  readyFiles.forEach(async (uploadFile) => {
    uploadFile.status = 'loading'
    try {
      const requestOption: RequestOption = {
        action: props.action,
        name: props.name || '',
        Headers: props.headers,
        data: props.data,
        onProgress: (e: any) => onUploadProgress(e, uploadFile),
        file: uploadFile.raw,
      }

      const res = await postFileMethods(requestOption)
      uploadFile.status = 'success'
      uploadFile.response = res
    } catch (e) {
      uploadFile.status = 'error'
    } finally {
      if (inputRef.value) inputRef.value.value = ''
    }
  })
}

const handleClick = () => {
  inputRef?.value?.click()
}

const onUploadInputChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files

  if (!files) return

  // 构建UploadFile对象
  const file = files[0]
  const uploadFile = reactive<UploadFile>({
    uid: uuid(),
    size: file.size,
    name: file.name,
    status: 'ready',
    raw: file,
  })

  try {
    const transformFile = await beforeUploadCheck(uploadFile) // 检查文件
    if (!transformFile) return
    await addToFilesList(transformFile)
    props.autoUpload && handleUploadFiles()
  } catch (e) {
    uploadFile.status = 'error'
    console.error(e)
  }
}

const isHideUploadBtn = computed<boolean>(() => {
  if (typeof props.limit === 'number') {
    return uploadedFiles.value.length >= props.limit
  } else {
    return false
  }
})

const onDragChange = (e: DragEvent, over: boolean) => {
  e.preventDefault()
  isDragOver.value = over
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragOver.value = false
  if (!e.dataTransfer) return

  const files = e.dataTransfer.files
  addToFilesList(files)
}

// 绑定上传事件
let triggerEvent: TriggerEvent = {
  click: handleClick,
}

if (props.drop) {
  triggerEvent = {
    ...triggerEvent,
    dragover: (e: DragEvent) => onDragChange(e, true),
    dragleave: (e: DragEvent) => onDragChange(e, false),
    drop: handleDrop,
  }
}

defineExpose({
  handleUploadFiles,
})
</script>

<style lang="less" scoped>
.upload-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-wrap: wrap;
  .pictrue {
    position: relative;
    height: 110px;
    margin-right: 10px;
    margin-bottom: 10px;
    .progress-mask {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: @mask-bg-color;
    }
    .progress {
      position: absolute;
      left: 0;
      bottom: 50%;
      height: 1px;
      background-color: @border-color-base;
    }
    &.picture-error {
      border: 1px solid @error-color;
    }
  }
  .upload-btn-wrap {
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }
}
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
    line-height: 1.6;
    margin-top: 8px;
    &:hover {
      background-color: @hover-bg-color;
      .del-icon {
        display: block;
      }
    }
    .progress {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 1px;
      background-color: @border-color-base;
    }
    &.upload-error {
      color: @error-color;
      .del-icon {
        display: block;
      }
    }
    .del-icon {
      display: none;
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
