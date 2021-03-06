import React, { PureComponent } from 'react'
import { string, object, func, bool } from 'prop-types'
import { Button, Form, Input, Modal, Select, Radio, Tooltip, Icon, TreeSelect } from 'antd'

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
      console.log(err)

      if (!err) {
        // item.id ?  : submitForm(item.id, { ...values })

        submitForm(item.id, { ...item, ...values })
        // const { organizationName } = sysServiceItem

        // // const selectedRoleItems = flatTree.map(itemList => role.find(currentItem => currentItem.id === id))
        // // const roleNames = selectedRoleItems.map(currentItem => currentItem.roleName).join(',')
        // submitForm(item.id, { ...values, name: organizationName })
      }
    })
  }

  render() {
    const { form, title, modalVisible, onCancelClick, orgList = [] } = this.props
    const { getFieldDecorator } = form
    const years = () => {
      let r0 = [],
        r1 = []
      for (let i = 1; i < 21; i++) {
        r0.push(new Date().getFullYear() - i)
        r1.push(new Date().getFullYear() + i)
      }
      return [...r0, ...r1, new Date().getFullYear()].sort()
    }
    return (
      <Modal
        destroyOnClose
        footer={false}
        title={title}
        visible={modalVisible}
        onOk={this.handleOk}
        onCancel={onCancelClick}
      >
        <Form {...FORM_ITEM_LAYOUT} className={globalStyles.modalForm} onSubmit={this.handleSubmit}>
          <Form.Item label="一级指标类型">
            {getFieldDecorator('taskName', {
              rules: [
                {
                  required: true,
                  message: '请输入一级指标类型',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="请输入一级指标类型" />)}
          </Form.Item>
          <Form.Item label="二级指标名称">
            {getFieldDecorator('principalName', {
              rules: [
                {
                  required: true,
                  message: '请输入二级指标名称',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="请输入二级指标名称" />)}
          </Form.Item>
          <Form.Item label="单位">
            {getFieldDecorator('companyName', {
              rules: [
                {
                  required: true,
                  message: '请输入单位',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="请输入单位" />)}
          </Form.Item>
          <Form.Item className={globalStyles.modalFormActions}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button style={{ marginLeft: '16px' }} onClick={onCancelClick}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default FormComp
