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

  state = {}

  handleSubmit = e => {
    e.preventDefault()
    const { form, item = {}, submitForm, modalType } = this.props

    return form.validateFieldsAndScroll((err, values) => {
      const values2 = { ...values }
      if (!err) {
        submitForm(modalType, { ...item, ...values2 })
      }
    })
  }

  render() {
    const { form, title, modalVisible, onCancelClick, constructionType } = this.props
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
          <FormItem label="分值类别">
            {getFieldDecorator('targetSortType', {
              rules: [
                {
                  required: true,
                  message: '请选择分值类别',
                },
              ],
            })(
              <Select
                placeholder="请选择"
                // onSelect={this.onLoadMonitorDevListData}
                allowClear
              >
                {// eslint-disable-next-line no-shadow
                constructionType.map(item => {
                  return (
                    <Option key={item.id} value={item.name}>
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="指标名称">
            {getFieldDecorator('targetName', {
              rules: [
                {
                  required: true,
                  message: '指标名称',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="考核内容">
            {getFieldDecorator('examContent', {
              rules: [
                {
                  required: true,
                  message: '考核内容',
                },
              ],
            })(<TextArea maxLength="200" rows={2} />)}
          </FormItem>
          <FormItem label="权重">
            {getFieldDecorator('weight', {
              rules: [
                {
                  required: true,
                  message: '权重',
                },
              ],
            })(<Input type="number" />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default FormComp