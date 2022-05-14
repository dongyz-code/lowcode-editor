import type { App } from 'vue'
import {
  Button,
  Breadcrumb,
  Modal,
  Table,
  Tree,
  Menu,
  Input,
  Form,
  Card,
  Checkbox,
  Radio,
  Col,
  Row,
  Select,
  Spin,
  DatePicker,
  Layout,
  Dropdown,
  ConfigProvider
} from 'ant-design-vue'

export function setupAntd(app: App): void {
  app
    .use(Button)
    .use(Breadcrumb)
    .use(Form)
    .use(Input)
    .use(Modal)
    .use(Table)
    .use(Tree)
    .use(Menu)
    .use(Card)
    .use(Checkbox)
    .use(Radio)
    .use(Col)
    .use(Row)
    .use(Select)
    .use(Spin)
    .use(DatePicker)
    .use(Layout)
    .use(Dropdown)
    .use(ConfigProvider)
}