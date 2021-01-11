

import React from 'react'
import {
  useHistory,
} from "react-router-dom";
import './index.less'


const Index = ({item:{id, text_day, date, low, high,week,wc_day,wd_day}}) => {
  let history = useHistory();

  const onClick = () => {
    history.push(`/Detail?id=${id}`,{id})
  }

  return (
    <div className="homeItem">   
      <h2 className="text">{text_day}</h2>
      <p>{`${low}°C`} ~ {`${high}°C`}</p>
      <p>{wc_day}</p>
      <p>{wd_day}</p>
      <p>{date}</p>
      <p className="time">{week}</p>
    </div>
  )
}

export default Index
