import React, { PureComponent } from 'react'
import { string, object, func, bool } from 'prop-types'
import { Icon, Button, Form, Modal, Select } from 'antd'
import globalStyles from '@/global.less'
import moment from 'moment'
import UploadFile from '@/components/UploadFile'

const { Option } = Select
const FormItem = Form.Item
const FORM_ITEM_LAYOUT = {
  labelCol: {
    span: 5,
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
      let value = rest[key]
      if (key === 'buildTime' && rest[key]) {
        value = moment(value)
      }
      files[key] = createFormField({
        value,
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

  state = {
    fileList: [],
    updates: false,
  }

  // 上传文件
  handleChange = (file, fileList = []) => {
    this.setState({
      fileList: [...fileList],
      updates: true,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { form, item = {}, submitForm, modalType } = this.props
    const { fileList, updates } = this.state
    const fileId = []
    let delectFileId = item.fileId ? item.fileId.split(',') : []
    fileList.forEach(item2 => {
      fileId.push(`${item2.id}`)
    })
    delectFileId = delectFileId.filter(id => !fileId.includes(id))
    return form.validateFieldsAndScroll((err, values) => {
      const values2 = { ...values }
      if (!err) {
        values2.delectFileId = delectFileId.join(',')
        values2.fileMessage = updates ? JSON.stringify(fileList) : item.fileMessage || []
        values2.fileId = updates ? fileId.join(',') : item.fileId || ''
        submitForm(modalType, { ...item, ...values2 })
      }
    })
  }

  render() {
    const {
      form,
      title,
      modalVisible,
      onCancelClick,
      yearList,
      year,
      item: { fileMessage },
      nameList,
    } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal
        destroyOnClose
        footer={[
          <Button type="primary" value="已保存" onClick={this.handleSubmit}>
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
          <FormItem label="时间">
            {getFieldDecorator('year', {
              initialValue: year,
            })(
              <Select
                placeholder="请选择"
                // onSelect={this.onLoadMonitorDevListData}
              >
                {// eslint-disable-next-line no-shadow
                yearList.map(item => {
                  return (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  )
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="标题">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请选择标题' }],
            })(
              <Select
                placeholder="请选择"
                // onSelect={this.onLoadMonitorDevListData}
              >
                {// eslint-disable-next-line no-shadow
                nameList.map(item => {
                  return (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  )
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="附件信息">
            {getFieldDecorator(
              'fileId',
              {}
            )(
              // eslint-disable-next-line react/destructuring-assignment
              <UploadFile
                autoUpload
                file={{ fileList: fileMessage }}
                len={-3}
                onChange={this.handleChange}
                showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
              >
                {() => (
                  <>
                    <Button style={{ width: '160px' }}>
                      <Icon type="upload" />
                      上传文件
                    </Button>
                    <span style={{ marginLeft: '10px', fontSize: '12px' }}>最多上传3个</span>
                  </>
                )}
              </UploadFile>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default FormComp