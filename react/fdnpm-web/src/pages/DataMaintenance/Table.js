import React, { PureComponent, Fragment, useState } from 'react'
import {
  Dropdown,
  Menu,
  Divider,
  Button,
  Popover,
  Icon,
  Checkbox,
  Tag,
  Tooltip,
  Switch,
} from 'antd'
import moment from 'moment'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import tableStyles from '@/styles/table.less'

import Authorized from '@/utils/Authorized'
import StandardTable from '@/components/StandardTable'
import globalStyles from '@/global.less'

const userStatusValue = { 1: '启用', 2: '停用' }

class TableList extends PureComponent {
  state = {
    columnKeys: [
      'surveyYear',
      'taskName',
      'taskTypeName',
      'principalName',
      'companyName',
      'surveyTimePlan',
      'surveyTimeReality',
      'checkStatus',
    ],
  }

  handleColumnsChange = values => {
    this.setState({
      columnKeys: values,
    })
  }

  renderColumns = (columns = []) => {
    const { onView, onPass, onBack, selectedMode } = this.props
    const { columnKeys } = this.state
    const columnsSetting = (
      <Checkbox.Group
        value={columnKeys}
        options={columns
          .filter(item => !selectedMode || (selectedMode && item.enableInSelectMode))
          .map(column => ({
            label: column.title,
            value: column.key,
          }))}
        onChange={this.handleColumnsChange}
      />
    )
    const lastColumn = {
      title: '操作',
      key: 'actions',
      align: 'center',
      width: 130,
      className: globalStyles.tableActions,
      fixed: 'right',
      render: (text, record) =>
        record.checkStatus == '3' ? null : (
          <Fragment>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item onClick={() => onPass([record.id])}>
                    <Icon type="check-circle" style={{ color: '#03B472' }} />
                    编辑
                  </Menu.Item>
                  <Menu.Item onClick={() => onBack(record.id)}>
                    <Icon type="sync" style={{ color: '#ee9800' }} />
                    删除
                  </Menu.Item>
                </Menu>
              }
            >
              <Button type="link" size="small">
                操作
                <Icon type="down" />
              </Button>
            </Dropdown>
          </Fragment>
        ),
    }

    return [
      // firstColumn,
      ...columns.filter(column => columnKeys.indexOf(column.key) > -1),
      lastColumn,
    ].filter(item => !selectedMode || (selectedMode && item.enableInSelectMode))
  }

  render() {
    const {
      selectedMode,
      selectedRows,
      rowSelection,
      data,
      loading,
      onSelectRow,
      onPass,
      onSwitch,
    } = this.props
    const columns = [
      {
        title: '一级指标',
        dataIndex: 'surveyYear',
        key: 'surveyYear',
        align: 'center',
      },
      {
        title: '二级指标',
        dataIndex: 'taskName',
        key: 'taskName',
        align: 'center',
      },
      {
        title: '单位',
        dataIndex: 'taskTypeName',
        key: 'taskTypeName',
        align: 'center',
      },
      {
        title: '创建人',
        dataIndex: 'principalName',
        key: 'principalName',
        align: 'center',
      },
      {
        title: '创建时间',
        dataIndex: 'companyName',
        key: 'companyName',
        align: 'center',
      },
      {
        title: '状态',
        dataIndex: 'checkStatus',
        key: 'checkStatus',
        align: 'center',
        render: (text, itemRecord) => (
          <Fragment>
            {itemRecord.checkStatus == '0'
              ? '未上报'
              : itemRecord.checkStatus == '1'
              ? '已上报'
              : itemRecord.checkStatus == '2'
              ? '已通过'
              : '被驳回'}
          </Fragment>
        ),
      },
    ]

    // const dataSource = {
    //   ...data,
    //   list: data.list.map(item => ({
    //     ...item,
    //     key: item.id,
    //   })),
    // }

    return (
      <StandardTable
        hideSelectedCount
        selectedMode={selectedMode}
        selectedRows={selectedRows}
        scroll={{ x: 'max-content' }}
        loading={loading}
        data={[]}
        columns={this.renderColumns(columns)}
        onSelectRow={onSelectRow}
        onPass={onPass}
      />
    )
  }
}

export default TableList
