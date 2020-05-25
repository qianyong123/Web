import React, { PureComponent, Fragment } from 'react'
import Authorized from '@/utils/Authorized'
import StandardTable from '@/components/StandardTable'
import globalStyles from '@/global.less'
import { Button, Icon, Menu, Dropdown } from 'antd'
class TableList extends PureComponent {
  state = {
    columnKeys: [
      'protectionZone',
      'buildCategory',
      'buildAim',
      'inputer',
      'inputerTime',
      'buildStatus',
    ],
  }

  handleColumnsChange = values => {
    this.setState({
      columnKeys: values,
    })
  }

  renderColumns = (columns = []) => {
    // const { onView, onPass, onBack, selectedMode } = this.props
    const { columnKeys } = this.state
    const { onAudit, onEdit, onDelete, onView, onAdd } = this.props
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
      render: (text, record) => {
        const status = record.buildStatus
        const edit = status !== '已保存' && status !== '退回' && status !== '已撤回'
        const audit = status !== '已提交'
        return (
          <Fragment>
            <Dropdown
              overlay={
                <Menu>
                  {/* {Authorized.check(
                  'fdsbsf:button:species_update',
                  <Menu.Item onClick={() => onEdit(record.id)} key="edit">
                    <Icon type="edit" style={{ color: '#03B472' }} />
                    编辑
                  </Menu.Item>,
                )}             */}
                  <Menu.Item disabled={record.buildStatus} onClick={() => onAdd(record.id)}>
                    <Icon type="plus" style={{ color: '#03B472' }} />
                    新增
                  </Menu.Item>
                  <Menu.Item disabled={edit} onClick={() => onEdit(record.id)}>
                    <Icon type="edit" style={{ color: '#03B472' }} />
                    编辑
                  </Menu.Item>

                  <Menu.Item onClick={() => onView(record.id)}>
                    <Icon type="file-search" style={{ color: '#03B472' }} />
                    详情
                  </Menu.Item>
                  <Menu.Item disabled={audit} onClick={() => onAudit(record.id)}>
                    <Icon type="audit" style={{ color: '#03B472' }} />
                    审核
                  </Menu.Item>
                  <Menu.Item disabled={edit} onClick={() => onDelete(record.id)}>
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
        )
      },
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
        title: '保护区名称',
        dataIndex: 'protectionZone',
        key: 'protectionZone',
        align: 'center',
      },
      {
        title: '建设类别',
        dataIndex: 'buildCategory',
        key: 'buildCategory',
        align: 'center',
      },
      {
        title: '建设目的',
        dataIndex: 'buildAim',
        key: 'buildAim',
        align: 'center',
      },
      {
        title: '操作人',
        dataIndex: 'inputer',
        key: 'inputer',
        align: 'center',
      },
      {
        title: '操作时间',
        dataIndex: 'inputerTime',
        key: 'inputerTime',
        align: 'center',
      },

      {
        title: '状态',
        dataIndex: 'buildStatus',
        key: 'buildStatus',
        align: 'center',
        // render: (text, itemRecord) => (
        //   <Fragment>
        //     {itemRecord.checkStatus == '0' ?
        //     '未上报' : itemRecord.checkStatus == '1' ?
        //     '已上报' : itemRecord.checkStatus == '2' ?
        //     '已通过' : '被驳回'}
        //   </Fragment>
        // ),
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