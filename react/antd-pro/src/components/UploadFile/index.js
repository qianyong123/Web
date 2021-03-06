import React, { PureComponent } from 'react'
import { string, func, bool, object } from 'prop-types'
import Cookies from 'js-cookie'
import { Upload, message } from 'antd'
// import { requestApi } from '@/services/api'
import { connect } from 'dva'

@connect(({ global }) => {
  return {
    global,
  }
})
class UploadFile extends PureComponent {
  static propTypes = {
    action: string,
    name: string,
    accept: string,
    callback: func,
    onChange: func,
    autoUpload: bool,
    multiple: bool,
    showUploadList: bool,
    file: object,
  }

  static defaultProps = {
    callback: async () => {},
    onChange: () => {},
    action: '/sys/fileManage/uploadFile',
    autoUpload: true,
    accept: '*/*',
    name: 'file',
    multiple: false,
    showUploadList: false,
    file: {},
  }

  constructor(props) {
    super(props)
    this.state = { fileList: [] }
  }

  componentDidMount() {
    const files = {
      uid: '-1',
      name: '',
      status: 'done',
      response: {}, // custom error message to show
      url: '',
      id: '',
    }
    const { file } = this.props
    const { name, buildFileId, fileList } = file
    console.log('file', file)

    if (buildFileId) {
      files.name = name
      files.id = buildFileId
      files.uid = buildFileId
      this.setState({
        fileList: [files],
      })
    } else if (fileList instanceof Array) {
      this.setState({
        fileList,
      })
    }
  }

  handChange = ({ file, fileList }) => {
    const { onChange, len = -1 } = this.props

    let fileList2 = [...fileList]
    fileList2 = fileList2.slice(len)
    // eslint-disable-next-line array-callback-return
    fileList2 = fileList2.map(file2 => {
      const files = { ...file2 }
      const { response = {} } = files
      if (response.code === 200) {
        files.id = response.data.id
        files.fileName = response.data.fileName
      }
      delete files.response
      return files
    })

    if (file.status !== 'uploading') {
      console.log(file, fileList2)
    }
    if (file.status === 'done') {
      message.success(`${file.name} 上传成功`)
      onChange(file, fileList2)
    } else if (file.status === 'removed') {
      onChange(file, fileList2)
    } else if (file.status === 'error') {
      message.error(`${file.name} 上传失败.`)
    }

    this.setState({ fileList: [...fileList2] })
  }

  render() {
    const { children, autoUpload, onChange, ...rest } = this.props
    const { fileList } = this.state
    const uploadProps = {
      ...rest,
      headers: {
        Authorization: Cookies.get('token'),
      },
      beforeUpload: (file, fileList2) => {
        // const isExcel =
        //   [
        //     '.xls',
        //     '.xlsx',
        //     'application/vnd.ms-excel',
        //     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        //   ].indexOf(file.type) !== -1 || ['.xls', '.xlsx'].indexOf(file.name) !== -1
        // if (!isExcel) {
        //   message.error('上传文件格式需为xls、xlsx!')
        //   return isExcel
        // }
        const isLt20M = file.size / 1024 / 1024 < 20
        if (!isLt20M) {
          message.error('文件尺寸不能大于20MB！')
          return isLt20M
        }
        if (!autoUpload) onChange({ file, fileList2 })
        return autoUpload
      },
    }
    return (
      <Upload
        onRemove={this.handRemove}
        onChange={this.handChange}
        fileList={fileList}
        {...uploadProps}
      >
        {children()}
      </Upload>
    )
  }
}

export default UploadFile
