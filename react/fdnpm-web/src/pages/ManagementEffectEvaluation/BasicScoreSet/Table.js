import React, { PureComponent, Fragment } from 'react'
// import Authorized from '@/utils/Authorized'
import StandardTable from '@/components/StandardTable'
import globalStyles from '@/global.less'
import { Button, Icon, Menu, Dropdown } from 'antd'

class TableList extends PureComponent {
  state = {
    columnKeys: ['targetSortType', 'targetName', 'examContent', 'weight'],
  }

  handleColumnsChange = values => {
    this.setState({
      columnKeys: values,
    })
  }

  renderColumns = (columns = []) => {
    // const { onView, onPass, onBack, selectedMode } = this.props
    const { columnKeys } = this.state
    const { onEdit, onDelete } = this.props
    const firstColumn = {
      title: '序号',
      key: 'number',
      className: 'no-wrap text-center plus-btn',
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
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={() => onEdit(record.id)}>
                  <Icon type="edit" style={{ color: '#03B472' }} />
                  编辑
                </Menu.Item>
                <Menu.Item onClick={() => onDelete(record.id)}>
                  <Icon type="delete" style={{ color: '#03B472' }} />
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
      lastColumn,
    ]
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
        title: '分类类别',
        dataIndex: 'targetSortType',
        key: 'targetSortType',
        align: 'center',
      },
      {
        title: '指标名称',
        dataIndex: 'targetName',
        key: 'targetName',
        align: 'center',
      },
      {
        title: '考核内容',
        dataIndex: 'examContent',
        key: 'examContent',
        align: 'center',
      },
      {
        title: '权重',
        dataIndex: 'weight',
        key: 'weight',
        align: 'center',
      },
    ]

    return (
      <StandardTable
        hideSelectedCount
        selectedMode={selectedMode}
        selectedRows={selectedRows}
        rowSelection={rowSelection}
        scroll={{ x: 'max-content' }}
        loading={loading}
        data={data}
        columns={this.renderColumns(columns)}
        onSelectRow={onSelectRow}
        onPass={onPass}
        onChange={onChange}
      />
    )
  }
}

export default TableList
