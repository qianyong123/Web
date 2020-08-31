import React, { Component } from 'react'
import { DatePicker } from 'antd'

const { RangePicker } = DatePicker
export default class extends Component {
  static defaultProps = {
    onChange: () => {},
  }

  state = {
    isopen: false,
    mode: ['year', 'year'],
  }

  handleChange = () => {
    const { onChange } = this.props
    onChange(null)
  }

  handlePanelChange = (value, mode) => {
    const { onChange } = this.props
    console.log('mode', mode)
    this.setState(
      {
        // isopen: false,
        mode: [mode[0] === null ? 'year' : mode[0], mode[1] === null ? 'year' : mode[1]],
      },
      () => onChange(value)
    )
  }

  render() {
    const { isopen, mode } = this.state
    const { value, ...rest } = this.props
    return (
      <RangePicker
        value={value}
        open={isopen}
        mode={mode}
        placeholder="请选择年份"
        format="YYYY"
        onOpenChange={status => this.setState({ isopen: status })}
        onPanelChange={this.handlePanelChange}
        onChange={this.handleChange}
        {...rest}
      />
    )
  }
}
