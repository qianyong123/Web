import React, { Component } from 'react'
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
  Row,
  Col,
} from 'antd'
import _ from 'lodash'

import globalStyles from '@/global.less'
import BaseForm from './modules/BaseFrom'
import ProtectedArea from './modules/ProtectedArea'
import CoreArea from './modules/CoreArea'
import Area from './modules/Area'
import Personnel from './modules/Personnel'
import MainObject from './modules/MainObject'
import Styles from './index.less'

const { Option } = Select
const { TextArea } = Input

const LONG_FORM_ITEM_LAYOUT = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 20,
  },
}
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
class FormComp extends Component {
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

  // static getDerivedStateFromProps(props, state) {
  //
  //   const addSub = (arr) => {
  //     if (!arr && !arr.length) return []
  //     arr.forEach((item, index) => {
  //       item.sub = index
  //     })
  //     return arr
  //   }
  //
  //   const { protectedArea } = props.item
  //   if (protectedArea && protectedArea.length > 0 && protectedArea !== state.protectedArea) {
  //     // console.log(addSub(protectedArea))
  //     const newArr = addSub(protectedArea)
  //     return {
  //       protectedArea: newArr,
  //     }
  //   }
  //   return null
  // }

  constructor(props) {
    super(props)
    this.state = {
      protectedArea: [{ sub: 0 }],
      coreAreaList: [{ sub: 0 }],
      mainObject: [{ sub: 0 }],
    }
  }

  componentDidUpdate(prevProps) {
    const addSub = arr => {
      if (!arr && !arr.length) return []
      arr.forEach((item, index) => {
        item.sub = index
      })
      return arr
    }
    // console.log(this.props)
    const { protectedArea, coreAreaList } = this.props.item
    if (
      protectedArea &&
      protectedArea.length > 0 &&
      !_.isEqual(prevProps.item.protectedArea, protectedArea)
    ) {
      const newArr = addSub(protectedArea)
      this.setState({
        protectedArea: newArr,
      })
    }
    if (
      coreAreaList &&
      coreAreaList.length > 0 &&
      !_.isEqual(prevProps.item.coreAreaList, coreAreaList)
    ) {
      const newArr = addSub(coreAreaList)
      this.setState({
        coreAreaList: newArr,
      })
    }
  }

  handleSubmit = (isSubMit, e) => {
    e.preventDefault()

    const { form, item, submitForm, data } = this.props

    return form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {
          protectTargetList,
          northernLatitude,
          estLongitude,
          coreAreaList,
          coordinateList,
          adjustTime,
          agreeTime,
          ...rest
        } = values
        const newValues = { ...rest }
        newValues.protectTargetList = protectTargetList
        // 处理图片 将图片和URL 组装成字符串(逗号分隔)
        protectTargetList.forEach((i, index) => {
          const { files } = i
          newValues.protectTargetList[index].photoIds = files.map(file => file.id).join(',')
          newValues.protectTargetList[index].photoPaths = files.map(file => file.url).join(',')
          delete newValues.protectTargetList[index].files
        })
        newValues.protectTargetList = newValues.protectTargetList.filter(Boolean)

        // 处理外层纬度范围
        newValues.northernLatitude = northernLatitude.join(',')
        newValues.estLongitude = estLongitude.join(',')

        // 处理保护区坐标和核心区坐标
        newValues.coordinateList = [...coreAreaList, ...coordinateList].filter(Boolean)

        // console.log([...coreAreaList, ...coordinateList])
        // 处理时间
        newValues.adjustTime = Date.parse(adjustTime)
        newValues.agreeTime = Date.parse(agreeTime)

        console.log(newValues)
        // console.log(Date.parse(adjustTime))
        // console.log(JSON.stringify(newValues))

        // item.id ?  : submitForm(item.id, { ...values })
        // submitForm(item.id, { ...item, ...values })

        this.resetVal()
        submitForm(item.id, { ...newValues })
      }
    })
  }

  /**
   *@Date:2020/5/7
   *@Features: 保护区地理位置坐标动态增加减少
   */
  addProtectedArea = () => {
    const { protectedArea } = this.state
    const index = protectedArea[protectedArea.length - 1].sub
    protectedArea.push({ sub: index + 1 })
    const newArr = JSON.parse(JSON.stringify(protectedArea))
    this.setState({ protectedArea: newArr })
  }

  delItem = index => {
    const { protectedArea } = this.state
    const newArr = protectedArea.filter(item => item.sub !== index)
    this.setState({ protectedArea: newArr })
  }

  /**
   *@Date:2020/5/7
   *@Features: 核心区地理位置坐标动态增加减少
   */
  addCoreArea = () => {
    const { coreAreaList } = this.state
    const index = coreAreaList[coreAreaList.length - 1].sub
    coreAreaList.push({ sub: index + 1 })
    const newArr = JSON.parse(JSON.stringify(coreAreaList))
    this.setState({ coreAreaList: newArr })
  }

  delCoreItem = index => {
    const { coreAreaList } = this.state
    const newArr = coreAreaList.filter(item => item.sub !== index)
    this.setState({ coreAreaList: newArr })
  }

  /**
   *@Date:2020/5/8
   *@Features: 添加或减少保护对象
   */
  addMainObject = () => {
    const { mainObject } = this.state
    const index = mainObject[mainObject.length - 1].sub
    mainObject.push({ sub: index + 1 })
    const newArr = JSON.parse(JSON.stringify(mainObject))
    this.setState({ mainObject: newArr })
  }

  delMainObject = index => {
    const { mainObject } = this.state
    const newArr = mainObject.filter(item => item.sub !== index)
    this.setState({ mainObject: newArr })
  }

  closeModal = () => {
    const { onCancelClick } = this.props
    this.resetVal()
    onCancelClick()
  }

  resetVal = () => {
    this.setState({
      protectedArea: [{ sub: 0 }],
      coreAreaList: [{ sub: 0 }],
      mainObject: [{ sub: 0 }],
    })
  }

  render() {
    const { form, title, modalVisible } = this.props
    const { protectedArea, coreAreaList, mainObject } = this.state
    const { getFieldDecorator } = form

    return (
      <Modal
        destroyOnClose
        footer={[
          <Button type="primary" onClick={this.handleSubmit.bind(this, false)}>
            保存
          </Button>,
          <Button type="primary" onClick={this.handleSubmit.bind(this, true)}>
            报送
          </Button>,
          <Button style={{ marginLeft: '16px' }} onClick={this.closeModal}>
            取消
          </Button>,
        ]}
        maskClosable={false}
        title={title}
        visible={modalVisible}
        onOk={this.handleOk}
        onCancel={this.closeModal}
        width="920px"
      >
        <Form {...FORM_ITEM_LAYOUT} className={globalStyles.modalForm} style={{ paddingRight: 40 }}>
          <Row>
            <Col span={24}>
              <h5 className={Styles.baseInfo}>基础信息</h5>
            </Col>
          </Row>
          <BaseForm form={form} />
          <Row>
            <Col span={24}>
              <h5 className={Styles.baseInfo}>保护区地理位置坐标</h5>
            </Col>
          </Row>
          <ProtectedArea
            form={form}
            item={protectedArea}
            addProtectedArea={this.addProtectedArea}
            delItem={this.delItem}
          />
          <Row>
            <Col span={24}>
              <h5 className={Styles.baseInfo}>核心区地理位置坐标</h5>
            </Col>
          </Row>
          <CoreArea
            form={form}
            item={coreAreaList}
            addCoreArea={this.addCoreArea}
            delItem={this.delCoreItem}
          />
          <Row>
            <Col span={24}>
              <h5 className={Styles.baseInfo}>面积</h5>
            </Col>
          </Row>
          <Area form={form} />
          <Row>
            <Col span={24}>
              <h5 className={Styles.baseInfo}>人员调查信息</h5>
            </Col>
          </Row>
          <Personnel form={form} />
          <Row>
            <Col span={24}>
              <h5 className={Styles.baseInfo}>主要保护对象</h5>
            </Col>
          </Row>
          <MainObject form={form} item={mainObject} delItem={this.delMainObject} />
          <Row>
            <Col offset={10}>
              <Button icon="plus" onClick={this.addMainObject} type="primary">
                添加保护对象
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <h5 className={Styles.baseInfo}>保护区简介</h5>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="简介" {...LONG_FORM_ITEM_LAYOUT}>
                {getFieldDecorator(`protectAreaShortDesc`, {
                  rules: [
                    {
                      required: false,
                      message: '保护现状不能为空',
                    },
                  ],
                })(
                  <TextArea
                    autoSize={{
                      minRows: 4,
                    }}
                    placeholder="请填写保护现状"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default FormComp