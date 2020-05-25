import React, { PureComponent } from 'react'
import { string, object, func, bool } from 'prop-types'
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Radio,
  Tooltip,
  Icon,
  TreeSelect,
  Upload,
  message,
} from 'antd'
import Cookies from 'js-cookie'

import globalStyles from '@/global.less'

const { Option } = Select

const FORM_ITEM_LAYOUT = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 16,
  },
  labelAlign: 'right',
}

@Form.create({
  mapPropsToFields({ item: { ...rest } }) {
    const { createFormField } = Form
    const files = {}
    Object.keys(rest).map(key => {
      files[key] = createFormField({
        value: rest[key],
      })
      return key
    })
    return {
      ...files,
    }
  },
})
class FormComp extends PureComponent {
  static propTypes = {
    item: object,
    title: string.isRequired,
    modalVisible: bool.isRequired,
    form: object.isRequired,
    submitForm: func.isRequired,
    onCancelClick: func.isRequired,
  }

  static defaultProps = {
    item: {},
  }

  handleSubmit = e => {
    e.preventDefault()

    const { form, item, submitForm, data } = this.props

    return form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // item.id ?  : submitForm(item.id, { ...values })
        values.fileId = values.file.file.response.data.id
        delete values.file
        submitForm(item.id, { ...item, ...values })
      }
    })
  }

  render() {
    const { form, title, modalVisible, onCancelClick, orgList = [], protectData } = this.props
    const { getFieldDecorator } = form
    const props = {
      name: 'file',
      action: '/sys/fileManage/uploadFile',
      headers: {
        Authorization: Cookies.get('token'),
      },
      accept:
        '.xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      multiple: false,
      showUploadList: false,
      onChange: info => {
        if (info.file.status !== 'uploading') {
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 上传成功`)
        } else if (info.file.status === 'error') {
        }
      },
    }

    return (
      <Modal
        destroyOnClose
        footer={[
          <Button type="primary" onClick={this.handleSubmit}>
            提交
          </Button>,
          <Button style={{ marginLeft: '16px' }} onClick={onCancelClick}>
            取消
          </Button>,
        ]}
        title={title}
        visible={modalVisible}
        onOk={this.handleOk}
        onCancel={onCancelClick}
      >
        <Form {...FORM_ITEM_LAYOUT} className={globalStyles.modalForm}>
          <Form.Item label="保护区名称">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请选择保护区名称',
                  whitespace: true,
                },
              ],
            })(
              <Select>
                {protectData.map((item, index) => (
                  <Option value={item.name} key={index}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item label="月份">
            {getFieldDecorator('date', {
              rules: [
                {
                  required: true,
                  message: '请选择月份',
                  whitespace: true,
                },
              ],
            })(
              <Select>
                <Option value="1月">1月</Option>
                <Option value="2月">2月</Option>
                <Option value="3月">3月</Option>
                <Option value="4月">4月</Option>
                <Option value="5月">5月</Option>
                <Option value="6月">6月</Option>
                <Option value="7月">7月</Option>
                <Option value="8月">8月</Option>
                <Option value="9月">9月</Option>
                <Option value="10月">10月</Option>
                <Option value="11月">11月</Option>
                <Option value="12月">12月</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item label="文件">
            {getFieldDecorator('file', {
              rules: [
                {
                  required: true,
                  message: '请选择文件',
                },
              ],
            })(
              <Upload style={{ display: 'flex' }} {...props}>
                <Button>
                  <Icon type="upload" /> 点击上传文件
                </Button>
              </Upload>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default FormComp
