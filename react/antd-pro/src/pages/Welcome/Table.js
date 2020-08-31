import React, { PureComponent, Fragment, useState } from 'react'
import { Divider, Button, Popover, Icon, Checkbox, Tag, Tooltip } from 'antd'
import moment from 'moment'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import tableStyles from '@/styles/table.less'

import Authorized from '@/utils/Authorized'
import StandardTable from '@/components/StandardTable'
import globalStyles from '@/global.less'

const userStatusValue = { 1: '正常', 2: '禁用' }

const PasswordArea = props => {
  const { text } = props
  const [visible, setVisible] = useState(false)
  const [tooltipTitle, setTooltipTitle] = useState('复制密码')
  return (
    <Fragment>
      <Icon
        type={visible ? 'eye' : 'eye-invisible'}
        twoToneColor="#52c41a"
        onClick={() => setVisible(!visible)}
      />
      <CopyToClipboard text={text} onCopy={() => setTooltipTitle('复制成功')}>
        <Tooltip
          title={tooltipTitle}
          placement="left"
          onVisibleChange={state => state || setTooltipTitle('复制密码')}
        >
          {visible ? (
            <Button size="small" type="link">
              {text}
            </Button>
          ) : null}
        </Tooltip>
      </CopyToClipboard>
    </Fragment>
  )
}

class TableList extends PureComponent {
  state = {
    columnKeys: [
      'username',
      'initPassword',
      'nickname',
      'roleNames',
      'organizationName',
      'mobile',
      'status',
    ],
  }

  handleColumnsChange = values => {
    this.setState({
      columnKeys: values,
    })
  }

  renderColumns = (columns = []) => {
    const { onDelete, onEdit, onReset, selectedMode } = this.props
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
      title: (
        <Popover
          overlayClassName={tableStyles.columnSetting}
          placement="bottomLeft"
          content={columnsSetting}
          title="列设置（勾选的列会在表格中显示）"
        >
          <Icon type="setting" />
        </Popover>
      ),
      key: 'number',
      className: 'no-wrap text-center plus-btn',
      fixed: 'left',
      width: 50,
      align: 'center',
      enableInSelectMode: true,
      render: (text, record, index) => index + 1,
    }
    const lastColumn = {
      title: '操作',
      key: 'actions',
      align: 'center',
      width: 130,
      className: globalStyles.tableActions,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          {/* <Button
            shape="circle"
            icon="search"
            size="small"
            title="查看"
            onClick={() => onView([record.id])}
          />
          <Divider type="vertical" /> */}
          <Authorized authority="sys:user:update">
            <Button
              shape="circle"
              icon="edit"
              size="small"
              title="编辑"
              onClick={() => onEdit([record.id])}
            />
            <Divider type="vertical" />
          </Authorized>
          <Button
            shape="circle"
            icon="tool"
            size="small"
            title="重置密码"
            onClick={() => onReset([record.id])}
          />
          <Authorized authority="sys:user:delete">
            <Divider type="vertical" />
            <Button
              shape="circle"
              icon="delete"
              size="small"
              title="删除"
              onClick={() => onDelete([record.id])}
            />
          </Authorized>
        </Fragment>
      ),
    }

    return [
      firstColumn,
      ...columns.filter(column => columnKeys.indexOf(column.key) > -1),
      lastColumn,
    ].filter(item => !selectedMode || (selectedMode && item.enableInSelectMode))
  }

  render() {
    const { selectedMode, selectedRows, data, loading, onSelectRow, onChange } = this.props
    const columns = [
      {
        title: '账号',
        dataIndex: 'username',
        key: 'username',
        width: 100,
      },
      {
        title: '初始密码',
        dataIndex: 'initPassword',
        key: 'initPassword',
        width: 150,
        render: text => <PasswordArea text={text} />,
      },
      {
        title: '用户姓名',
        key: 'nickname',
        dataIndex: 'nickname',
      },
      {
        title: '角色',
        dataIndex: 'roleNames',
        key: 'roleNames',
      },
      {
        title: '机构组织',
        dataIndex: 'organizationName',
        key: 'organizationName',
      },
      {
        title: '电话',
        dataIndex: 'mobile',
        key: 'mobile',
        width: 120,
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        render: text => moment(text).format('YYYY-MM-DD'),
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: text => <Tag color={text === '1' ? 'green' : 'red'}>{userStatusValue[text]}</Tag>,
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
        scroll={{ x: 'max-content' }}
        loading={loading}
        data={dataSource}
        columns={this.renderColumns(columns)}
        onSelectRow={onSelectRow}
        onChange={onChange}
      />
    )
  }
}

export default TableList
