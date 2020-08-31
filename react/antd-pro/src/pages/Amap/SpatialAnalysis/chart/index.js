import React,{useState} from 'react'
import styles from '../amap.less'
import { Row, Col, Icon, Select } from 'antd';
import Bar from './Bar'
import Lines from './Line'
import Pie from './Pie'


const Chart = props => {
    const [type,setType] = useState('bar-chart')
    
    const {closeData,selectValue2,chartData} = props
    const list = [{ name: '粮食', id: 1 }, { name: '植物', id: 2 },];
    const chartList = [
        {type:'bar-chart',title:"柱状图"},
        {type:'line-chart',title:"折线图"},
        {type:'pie-chart',title:"饼状图"},
    ]
    function chartTpye(v){
        setType(v)
    }
    return (
        <div className={styles.chart}>
           <Row className={styles.dataTitle} type="flex" align="middle" justify="space-between">
                <Col span={22}>统计图</Col>
                <Col className={styles.icons} span={2}>
                    <Icon onClick={closeData} className={styles.close} type="close" />
                </Col>
            </Row>
            <Row type="flex" className={styles.chartToolbar} justify="space-between" align="middle">
                <Col span={10}>
                    <Select
                        placeholder="请选择指标"
                        allowClear
                        showSearch
                        defaultValue={selectValue2}
                        style={{ width: "100%" }}
                    >
                        {
                            list.map(item => <Option key={item.id} value={item.name}>{item.name}</Option>)
                        }
                    </Select>
                </Col>
                <Col span={12} className={styles.chartTpyebOX}>
                    {
                        chartList.map(item => <Icon 
                            title={item.title} 
                            type={item.type}onClick={() => chartTpye(item.type)} 
                            className={`${styles.chartType} ${type === item.type && styles.chartTypeColor}`} 
                            />)
                    }
                </Col>
            </Row>
            <div style={{padding:'10px'}}>
                {
                    type === 'bar-chart' ? <Bar chartData={chartData}></Bar> 
                    : type === 'line-chart' ? <Lines chartData={chartData}></Lines>
                    : <Pie chartData={chartData}></Pie>
                }
            </div>
            
        </div>
    )
}

export default Chart
