import React, { PureComponent } from 'react'
// import { string, object, func, bool } from 'prop-types'
import { Input, Form, Row, Col, Select, DatePicker, Radio } from 'antd'

// import moment from 'moment'

const { Option } = Select

import Style from './style.less'

// mapPropsToFields生成新的验证
@Form.create({})
class BaseFrom extends PureComponent {
  static defaultProps = {
    item: {},
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form

    const ordinary = false

    return (
      <div>
        <Row gutter={24}>
          <Row>
            <Col span={12}>
              <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="保护区名称">
                {getFieldDecorator('name', {
                  validateTrigger: ['onChange', 'onBlur'],
                  // initialValue: editData['demoAreaName'],
                  rules: [
                    {
                      required: ordinary,
                      type: 'string',
                      message: '保护区名称不能为空',
                    },
                  ],
                })(
                  <Input
                    // maxLength={20}
                    style={{ width: '100%' }}
                    placeholder="请输入保护区名称"
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="所属年度">
                {getFieldDecorator('year', {
                  validateTrigger: ['onChange', 'onBlur'],
                  // initialValue: editData['adjustFlag'],
                  rules: [
                    {
                      required: ordinary,
                      // type: 'string',
                      message: '请选择',
                    },
                  ],
                })(
                  <Select
                    placeholder="请选择"
                    defaultActiveFirstOption={false}
                    filterOption={false}
                  >
                    <Option value={2020}>2020</Option>
                    <Option value={2019}>2019</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="保护区行政级别">
                {getFieldDecorator('govRank', {
                  validateTrigger: ['onChange', 'onBlur'],
                  // initialValue: editData['adjustFlag'],
                  rules: [
                    {
                      required: ordinary,
                      // type: 'string',
                      message: '请选择',
                    },
                  ],
                })(
                  <Select
                    placeholder="请选择"
                    defaultActiveFirstOption={false}
                    filterOption={false}
                  >
                    <Option value="处级">处级</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="所属省份">
                {getFieldDecorator('province', {
                  validateTrigger: ['onChange', 'onBlur'],
                  // initialValue: editData['adjustFlag'],
                  rules: [
                    {
                      required: ordinary,
                      message: '请选择',
                    },
                  ],
                })(
                  <Select
                    placeholder="请选择"
                    defaultActiveFirstOption={false}
                    filterOption={false}
                  >
                    <Option value="四川省">四川省</Option>
                    <Option value="云南省">云南省</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="保护区类别">
                {getFieldDecorator('category', {
                  // initialValue: [item['sampleTotal']],
                  // initialValue: editData['authDate'] ? moment(editData['authDate']) : null,
                  rules: [
                    {
                      required: ordinary,
                      message: '请输入批准时间',
                    },
                  ],
                })(
                  <Radio.Group style={{ marginLeft: 10 }}>
                    <Radio value="内陆">内陆</Radio>
                    <Radio value="海洋">海洋</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="所在行政区">
                {getFieldDecorator('district', {
                  validateTrigger: ['onChange', 'onBlur'],
                  // initialValue: editData['adjustFlag'],
                  rules: [
                    {
                      required: ordinary,
                      type: 'string',
                      message: '请输入所在行政区',
                    },
                  ],
                })(
                  <Input maxLength={20} style={{ width: '100%' }} placeholder="请输入所在行政区" />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="当前级别批准时间">
                {getFieldDecorator('agreeTime', {
                  // initialValue: [item['sampleTotal']],
                  // initialValue: editData['adjustDate'] ? moment(editData['adjustDate']) : null,
                  rules: [
                    {
                      required: ordinary,
                      message: '选择时间',
                    },
                  ],
                })(
                  <DatePicker
                    style={{ width: '100%' }}
                    // showTime
                    // format="YYYY-MM-DD HH:mm:ss"
                    placeholder="选择时间"
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="当前级别批准文号">
                {getFieldDecorator('agreeText', {
                  // initialValue: editData['location'],
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                    {
                      required: ordinary,
                      message: '请输入当前级别批准文号',
                    },
                  ],
                })(
                  <Input
                    // maxLength={20}
                    style={{ width: '100%' }}
                    placeholder="请输入当前级别批准文号"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                label="设立以来是否有过调整"
              >
                {getFieldDecorator('isAdjust', {
                  // initialValue: [item['sampleTotal']],
                  // initialValue: editData['adjustDate'] ? moment(editData['adjustDate']) : null,
                  rules: [
                    {
                      required: ordinary,
                      message: '请选择',
                    },
                  ],
                })(
                  <Select
                    placeholder="请选择"
                    defaultActiveFirstOption={false}
                    filterOption={false}
                  >
                    <Option value="Y">是</Option>
                    <Option value="N">否</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="调整时间">
                {getFieldDecorator('adjustTime', {
                  // initialValue: editData['location'],
                  // validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                    {
                      required: false,
                      message: '请选择时间',
                    },
                  ],
                })(
                  <DatePicker
                    style={{ width: '100%' }}
                    // showTime
                    // format="YYYY-MM-DD HH:mm:ss"
                    placeholder="选择时间"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="所属水系">
                {getFieldDecorator('riverSystem', {
                  // initialValue: [item['sampleTotal']],
                  // initialValue: editData['adjustDate'] ? moment(editData['adjustDate']) : null,
                  rules: [
                    {
                      required: ordinary,
                      message: '请输入所属水系',
                    },
                  ],
                })(
                  <Input
                    // maxLength={20}
                    style={{ width: '100%' }}
                    placeholder="请输入所属水系"
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="所属流域">
                {getFieldDecorator('basin', {
                  // initialValue: editData['location'],
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                    {
                      required: ordinary,
                      message: '请输入所属流域',
                    },
                  ],
                })(
                  <Input
                    // maxLength={20}
                    style={{ width: '100%' }}
                    placeholder="请输入所属流域"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} label="地理位置">
                {getFieldDecorator('geolocation', {
                  // initialValue: [item['sampleTotal']],
                  // initialValue: editData['adjustDate'] ? moment(editData['adjustDate']) : null,
                  rules: [
                    {
                      required: ordinary,
                      message: '请输入地理位置',
                    },
                  ],
                })(
                  <Input
                    // maxLength={20}
                    style={{ width: '100%' }}
                    placeholder="请输入地理位置"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                label="保护区管理机构名称"
              >
                {getFieldDecorator('orgName', {
                  // initialValue: [item['sampleTotal']],
                  // initialValue: editData['adjustDate'] ? moment(editData['adjustDate']) : null,
                  rules: [
                    {
                      required: ordinary,
                      message: '请输入内容',
                    },
                  ],
                })(
                  <Input
                    // maxLength={20}
                    style={{ width: '100%' }}
                    placeholder="请输入内容"
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                label="是否经过编制部门批准"
              >
                {getFieldDecorator('isEstablishmentAgree', {
                  // initialValue: editData['location'],
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                    {
                      required: ordinary,
                      message: '请选择',
                    },
                  ],
                })(
                  <Select
                    placeholder="请选择"
                    defaultActiveFirstOption={false}
                    filterOption={false}
                  >
                    <Option value="Y">是</Option>
                    <Option value="N">否</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                label="保护区管理机构级别"
              >
                {getFieldDecorator('orgRank', {
                  // initialValue: [item['sampleTotal']],
                  // initialValue: editData['adjustDate'] ? moment(editData['adjustDate']) : null,
                  rules: [
                    {
                      required: ordinary,
                      message: '请选择',
                    },
                  ],
                })(
                  <Select
                    placeholder="请选择"
                    defaultActiveFirstOption={false}
                    filterOption={false}
                  >
                    <Option value="处级">处级</Option>
                    <Option value="副处级">副处级</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="隶属关系">
                {getFieldDecorator('affiliation', {
                  // initialValue: editData['location'],
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                    {
                      required: ordinary,
                      message: '请输入隶属关系',
                    },
                  ],
                })(<Input style={{ width: '100%' }} placeholder="请输入隶属关系" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} label="管理机构单位性质">
                {getFieldDecorator('orgCharacter', {
                  // initialValue: [item['sampleTotal']],
                  // initialValue: editData['adjustDate'] ? moment(editData['adjustDate']) : null,
                  rules: [
                    {
                      required: ordinary,
                      message: '请输入地理位置',
                    },
                  ],
                })(
                  <Select
                    placeholder="请选择"
                    defaultActiveFirstOption={false}
                    filterOption={false}
                  >
                    <Option value="处级">处级</Option>
                    <Option value="副处级">副处级</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="经费来源">
                {getFieldDecorator('moneySource', {
                  // initialValue: [item['sampleTotal']],
                  // initialValue: editData['adjustDate'] ? moment(editData['adjustDate']) : null,
                  rules: [
                    {
                      required: ordinary,
                      message: '请选择',
                    },
                  ],
                })(
                  <Select
                    placeholder="请选择"
                    defaultActiveFirstOption={false}
                    filterOption={false}
                  >
                    <Option value="拨款">拨款</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="是否收支两条线">
                {getFieldDecorator('isTwoRoute', {
                  // initialValue: editData['location'],
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                    {
                      required: ordinary,
                      message: '请选择',
                    },
                  ],
                })(
                  <Select
                    placeholder="请选择"
                    defaultActiveFirstOption={false}
                    filterOption={false}
                  >
                    <Option value="Y">是</Option>
                    <Option value="N">否</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                label="保护区管理机构负责人"
              >
                {getFieldDecorator('orgHead', {
                  rules: [
                    {
                      required: ordinary,
                      message: '请输入内容',
                    },
                  ],
                })(<Input maxLength={20} style={{ width: '100%' }} placeholder="请输入内容" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="总资产">
                {getFieldDecorator('totalMoney', {
                  // initialValue: editData['location'],
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                    {
                      required: ordinary,
                      message: '请选择',
                    },
                  ],
                })(
                  <Input
                    addonAfter="万元"
                    maxLength={20}
                    style={{ width: '100%' }}
                    placeholder="请输入内容"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                label="是否有专项管护经费"
              >
                {getFieldDecorator('isOperationMoney', {
                  rules: [
                    {
                      required: ordinary,
                      message: '请选择',
                    },
                  ],
                })(
                  <Select
                    placeholder="请选择"
                    defaultActiveFirstOption={false}
                    filterOption={false}
                  >
                    <Option value="Y">是</Option>
                    <Option value="N">否</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                label="保护区管理机构邮编"
              >
                {getFieldDecorator('orgPostcode', {
                  // initialValue: editData['location'],
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                    {
                      required: ordinary,
                      message: '请选择',
                    },
                  ],
                })(
                  <Input
                    // maxLength={20}
                    style={{ width: '100%' }}
                    placeholder="请输入内容"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
                label="保护区管理机构地址"
              >
                {getFieldDecorator('orgAddress', {
                  // initialValue: [item['sampleTotal']],
                  // initialValue: editData['adjustDate'] ? moment(editData['adjustDate']) : null,
                  rules: [
                    {
                      required: ordinary,
                      message: '请输入保护区管理机构地址',
                    },
                  ],
                })(
                  <Input
                    // maxLength={20}
                    style={{ width: '100%' }}
                    placeholder="请输入保护区管理机构地址"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                label="保护区管理机构传真"
              >
                {getFieldDecorator('orgFax', {
                  rules: [
                    {
                      required: ordinary,
                      message: '请输入内容',
                    },
                  ],
                })(
                  <Input
                    // maxLength={20}
                    style={{ width: '100%' }}
                    placeholder="请输入内容"
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                label="保护区管理机构邮箱"
              >
                {getFieldDecorator('orgEmail', {
                  // initialValue: editData['location'],
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                    {
                      required: ordinary,
                      message: '请选择',
                    },
                  ],
                })(
                  <Input
                    // maxLength={20}
                    style={{ width: '100%' }}
                    placeholder="请输入内容"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={7}>
              <div style={{ display: 'flex' }}>
                <Form.Item labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="北纬">
                  {getFieldDecorator('northernLatitude[0]', {
                    rules: [
                      {
                        required: ordinary,
                        message: '请输入内容',
                      },
                    ],
                  })(
                    <Input
                      // maxLength={20}
                      style={{ width: '100%' }}
                      placeholder="请输入内容"
                    />
                  )}
                </Form.Item>
                <span className={Style.baseFormSpan}>度</span>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ display: 'flex' }}>
                <Form.Item wrapperCol={{ span: 24 }}>
                  {getFieldDecorator('northernLatitude[1]', {
                    rules: [
                      {
                        required: ordinary,
                        message: '请输入内容',
                      },
                    ],
                  })(
                    <Input
                      // maxLength={20}
                      style={{ width: '100%' }}
                      placeholder="请输入内容"
                    />
                  )}
                </Form.Item>
                <span className={Style.baseFormSpan}>分</span>
                <span className={Style.baseFormSpanSegmentation}>至</span>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ display: 'flex' }}>
                <Form.Item wrapperCol={{ span: 22 }}>
                  {getFieldDecorator('northernLatitude[2]', {
                    rules: [
                      {
                        required: ordinary,
                        message: '请输入内容',
                      },
                    ],
                  })(
                    <Input
                      // maxLength={20}
                      style={{ width: '100%' }}
                      placeholder="请输入内容"
                    />
                  )}
                </Form.Item>
                <span className={Style.baseFormSpan}>度</span>
              </div>
            </Col>
            <Col span={5}>
              <div style={{ display: 'flex' }}>
                <Form.Item wrapperCol={{ span: 22 }}>
                  {getFieldDecorator('northernLatitude[3]', {
                    rules: [
                      {
                        required: ordinary,
                        message: '请输入内容',
                      },
                    ],
                  })(
                    <Input
                      // maxLength={20}
                      style={{ width: '100%' }}
                      placeholder="请输入内容"
                    />
                  )}
                </Form.Item>
                <span className={Style.baseFormSpan}>分</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={7}>
              <div style={{ display: 'flex' }}>
                <Form.Item labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="东经">
                  {getFieldDecorator('estLongitude[0]', {
                    rules: [
                      {
                        required: ordinary,
                        message: '请输入内容',
                      },
                    ],
                  })(
                    <Input
                      // maxLength={20}
                      style={{ width: '100%' }}
                      placeholder="请输入内容"
                    />
                  )}
                </Form.Item>
                <span className={Style.baseFormSpan}>度</span>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ display: 'flex' }}>
                <Form.Item wrapperCol={{ span: 24 }}>
                  {getFieldDecorator('estLongitude[1]', {
                    rules: [
                      {
                        required: ordinary,
                        message: '请输入内容',
                      },
                    ],
                  })(
                    <Input
                      // maxLength={20}
                      style={{ width: '100%' }}
                      placeholder="请输入内容"
                    />
                  )}
                </Form.Item>
                <span className={Style.baseFormSpan}>分</span>
                <span className={Style.baseFormSpanSegmentation}>至</span>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ display: 'flex' }}>
                <Form.Item wrapperCol={{ span: 22 }}>
                  {getFieldDecorator('estLongitude[2]', {
                    rules: [
                      {
                        required: ordinary,
                        message: '请输入内容',
                      },
                    ],
                  })(
                    <Input
                      // maxLength={20}
                      style={{ width: '100%' }}
                      placeholder="请输入内容"
                    />
                  )}
                </Form.Item>
                <span className={Style.baseFormSpan}>度</span>
              </div>
            </Col>
            <Col span={5}>
              <div style={{ display: 'flex' }}>
                <Form.Item wrapperCol={{ span: 22 }}>
                  {getFieldDecorator('estLongitude[3]', {
                    rules: [
                      {
                        required: ordinary,
                        message: '请输入内容',
                      },
                    ],
                  })(
                    <Input
                      // maxLength={20}
                      style={{ width: '100%' }}
                      placeholder="请输入内容"
                    />
                  )}
                </Form.Item>
                <span className={Style.baseFormSpan}>分</span>
              </div>
            </Col>
          </Row>
        </Row>
      </div>
    )
  }
}

export default BaseFrom