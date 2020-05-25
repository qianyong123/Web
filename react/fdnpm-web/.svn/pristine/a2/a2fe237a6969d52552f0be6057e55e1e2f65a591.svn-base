import React, { Component } from 'react'
import { DatePicker } from 'antd'

export default class extends Component {
  static defaultProps = {
    onChange: () => {},
  }

  state = {
    isopen: false,
  }

  handleChange = () => {
    const { onChange } = this.props
    onChange(null)
  }

  handlePanelChange = time => {
    const { onChange } = this.props
    this.setState(
      {
        isopen: false,
      },
      () => onChange(time)
    )
  }

  render() {
    const { isopen } = this.state
    const { value, ...rest } = this.props
    return (
      <DatePicker
        value={value}
        open={isopen}
        mode="year"
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
