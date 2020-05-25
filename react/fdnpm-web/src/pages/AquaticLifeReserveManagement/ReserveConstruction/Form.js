import React, { PureComponent } from 'react'
import { string, object, func, bool } from 'prop-types'
import { Icon, Button, Form, Input, Modal, Select, DatePicker } from 'antd'
import globalStyles from '@/global.less'
import moment from 'moment'
import UploadFile from '@/components/UploadFile'

const { Option } = Select
const { TextArea } = Input
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
    file: {},
  }

  // 上传文件
  handleChange = file => {
    const { response = {} } = file
    if (response.code === 200) {
      this.setState({
        file: {
          buildFileId: response.data.id,
          fileName: file.name,
        },
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const { form, item = {}, submitForm, modalType } = this.props
    const SubmitType = e.target.value
    const { file } = this.state
    const { fileName, buildFileId } = file
    return form.validateFieldsAndScroll((err, values) => {
      const values2 = { ...values }
      if (!err) {
        if (values2.buildTime) values2.buildTime = values2.buildTime.format('YYYY-MM-DD')
        values2.buildFileId = buildFileId || item.buildFileId
        values2.fileName = fileName || item.fileName
        submitForm(modalType, { ...item, ...values2, buildStatus: SubmitType })
      }
    })
  }

  render() {
    const { form, title, modalVisible, onCancelClick, constructionType, item } = this.props
    const { getFieldDecorator } = form
    return (
      <Modal
        destroyOnClose
        footer={[
          <Button type="primary" value="已保存" onClick={this.handleSubmit}>
            保存
          </Button>,
          <Button
            type="primary"
            value="已提交"
            style={{ marginLeft: '16px' }}
            onClick={this.handleSubmit}
          >
            提交
          </Button>,
        ]}
        title={title}
        visible={modalVisible}
        onOk={this.handleOk}
        onCancel={onCancelClick}
      >
        <Form {...FORM_ITEM_LAYOUT} className={globalStyles.modalForm}>
          <FormItem label="保护区名称">
            {getFieldDecorator('protectionZone', {
              rules: [
                {
                  required: true,
                  message: '保护区名称',
                },
              ],
            })(<Input placeholder="请输入保护区名称" />)}
          </FormItem>
          <FormItem label="建设类别">
            {getFieldDecorator('buildCategory')(
              <Select
                placeholder="请选择"
                // onSelect={this.onLoadMonitorDevListData}
                style={{ width: '160px' }}
                allowClear
              >
                {// eslint-disable-next-line no-shadow
                constructionType.map(item => {
                  return (
                    <Option key={item.id} value={item.buildSortName}>
                      {item.buildSortName}
                    </Option>
                  )
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="建设内容">
            {getFieldDecorator('buildContent')(<TextArea maxLength="1000" rows={4} />)}
          </FormItem>
          <FormItem label="建设目的">
            {getFieldDecorator('buildAim')(<TextArea maxLength="200" rows={2} />)}
          </FormItem>
          <FormItem label="预计建设时间">
            {getFieldDecorator('buildTime')(
              <DatePicker style={{ width: '160px' }} placeholder="选择时间" />
            )}
          </FormItem>
          <FormItem label="附件信息">
            {getFieldDecorator('buildFileId', {
              // valuePropName: "fileList"
            })(
              // eslint-disable-next-line react/destructuring-assignment
              <UploadFile
                autoUpload
                file={{ name: item.fileName, buildFileId: item.buildFileId }}
                onChange={this.handleChange}
                showUploadList={{ showPreviewIcon: false, showRemoveIcon: false }}
              >
                {() => (
                  <Button style={{ width: '160px' }}>
                    <Icon type="upload" />
                    上传文件
                  </Button>
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
