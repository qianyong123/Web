

import React, { useEffect, useState } from 'react'
import {
  useLocation
} from "react-router-dom";
import { Spin } from 'antd';
import Markdown from '@/components/Markdown'
import fetching from '@/util/fetching'
import './index.less'

const Index = () => {
  const [width, setIsWidth] = useState(true)
  const [obj, setObj] = useState({})
  const [loding, setLoding] = useState(true)

  let Params = useLocation();
  const { search, state = {} } = Params
  let ids = search.indexOf('?id')
  let urlId = search.slice(ids).split('=')[1]
  const id = state.id || urlId

  const numbers = parseInt(Math.random() * 9) + 1

  useEffect(() => {
    if (document.body.clientWidth > 800) {
      setIsWidth(true)
    } else setIsWidth(false)
    if (id) getDetail()
  }, [Params])


  // console.log(Params,ids)
  if (!id) {
    return <h3 style={{ padding: 50, textAlign: 'center' }}>暂无数据</h3>
  }



  // const obj = DataList.find(i => i.id === id)

  const getDetail = () => {
    try {
      fetching('/api/admin/detail', { data: { id } })
        .then(res => {
          setLoding(false)
          if (res && res.code === 200) {
            setObj(res.data[0])
          }
        })
    } catch (err) {
      console.log('err222', err)
    }

  }

  return (
    <Spin spinning={loding}>
      <div className="detailBox">
        {
          width ?
            <div className={`haderTitle`} style={{ backgroundImage: `url(/img/${numbers}.jpg)` }}>
              <div className="titleBox">
                <h1 className="title">{obj.title}</h1>
                <div>
                  <time className="time">{obj.time}</time>
                </div>
                <span className="type">{obj.type}</span>
              </div>

            </div>
            :
            <div className={`haderTitle2`}>
              <h1 className="title">{obj.title}</h1>
              <div>
                <time className="time">{obj.time}</time>
              </div>
              <span className="type">{obj.type}</span>
            </div>}
        <div className="detail">
          <article>
            {/* <div dangerouslySetInnerHTML={{ __html: obj.text }}></div> */}
            <Markdown md={obj.text} classify={obj.classify} />
          </article>
        </div>
      </div>
    </Spin>
  )
}

export default Index
