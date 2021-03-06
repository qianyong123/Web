import React, { PureComponent } from 'react'
import { Table } from 'antd'
import Draggable from 'react-draggable'

import styles from './index.less'

class ResizableTable extends PureComponent {
  ths = []

  state = {
    widths: {},
  }

  handleDrag = (i, data) => {
    if (this.ths[i]) {
      const { widths } = this.state
      const thNode = this.ths[i].closest('th')

      this.setState({
        widths: {
          ...widths,
          [i]: thNode.clientWidth + data.deltaX,
        },
      })
    }
  }

  decorateColumns = (columns, widths) => {
    const newColumns = []

    columns.forEach((column, i) => {
      newColumns.push({
        ...column,
        title: (
          <div
            className={styles.tableTh}
            ref={th => {
              this.ths[i] = th
            }}
          >
            {column.title}
            {i !== columns.length - 1 && (
              <Draggable axis="x" onDrag={(e, data) => this.handleDrag(i, data)}>
                <span className={styles.resizeBorder} />
              </Draggable>
            )}
          </div>
        ),
        ...(widths[i] ? { width: widths[i] } : {}),
      })
    })

    return newColumns
  }

  render() {
    const { columns, rowSelection = {}, ...rest } = this.props
    const { widths } = this.state
    return (
      <Table
        bordered={false}
        scroll={{ x: '100%' }}
        className={styles.resizableTable}
        size="small"
        columns={this.decorateColumns(columns, widths)}
        rowKey="id"
        rowSelection={rowSelection}
        {...rest}
      />
    )
  }
}

export default ResizableTable
