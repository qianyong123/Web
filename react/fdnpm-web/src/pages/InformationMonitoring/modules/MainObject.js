import React, { PureComponent } from 'react'
// import { string, object, func, bool } from 'prop-types'
import { Input, Form, Row, Col, Select, Icon, message, Upload, Button } from 'antd'
// import moment from 'moment'
import '../index.less'
import Cookies from 'js-cookie'

const { Option } = Select
const { TextArea } = Input

const LONG_FORM_ITEM_LAYOUT = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 21,
  },
}

const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('上传文件格式需为jpg、png!')
  }
  const isLt10M = file.size / 1024 / 1024 < 10
  if (!isLt10M) {
    message.error('文件尺寸不能大于10MB！')
  }
  return isJpgOrPng && isLt10M
}

// mapPropsToFields生成新的验证
@Form.create({})
class MainObject extends PureComponent {
  static defaultProps = {
    item: {},
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  getFileList = () => {
    const {
      item: { photoIds = [], photoPaths = [] },
    } = this.props
    const list = photoIds.map((photo, index) => {
      return {
        fileName: '',
        filePath: photoPaths[index],
        fileSize: '',
        fileType: '',
        id: photo,
        uid: photo,
        status: 'done',
        url: photoPaths[index],
      }
    })
    return list
  }

  normFile = e => {
    let filePaths = []
    if (e && e.fileList) {
      filePaths = e.fileList.map(item => {
        const newItem = { ...item }
        if (newItem.response) {
          const {
            data: { filePath, id },
          } = newItem.response
          newItem.url = filePath
          newItem.id = id
        }
        return { ...newItem }
      })
    }
    return filePaths
  }

  render() {
    const { form, item, delItem } = this.props
    const { getFieldDecorator, getFieldValue } = form

    const flag = false
    const readOnly = false
    // console.log(item)
    const uploadButton = (
      <div>
        <Icon type="plus" style={{ color: '#03B472', fontSize: '36px' }} />
      </div>
    )
    return (
      <div>
        {item &&
          item.map(i => {
            return (
              <Row gutter={24} key={i.sub}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="中文名">
                      {getFieldDecorator(`protectTargetList[${i.sub}].chineseName`, {
                        rules: [
                          {
                            required: flag,
                            message: '中文名不能为空',
                          },
                        ],
                      })(<Input placeholder="请填写中文名" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="学名">
                      {getFieldDecorator(`protectTargetList[${i.sub}].standardName`, {
                        rules: [
                          {
                            required: flag,
                            message: '学名不能为空',
                          },
                        ],
                      })(<Input placeholder="请填写学名" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="英文名">
                      {getFieldDecorator(`protectTargetList[${i.sub}].englishName`, {
                        rules: [
                          {
                            required: flag,
                            message: '英文名不能为空',
                          },
                        ],
                      })(<Input placeholder="请填写英文名" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="俗名">
                      {getFieldDecorator(`protectTargetList[${i.sub}].generalName`, {
                        rules: [
                          {
                            required: flag,
                            message: '俗名不能为空',
                          },
                        ],
                      })(<Input placeholder="请填写俗名" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item label="种属" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
                      <Row>
                        <Col span={8}>
                          {getFieldDecorator(`protectTargetList[${i.sub}].ordo`, {
                            rules: [
                              {
                                required: flag,
                                message: '物种目类不能为空',
                              },
                            ],
                          })(
                            <Input addonAfter="目" placeholder="请输入目类" readOnly={readOnly} />
                          )}
                        </Col>
                        <Col span={8}>
                          {getFieldDecorator(`protectTargetList[${i.sub}].familia`, {
                            rules: [
                              {
                                required: flag,
                                message: '物种科类不能为空',
                              },
                            ],
                          })(
                            <Input addonAfter="科" placeholder="请输入科类" readOnly={readOnly} />
                          )}
                        </Col>
                        <Col span={8}>
                          {getFieldDecorator(`protectTargetList[${i.sub}].genus`, {
                            rules: [
                              {
                                required: flag,
                                message: '物种属类不能为空',
                              },
                            ],
                          })(
                            <Input addonAfter="属" placeholder="请输入属类" readOnly={readOnly} />
                          )}
                        </Col>
                      </Row>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="现有数量">
                      {getFieldDecorator(`protectTargetList[${i.sub}].currentNum`, {
                        rules: [
                          {
                            required: flag,
                            message: '现有数量不能为空',
                          },
                        ],
                      })(<Input placeholder="请填写现有数量" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="保护级别">
                      {getFieldDecorator(`protectTargetList[${i.sub}].protectRank`, {
                        rules: [
                          {
                            required: flag,
                            message: '保护级别不能为空',
                          },
                        ],
                      })(
                        <Select allowClear placeholder="请选择保护等级">
                          {/*{chinaProtectLevel.map(item => (*/}
                          {/*<Option key={item.id} value={item.rankName}>*/}
                          {/*{item.rankName}*/}
                          {/*</Option>*/}
                          {/*))}*/}
                          <Option value="一级">一级</Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="IUCN级别">
                      {getFieldDecorator(`protectTargetList[${i.sub}].iucnRank`, {
                        rules: [
                          {
                            required: flag,
                            message: 'IUCN级别不能为空',
                          },
                        ],
                      })(
                        <Select allowClear placeholder="请选择IUCN级别">
                          {/*{chinaProtectLevel.map(item => (*/}
                          {/*<Option key={item.id} value={item.rankName}>*/}
                          {/*{item.rankName}*/}
                          {/*</Option>*/}
                          {/*))}*/}
                          <Option value="一级">一级</Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="物种简介" {...LONG_FORM_ITEM_LAYOUT}>
                      {getFieldDecorator(`protectTargetList[${i.sub}].shortDesc`, {
                        rules: [
                          {
                            required: flag,
                            message: '物种简介不能为空',
                          },
                        ],
                      })(
                        <TextArea
                          autoSize={{
                            minRows: 4,
                          }}
                          placeholder="请填写物种简介"
                          readOnly={readOnly}
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="形态特征" {...LONG_FORM_ITEM_LAYOUT}>
                      {getFieldDecorator(`protectTargetList[${i.sub}].outside`, {
                        rules: [
                          {
                            required: flag,
                            message: '形态特征不能为空',
                          },
                        ],
                      })(
                        <TextArea
                          autoSize={{
                            minRows: 4,
                          }}
                          placeholder="请填写形态特征"
                          readOnly={readOnly}
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="生境及习性" {...LONG_FORM_ITEM_LAYOUT}>
                      {getFieldDecorator(`protectTargetList[${i.sub}].habit`, {
                        rules: [
                          {
                            required: flag,
                            message: '生境及习性不能为空',
                          },
                        ],
                      })(
                        <TextArea
                          autoSize={{
                            minRows: 4,
                          }}
                          placeholder="请填写生境及习性"
                          readOnly={readOnly}
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="地理分布" {...LONG_FORM_ITEM_LAYOUT}>
                      {getFieldDecorator(`protectTargetList[${i.sub}].geographicalDistribution`, {
                        rules: [
                          {
                            required: flag,
                            message: '地理分布不能为空',
                          },
                        ],
                      })(
                        <TextArea
                          autoSize={{
                            minRows: 4,
                          }}
                          placeholder="请填写地理分布"
                          readOnly={readOnly}
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="保护现状" {...LONG_FORM_ITEM_LAYOUT}>
                      {getFieldDecorator(`protectTargetList[${i.sub}].protectSituation`, {
                        rules: [
                          {
                            required: flag,
                            message: '保护现状不能为空',
                          },
                        ],
                      })(
                        <TextArea
                          autoSize={{
                            minRows: 4,
                          }}
                          placeholder="请填写保护现状"
                          readOnly={readOnly}
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="相关照片" {...LONG_FORM_ITEM_LAYOUT}>
                      {getFieldDecorator(`protectTargetList[${i.sub}].files`, {
                        initialValue: this.getFileList(),
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                        rules: [
                          {
                            required: flag,
                            type: 'array',
                            message: '请选择文件',
                          },
                        ],
                      })(
                        <Upload
                          disabled={readOnly}
                          name="file"
                          listType="picture-card"
                          action="/sys/fileManage/uploadFile"
                          beforeUpload={beforeUpload}
                          headers={{ Authorization: Cookies.get('token') }}
                          multiple={false}
                          showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
                          style={{ width: '33%' }}
                        >
                          {getFieldValue(`protectTargetList[${i.sub}].files`).length < 3
                            ? uploadButton
                            : null}
                        </Upload>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                {item.length > 1 ? (
                  <Col offset={10}>
                    <Button
                      icon="delete"
                      style={{ marginBottom: 20 }}
                      onClick={() => delItem(i.sub)}
                      type="danger"
                    >
                      删除
                    </Button>
                  </Col>
                ) : null}
              </Row>
            )
          })}
      </div>
    )
  }
}

export default MainObject
