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
import Download from '@/components/Download'

import Authorized from '@/utils/Authorized'
import StandardTable from '@/components/StandardTable'
import globalStyles from '@/global.less'

const userStatusValue = { 1: '启用', 2: '停用' }

class TableList extends PureComponent {
  state = {
    columnKeys: [
      'name',
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december',
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
    const firstColumn = {
      title: '序号',
      key: 'number',
      className: 'no-wrap text-center plus-btn',
      fixed: 'left',
      width: 50,
      align: 'center',
      // enableInSelectMode: true,
      render: (text, record, index) => index + 1,
    }
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
      firstColumn,
      ...columns.filter(column => columnKeys.indexOf(column.key) > -1),
      // lastColumn,
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
    const arr = [
      { month: 'october', text: '10月' },
      { month: 'november', text: '11月' },
      { month: 'december', text: '12月' },
      { month: 'january', text: '1月' },
      { month: 'february', text: '2月' },
      { month: 'march', text: '3月' },
      { month: 'april', text: '4月' },
      { month: 'may', text: '5月' },
      { month: 'june', text: '6月' },
      { month: 'july', text: '7月' },
      { month: 'august', text: '8月' },
      { month: 'september', text: '9月' },
    ]
    const monthCol = []
    arr.map(item => {
      return monthCol.push({
        title: item.text,
        dataIndex: item.month,
        key: item.month,
        align: 'center',
        render: text => {
          return !text ? (
            '--'
          ) : (
            <Download action={`/sys/fileManage/downloadFile/${text}`} method="GET">
              {() => (
                <>
                  <a href="javascript:void(0);">下载</a>
                </>
              )}
            </Download>
          )
        },
      })
    })
    const columns = [
      {
        title: '保护区名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
      },
      ...monthCol,
    ]

    const dataSource = {
      ...data,
      list: data.list.map(item => ({
        ...item,
        key: item.id,
      })),
    }

    return (
      <StandardTable
        hideSelectedCount
        selectedMode={selectedMode}
        selectedRows={selectedRows}
        rowSelection={rowSelection}
        scroll={{ x: 'max-content' }}
        loading={loading}
        data={dataSource}
        columns={this.renderColumns(columns)}
        onSelectRow={onSelectRow}
        onPass={onPass}
      />
    )
  }
}

export default TableList
