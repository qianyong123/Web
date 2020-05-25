import React, { Fragment, PureComponent } from 'react'
import { string, object, func, bool } from 'prop-types'
import { Button, Form, Input, Modal } from 'antd'
import globalStyles from '@/global.less'
import Styles from './view.less'

const FormItem = Form.Item
const styles = { marginBottom: '0' }

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

  disposeGrade = item => {
    const table = []
    const { targetNameList = [], targetSortType, score } = item
    targetNameList.forEach(item2 => {
      const examContentList = item2.examContentList || []
      examContentList.forEach((item3, index3) => {
        const obj = {
          targetSortType: `${targetSortType} ${score}`,
          targetName: `${item2.targetName} ${item2.score}`,
          examContent: `${item3.examContent}`,
          score: `${item3.score}`,
        }
        if (index3 === 0) obj.len2 = examContentList.length
        table.push(obj)
      })
    })

    if (table.length > 0) table[0].len = table.length
    return table
  }

  handleSubmit = e => {
    e.preventDefault()

    const { form, submitForm, item, basicsGradeList } = this.props
    return form.validateFieldsAndScroll((err, values) => {
      const { gradeList } = values
      if (!err) {
        gradeList.map((score, index) => {
          basicsGradeList[index].score = score
          return false
        })
        console.log(item.id, basicsGradeList)
        submitForm(item.id, basicsGradeList)
      }
    })
  }

  render() {
    const { form, title, modalVisible, onCancelClick, basicsGradeList, modalType } = this.props
    const { getFieldDecorator } = form
    return (
      <Modal
        destroyOnClose
        footer={
          modalType === 'edit' && [
            <Button type="primary" value="已保存" onClick={this.handleSubmit}>
              提交
            </Button>,
            <Button style={{ marginLeft: '16px' }} onClick={onCancelClick}>
              取消
            </Button>,
          ]
        }
        title={title}
        visible={modalVisible}
        onOk={this.handleOk}
        onCancel={onCancelClick}
        width="1000px"
      >
        <table className={Styles.table} style={{ marginTop: '20px' }}>
          <thead>
            <th className={`${Styles.tableTh}`}>分类类别</th>
            <th className={`${Styles.tableTh}`}>指标名称</th>
            <th style={{ width: '40%' }} className={`${Styles.tableTh}`}>
              考核内容
            </th>
            <th className={Styles.tableTh}>得分</th>
          </thead>
          <tbody>
            <Fragment>
              {basicsGradeList.map((obj, index) => {
                return (
                  <tr className={Styles.tableRow}>
                    {obj.len && (
                      <td rowSpan={obj.len} className={Styles.tableCell}>
                        {obj.targetSortType}
                      </td>
                    )}
                    {obj.len2 && (
                      <td rowSpan={obj.len2} className={Styles.tableCell}>
                        {obj.targetName}
                      </td>
                    )}
                    <td style={{ width: '50%' }} className={Styles.tableCell}>
                      {obj.examContent}
                    </td>

                    <td style={{ width: '10%' }} className={Styles.tableCell}>
                      <FormItem style={styles}>
                        {getFieldDecorator(`gradeList[${index}]`, {
                          initialValue: obj.score,
                        })(<Input disabled={modalType === 'view'} type="number" />)}
                      </FormItem>
                    </td>
                  </tr>
                )
              })}
            </Fragment>
          </tbody>
        </table>
      </Modal>
    )
  }
}

export default FormComp
