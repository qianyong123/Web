import React, { PureComponent } from 'react'
import { string, object, func, bool } from 'prop-types'
import { Icon, Button, Form, Input, Modal, Row, Col } from 'antd'

import globalStyles from '@/global.less'

import UploadFile from '@/components/UploadFile'

const { TextArea } = Input
const FormItem = Form.Item
const FORM_ITEM_LAYOUT = {
  // labelCol: {
  //   span: 8,
  // },
  // wrapperCol: {
  //   span: 14,
  // },
  // labelAlign: 'right'
}

@Form.create({
  mapPropsToFields({ item }) {
    const { createFormField } = Form
    const files = {}
    Object.keys(item).map(key => {
      files[key] = createFormField({
        value: item[key],
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
    // GET /fileManage/downloadFile/{id}
    const { response = {} } = file
    if (response.code === 200) {
      this.setState({
        file: {
          designFileId: response.data.id,
          fileName: file.name,
        },
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const { form, item, submitForm, modalType } = this.props
    const { file } = this.state
    const { fileName, designFileId } = file
    const SubmitType = e.target.value
    return form.validateFieldsAndScroll((err, values) => {
      const values2 = { ...values }
      if (!err) {
        values2.designFileId = designFileId || item.designFileId
        values2.fileName = fileName || item.fileName
        values2.basicBuildId = modalType === 'new' ? item.basicBuildId : item.id
        submitForm(modalType, { ...item, ...values2, buildStatus: SubmitType })
      }
    })
  }

  render() {
    const { form, title, modalVisible, onCancelClick, item } = this.props
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
        width="800px"
      >
        <Form layout="vertical" {...FORM_ITEM_LAYOUT} className={globalStyles.modalForm}>
          <FormItem label="项目名称">
            {getFieldDecorator('projectName', {
              rules: [
                {
                  required: true,
                  message: '项目名称',
                },
              ],
            })(<Input />)}
          </FormItem>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="项目建设单位概况">
                {getFieldDecorator('companySurvey')(<TextArea maxLength="1000" rows={4} />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="项目建设必要性">
                {getFieldDecorator('projectEssential')(<TextArea maxLength="1000" rows={4} />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="建设方案">
                {getFieldDecorator('projectPlan')(<TextArea maxLength="1000" rows={4} />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="项目建设内容">
                {getFieldDecorator('projectContent')(<TextArea maxLength="1000" rows={4} />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="总体建设方案">
                {getFieldDecorator('ensemblePlan')(<TextArea maxLength="1000" rows={4} />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="项目建设管理">
                {getFieldDecorator('projectManage')(<TextArea maxLength="1000" rows={4} />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="综合评价">
                {getFieldDecorator('overallMerit')(<TextArea maxLength="1000" rows={4} />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="附件信息">
                {getFieldDecorator(
                  'designFileId',
                  {}
                )(
                  // eslint-disable-next-line react/destructuring-assignment
                  <UploadFile
                    autoUpload
                    file={{ name: item.fileName, buildFileId: item.designFileId }}
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
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default FormComp
