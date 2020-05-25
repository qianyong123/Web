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
  // 上传文件
  handleChange = file => {
    // GET /fileManage/downloadFile/{id}
    const { response = {} } = file
    if (response.code === 200) {
      this.setState({
        file: {
          reportFileId: response.data.id,
          fileName: file.name,
        },
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const { form, item, submitForm, modalType } = this.props
    const { file } = this.state
    const { fileName, reportFileId } = file
    const SubmitType = e.target.value
    return form.validateFieldsAndScroll((err, values) => {
      const values2 = { ...values }
      if (!err) {
        values2.reportFileId = reportFileId || item.reportFileId
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
          <FormItem label="总论">
            {getFieldDecorator('pandect', {
              rules: [
                {
                  required: true,
                  message: '总论',
                },
              ],
            })(<Input />)}
          </FormItem>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="项目背景与建设必要性">
                {getFieldDecorator('background')(<TextArea maxLength="1000" rows={4} />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="项目建设条件分析">
                {getFieldDecorator('conditionAnalysis')(<TextArea maxLength="1000" rows={4} />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="建设目标">
                {getFieldDecorator('target')(<TextArea maxLength="1000" rows={4} />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="建设方案">
                {getFieldDecorator('programme')(<TextArea maxLength="1000" rows={4} />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="环境影响评价">
                {getFieldDecorator('evaluate')(<TextArea maxLength="1000" rows={4} />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="招标方案">
                {getFieldDecorator('inviteTenders')(<TextArea maxLength="1000" rows={4} />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="实施进度安排">
                {getFieldDecorator('scheduling')(<TextArea maxLength="1000" rows={4} />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="资金估算与资金筹措">
                {getFieldDecorator('capitalEstimation')(<TextArea maxLength="1000" rows={4} />)}
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
                  'reportFileId',
                  {}
                )(
                  <UploadFile
                    autoUpload
                    file={{ name: item.fileName, buildFileId: item.reportFileId }}
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
