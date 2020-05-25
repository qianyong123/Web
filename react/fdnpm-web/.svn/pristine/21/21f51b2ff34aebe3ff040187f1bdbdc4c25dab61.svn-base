import React, { PureComponent } from 'react'
import Link from 'umi/link'
import Debounce from 'lodash-decorators/debounce'
import styles from './index.less'
import RightContent from './RightContent'
import { title } from '../../defaultSettings'

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel()
  }
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent('HTMLEvents')
    event.initEvent('resize', true, false)
    window.dispatchEvent(event)
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props
    onCollapse(!collapsed)
    this.triggerResizeEvent()
  }
  render() {
    const { collapsed, isMobile, logo } = this.props
    return (
      <div className={styles.header}>
        <Link to="/" className={styles.logo} key="logo">
          <img src={logo} alt="logo" width="52" />
          <div className={styles.title}>
            <h1>{title}</h1>
            <p>水生生物自然保护区信息子系统</p>
            <i></i>
          </div>
        </Link>
        {/* <span className={styles.trigger} onClick={this.toggle}>
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </span> */}
        {/* <div className={styles.logo} id="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>{title}</h1>
          </Link>
        </div> */}
        <RightContent {...this.props} />
      </div>
    )
  }
}
