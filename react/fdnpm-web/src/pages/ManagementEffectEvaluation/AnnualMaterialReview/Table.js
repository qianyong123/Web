import React, { PureComponent, Fragment } from 'react'
// import Authorized from '@/utils/Authorized'
import StandardTable from '@/components/StandardTable'
import globalStyles from '@/global.less'
import Download from '@/components/Download'
import { Button, Icon, Menu, Dropdown } from 'antd'

class TableList extends PureComponent {
  state = {
    columnKeys: ['province', 'name', 'fileMessage'],
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
        title: '所属省市',
        dataIndex: 'province',
        key: 'province',
        align: 'center',
      },
      {
        title: '单位名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
      },
      {
        title: '附件',
        dataIndex: 'fileMessage',
        key: 'fileMessage',
        align: 'center',
        render: text => {
          const fileList = text ? JSON.parse(text) : []
          return (
            <Fragment>
              {fileList.map(item => {
                return (
                  <Download
                    style={{ marginRight: '10px' }}
                    action={`/sys/fileManage/downloadFile/${item.id}`}
                    method="GET"
                  >
                    {options => (
                      <>
                        <Icon type="download" style={{ color: '#03B472' }} {...options} />
                        <a href="javascript:void(0);">{item.name};</a>
                      </>
                    )}
                  </Download>
                )
              })}
            </Fragment>
          )
        },
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