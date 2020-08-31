import React, { useState,useEffect } from 'react'
import styles from './amap.less'
import { Row, Col, Icon, Select } from 'antd';
import YearPicker from '@/components/YearPicker'
import { func } from 'prop-types';
import StandardTable from '@/components/StandardTable'

const { Option } = Select

const Database = (props) => {
    const { 
        closeData, 
        loading = false,
        
    } = props
    const [yearValue, setYearValue] = useState(null)
    const [selectValue, setSelectValue] = useState('粮食')
    
    const data = {list:[]}
    for(let i=0;i<100;i++){
        data.list.push({
            id:i+1,
            addDate:"四川"+i,
            addDate2:i*223
        })
    }
    const list = [{ name: '粮食', id: 1 }, { name: '植物', id: 2 },];
    const columns = [
        {
            title: '序号',
            key: 'number',
            className: 'no-wrap text-center plus-btn',
            width: 50,
            align: 'center',
            enableInSelectMode: true,
            render: (text, record, index) => index + 1,
        },
        {
            title: '行政区域',
            dataIndex: 'addDate',
            key: 'addDate',
            align: 'center'
        },
        {
            title: '粮食产量',
            dataIndex: 'addDate2',
            key: 'addDate2',
            align: 'center',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.addDate2 - b.addDate2,
        },
    ]
    function onYearChange(v) {
        setYearValue(v)
        console.log(v)
    }

    function onSelectChange(v) {
        console.log(v)
        setSelectValue(v)
    }

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
      }

    return (
        <div className={styles.database}>
            <Row className={styles.dataTitle} type="flex" align="middle" justify="space-between">
                <Col span={22}>数据</Col>
                <Col className={styles.icons} span={2}>
                    <Icon onClick={closeData} className={styles.close} type="close" />
                </Col>
            </Row>
            <Row type="flex" style={{ padding: "10px" }} justify="space-between">
                <Col span={12}>
                    <Select
                        placeholder="请选择专题"
                        allowClear
                        showSearch
                        defaultValue={selectValue}
                        onChange={onSelectChange}
                        style={{ width: "100%" }}
                    >
                        {
                            list.map(item => <Option key={item.id} value={item.name}>{item.name}</Option>)
                        }
                    </Select>
                </Col>
                <Col span={11}>
                    <YearPicker style={{ width: "100%" }} value={yearValue} onChange={onYearChange} />
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{padding:"0 10px"}}>
                    <StandardTable
                        onChange={onChange}
                        hideSelectedCount
                        selectedRows={false}
                        rowSelection={null}
                        selectedMode={false}
                        pagination={false}
                        scroll={{ x: 'max-content',y: 240 }}
                        loading={loading}
                        data={data}
                        columns={columns}
                    />
                </Col>
            </Row>

        </div>
    )
}

export default Database




