import React, { PureComponent, Fragment } from 'react'
import { Modal, Input, Icon } from 'antd'

class SelectModal extends PureComponent {
  static defaultProps = {
    multiple: false,
    showSingle: false,
    docDetails: undefined,
    disabled: false,
    defaultName: '',
    modal: <div />,
    btn: null,
    onChange: () => {},
    onOk: () => {},
    opencallback: () => new Promise(reslove => reslove()),
  }

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      selectedItems: [],
      modalSelected: [],
      modalParent: {},
      prevValue: props.value,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.prevValue) {
      return {
        prevValue: props.value,
        selectedItems: state.selectedItems.filter(item =>
          Array.isArray(props.value) ? props.value.indexOf(item.id) !== -1 : item.id === props.value
        ),
      }
    }
    return null
  }

  handleOk = () => {
    const { multiple, docDetails, onChange, onOk } = this.props
    const { modalSelected, modalParent } = this.state
    const selectedItems = [...modalSelected]
    const ids = selectedItems.map(item => item.id)

    if (docDetails) {
      onChange(ids)
      onOk(selectedItems, modalParent)
    } else if (multiple) {
      onChange(ids)
      onOk(selectedItems)
    } else {
      onChange(ids[0])
      onOk(selectedItems[0])
    }

    this.setState({
      modalVisible: false,
      selectedItems,
    })
  }

  handleOpen = () => {
    const { opencallback } = this.props
    opencallback()
      .then(() =>
        this.setState({
          modalVisible: true,
        })
      )
      .catch(() => {})
  }

  handleClose = () => {
    this.setState({
      modalVisible: false,
    })
  }

  handleSelect = (rows, parent) => {
    this.setState({
      modalSelected: rows,
      modalParent: parent,
    })
  }

  render() {
    const {
      multiple,
      showSingle,
      docDetails,
      disabled,
      modal: ModalContent,
      btn,
      value,
      defaultName,
      selectedType,
      filterCallback,
      modalTitle,
      accountingType,
      onOk,
      opencallback,
      ...rest
    } = this.props
    const { modalVisible, selectedItems } = this.state
    const firstItem = selectedItems[0] || {}
    const selectedName =
      multiple && !showSingle ? selectedItems.map(item => item.name).join(', ') : firstItem.name
    const modalProps = {
      selectedType,
      filterCallback,
      modalTitle,
      docDetails,
      selectedMode: multiple ? 'checkbox' : 'radio',
      selectedIds: Array.isArray(value) ? value : [value],
      onSelect: this.handleSelect,
      accountingType,
    }
    const Inputs = (
      <Fragment>
        <Input readOnly value={value} style={{ display: 'none' }} disabled={disabled} />
        <Input
          readOnly
          value={selectedName || defaultName}
          addonAfter={
            disabled ? <Icon type="ellipsis" /> : <Icon type="ellipsis" onClick={this.handleOpen} />
          }
          {...rest}
          disabled={disabled}
        />
      </Fragment>
    )
    const Btn =
      btn &&
      React.cloneElement(btn, {
        onClick: this.handleOpen,
      })

    return (
      <Fragment>
        {Btn || Inputs}
        <Modal
          width="80%"
          destroyOnClose
          visible={modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleClose}
          {...rest}
        >
          <ModalContent {...modalProps} />
        </Modal>
      </Fragment>
    )
  }
}

export default SelectModal
