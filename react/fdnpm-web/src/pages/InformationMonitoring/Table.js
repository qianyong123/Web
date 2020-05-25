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
    columnKeys: ['id', 'year', 'province', 'gov_rank', 'name', 'org_character', 'money_source'],
  }

  handleColumnsChange = values => {
    this.setState({
      columnKeys: values,
    })
  }

  renderColumns = (columns = []) => {
    const { onView, selectedMode, onEdit, onDelete } = this.props
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
      render: (text, record) => (
        // record.checkStatus == '3' ? null :
        <Fragment>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={() => onView(record.id)}>
                  <Icon type="eye" style={{ color: '#03B472' }} />
                  查看
                </Menu.Item>
                <Menu.Item onClick={() => onEdit(record.id)}>
                  <Icon type="edit" style={{ color: '#03B472' }} />
                  编辑
                </Menu.Item>
                <Menu.Item onClick={() => onDelete(record.id)}>
                  <Icon type="delete" style={{ color: '#ee9800' }} />
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
      onChange,
    } = this.props
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        render(val, record, index) {
          return index + 1
        },
      },
      {
        title: '所属年度',
        dataIndex: 'year',
        key: 'year',
        align: 'center',
      },
      {
        title: '所属省份',
        dataIndex: 'province',
        key: 'province',
        align: 'center',
      },
      {
        title: '保护区级别',
        dataIndex: 'gov_rank',
        key: 'gov_rank',
        align: 'center',
      },
      {
        title: '单位名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
      },
      {
        title: '单位性质',
        dataIndex: 'org_character',
        key: 'org_character',
        align: 'center',
      },
      {
        title: '经费来源',
        dataIndex: 'money_source',
        key: 'money_source',
        align: 'center',
        // render: (text, itemRecord) => (
        //   <Fragment>
        //     {itemRecord.checkStatus == '0' ? '未上报' : itemRecord.checkStatus == '1' ? '已上报' : itemRecord.checkStatus == '2' ? '已通过' : '被驳回'}
        //   </Fragment>
        // ),
      },
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
        onChange={onChange}
      />
    )
  }
}

export default TableList