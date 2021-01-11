

import React from 'react'
import {
  useHistory,
} from "react-router-dom";
import './index.less'


const Index = ({item:{id, name, time, temperature }}) => {
  let history = useHistory();

  const onClick = () => {
    history.push(`/Detail?id=${id}`,{id})
  }

  return (
    <div className="homeItem">   
      <h2 className="text">{name}</h2>
      <p>{temperature}</p>
      <p className="time">{time}</p>
    </div>
  )
}

export default Index
