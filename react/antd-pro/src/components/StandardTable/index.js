import React, { PureComponent } from 'react'
import ResizableTable from '@/components/ResizableTable'
import styles from './index.less'

function initTotalList(columns) {
  const totalList = []
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 })
    }
  })
  return totalList
}

class StandardTable extends PureComponent {
  constructor(props) {
    super(props)
    const { columns } = props
    const needTotalList = initTotalList(columns)

    this.state = {
      selectedRowKeys: props.selectedRowKeys ? props.selectedRowKeys : [],
      needTotalList,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // clean state
    if (nextProps.selectedRows && nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns)
      return {
        selectedRowKeys: [],
        needTotalList,
      }
    }
    if (nextProps.selectedRowKeys !== prevState.prevSelectedRowKeys) {
      return {
        selectedRowKeys: nextProps.selectedRowKeys,
        prevSelectedRowKeys: nextProps.selectedRowKeys,
      }
    }
    return null
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    let { needTotalList } = this.state
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
    }))
    const { onSelectRow } = this.props
    if (onSelectRow) {
      onSelectRow(selectedRows)
    }

    this.setState({ selectedRowKeys, needTotalList })
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props
    if (onChange) {
      onChange(pagination, filters, sorter)
    }
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], [])
  }

  onRow = () => ({
    onClick: e => {
      e.stopPropagation()

      const input = e.target.parentNode.firstChild.querySelector('input')

      if (input) {
        input.click()
      }
    }, // 点击行
    onMouseEnter: () => {}, // 鼠标移入行
  })

  render() {
    const { selectedRowKeys, needTotalList } = this.state
    const { data = {}, rowKey, hideSelectedCount, selectedMode, columnTitle, ...rest } = this.props
    const { list = [], pagination } = data

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    }

    const rowSelection = {
      type: selectedMode,
      columnTitle,
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    }

    return (
      <div className={styles.standardTable}>
        {/* <Table
          rowKey={rowKey || 'key'}
          rowSelection={rowSelection}
          dataSource={list}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          size="small"
          {...rest}
        /> */}
        <ResizableTable
          rowKey={rowKey || 'key'}
          rowSelection={rowSelection}
          dataSource={list}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          // onRow={this.onRow}
          {...rest}
        />
      </div>
    )
  }
}

export default StandardTable
