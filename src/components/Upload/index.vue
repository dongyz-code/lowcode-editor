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
type BeforeUpload = (file: File) => boolean | Promise<File>
type OnSuccess = (res: any, file: File, fileList: UploadFile[]) => void
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

const props = defineProps({
  action: String,
  name: String,
  accept: String,
  beforeUpload: Function as PropType<BeforeUpload>,
  onSuccess: Function as PropType<OnSuccess>,
  limit: Number,
  drop: Boolean,
  listType: {
    type: String as PropType<ListType>,
    default: 'text',
  },
  data: Object as PropType<{ [key: string]: string }>, //额外的参数
  headers: {
    type: Object as PropType<{ [key: string]: string }>,
    default: () => ({}),
  },
})

const inputRef = ref<HTMLButtonElement | null>(null)
const isDragOver = ref<boolean>(false)
const uploadedFiles = ref<UploadFile[]>([])

const handleClick = () => {
  inputRef?.value?.click()
}

const postSingleFiles = async (uplaodedFile: File) => {
  if (!props.action) return
  const base64Url = await fileToBase64(uplaodedFile)

  const fileObj = reactive<UploadFile>({
    uid: uuid(),
    size: uplaodedFile.size,
    name: uplaodedFile.name,
    status: 'loading',
    raw: uplaodedFile,
    url: base64Url,
  })
  uploadedFiles.value.push(fileObj)

  const formData = new FormData()
  formData.append('avatar', uplaodedFile)

  // 合并其他参数
  if (!isEmpty(props.data) && isObject(props.data)) {
    Object.keys(props.data).forEach((param) => {
      const data = props.data as { [key: string]: string }
      formData.append(param, data[param])
    })
  }

  try {
    const res = await axios.post<res>(props.action, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...props.headers,
      },
      onUploadProgress(e) {
        const progress = Math.floor((e.loaded / e.total) * 100)
        fileObj.percent = progress
      },
    })
    fileObj.response = res.data
    fileObj.status = 'success'
  } catch (e) {
    fileObj.status = 'error'
  } finally {
    if (inputRef.value) inputRef.value.value = ''
  }
}

const uploadFiles = (files: FileList | null) => {
  if (!files) return
  const file = files[0]
  if (props.beforeUpload) {
    const res = props.beforeUpload(file)
    if (typeof res === 'boolean') {
      res && postSingleFiles(file)
    } else if (res instanceof Promise) {
      res
        .then((transformFile) => {
          if (transformFile instanceof File) {
            postSingleFiles(transformFile)
          } else {
            throw new Error('beforeUpload Promise should return File object')
          }
        })
        .catch((e) => {
          console.error(e)
        })
    }
  } else {
    postSingleFiles(file)
  }
}

const onUploadInputChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  uploadFiles(files)
}

// const isUploading = computed(() => uploadedFiles.value.some((file) => file.status === 'loading'))
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
  uploadFiles(files)
}

// 拖拽上传
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
