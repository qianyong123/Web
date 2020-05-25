import React, { PureComponent } from 'react'
import { string, object, func, bool } from 'prop-types'
import { Icon, Button, Form, Input, Modal, Row, Col } from 'antd'
import globalStyles from '@/global.less'
import moment from 'moment'
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
      let value = item[key]
      if (key === 'buildTime') {
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
    // GET /fileManage/downloadFile/{id}
    const { response = {} } = file
    if (response.code === 200) {
      this.setState({
        file: {
          checkFileId: response.data.id,
          fileName: file.name,
        },
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const { form, item, submitForm, modalType } = this.props
    const { file } = this.state
    const { fileName, checkFileId } = file
    const SubmitType = e.target.value
    return form.validateFieldsAndScroll((err, values) => {
      const values2 = { ...values }
      if (!err) {
        values2.checkFileId = checkFileId || item.checkFileId
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
          <Row gutter={24}>
            <Col span={12}>
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
            </Col>
            <Col span={12}>
              <FormItem label="建设单位">{getFieldDecorator('company')(<Input />)}</FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="建设地点">{getFieldDecorator('place')(<Input />)}</FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="法人代表">{getFieldDecorator('legalPerson')(<Input />)}</FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="联系电话">{getFieldDecorator('phone')(<Input />)}</FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="建设内容">
                {getFieldDecorator('content')(<TextArea maxLength="1000" rows={4} />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="项目申报材料">
                {getFieldDecorator('materialInformation')(<TextArea maxLength="1000" rows={4} />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="永久占地面积/㎡">
                {getFieldDecorator('permanentArea')(<Input type="number" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="临时占地面积/㎡">
                {getFieldDecorator('temporaryArea')(<Input type="number" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="永久占用耕地面积/㎡">
                {getFieldDecorator('ploughPermanentArea')(<Input type="number" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="工程区绿化面积/㎡">
                {getFieldDecorator('greenArea')(<Input type="number" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="永久占用其他面积/㎡">
                {getFieldDecorator('otherPermanentArea')(<Input type="number" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="迁移人口/人">
                {getFieldDecorator('migratingPopulation')(<Input type="number" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="建筑面积/㎡">
                {getFieldDecorator('buildArea')(<Input type="number" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="临时占地恢复面积/㎡">
                {getFieldDecorator('revokeTemporaryArea')(<Input type="number" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="恢复耕地面积/㎡">
                {getFieldDecorator('revokePloughArea')(<Input type="number" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="恢复其他面积/㎡">
                {getFieldDecorator('buildContent')(<Input type="number" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="工程区绿化投资/元">
                {getFieldDecorator('greenInvest')(<Input type="number" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="水土保持投资/元">
                {getFieldDecorator('soilManageInvest')(<Input type="number" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="移民环保投资/元">
                {getFieldDecorator('migrateInvest')(<Input type="number" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="治理水土流失面积/㎡">
                {getFieldDecorator('waterManageInvest')(<Input type="number" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="项目概况">
                {getFieldDecorator('projectOverview')(<TextArea maxLength="1000" rows={4} />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="涉及环境敏感目标及影响">
                {getFieldDecorator('influence')(<TextArea maxLength="1000" rows={4} />)}
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
                  'checkFileId',
                  {}
                )(
                  // eslint-disable-next-line react/destructuring-assignment
                  <UploadFile
                    autoUpload
                    file={{ name: item.fileName, buildFileId: item.checkFileId }}
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
