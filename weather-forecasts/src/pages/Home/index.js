

import React, { useEffect, useState } from 'react'
import {
  useLocation,
  useHistory
} from "react-router-dom";
import { Row, Col, Pagination, Spin, Layout, Input, Space,message } from 'antd';
import ListItem from '@/components/ListItem'
import fetching from '@/util/fetching'
import Headers from '@/components/Header'
import Footers from '@/components/Footer'
import Button from 'antd/lib/button';

const { Footer, Content } = Layout;
const { Search } = Input;
const { xs, sm, md, lg, xl, xxl } = {
  xs: { span: 24, offset: 0 }, //<576px
  sm: { span: 12, offset: 0 }, //≥576px
  md: { span: 12, offset: 0 }, //≥768
  lg: { span: 8, offset: 0 }, //≥992px
  xl: { span: 6, offset: 0 }, //≥1200px
  xxl: { span: 6, offset: 0 }, //≥1600px
}

const Index = () => {
  const data = [
    {
      text_day: '多云',
      week: "星期一",
      high: "8", // 最高气温
      low: "-1", // 最低气温
      date: '2020-10-22'
    },

  ]
  const [List, SetList] = useState([])
  const [pageNumber, setpageNumber] = useState(1)
  const [pageSize, setpageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [loding, setLoding] = useState(false)

  const history = useHistory()
  const location = useLocation()
  const path = location.pathname === '/' || location.pathname === '/home' ? '' : location.pathname.replace('/', '')
  useEffect(() => {
    // fetchList(1, 10)
    const token = localStorage.getItem('token')
    if (!token) {
      history.push(`/login`,)
    }
  }, [location])

  function onChange(number, Size) {
    console.log('Page: ', number, Size);
    setpageNumber(number)
    setpageSize(Size)
    fetchList(number, Size)
  }

  const onSearch = value => {
    if(!value) {
      message.warning('请输入查询的城市名称!')
      return;
    }
    fetchList(value)
  };

  const fetchList = (cityName = '') => {
    setLoding(true)
    fetching('/weather_boot/call/weather', {
      data: {
        cityName
      }
    })
      .then(res => {
        setLoding(false)
        if (res && res.code === 401) {
          message.error('登录已过期，请重新登录!')
          setTimeout(()=>{
            quitLogin()
          },1000)
        } else if (res && res.code === 200) {
          if(Array.isArray(res.data)) SetList(res.data)
        } else message.error(res.msg)
      })
  }

  const quitLogin = ()=>{
    localStorage.removeItem('tolen')
    history.push(`/login`)
  }

  return (
    <Layout style={{ height: '100%' }}>
      {/* <Headers /> */}
      <Content className="Content">
        <Spin spinning={loding}>
          <div className="home">
            <Button onClick={quitLogin} className="quitLogin">退出登录</Button>
            <h1>天气预报查询</h1>
            <div>
              <Space direction="vertical">
                <Search
                  style={{ width: 300 }}
                  placeholder="请输入国内城市名称"
                  // allowClear
                  enterButton="搜索"
                  size="large"
                  onSearch={onSearch}
                />
              </Space>
            </div>
            <div className="list">
              {
                List.length < 1
                  ?
                  <h3 className="noneData">暂无数据</h3>
                  :
                  List.map(item => {
                    return (
                      <ListItem item={item} />
                    )
                  })
              }
            </div>

            {/* {
              total > 10 &&
              <Pagination
                style={{ padding: "40px 20px", }}
                current={pageNumber}
                pageSize={pageSize}
                total={total}
                showSizeChanger
                onChange={onChange}
              />
            } */}

          </div>
        </Spin>
      </Content>
      {/* <Footer>
        <Footers />
      </Footer> */}
    </Layout>

  );
}


export default Index
