import * as React from 'react'
import { Transfer } from 'antd';
import styles from './index.less'

class Index extends React.Component {
    state = {
        mockData: [], // 渲染的数据
        targetKeys: [], // 渲染在右边的key值
    };

    componentDidMount() {
        this.getMock();
    }

    getMock = () => {
        const targetKeys = [];
        const mockData = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < 20; i++) {
            const data = {
                key: i.toString(),
                title: `content${i + 1}`,
                description: `description of content${i + 1}`,
                chosen: Math.random() * 2 > 1,
            };
            if (data.chosen) {
                targetKeys.push(data.key);
            }
            mockData.push(data);
        }
        this.setState({ mockData, targetKeys });
    };

    // 选项在两栏之间转移时的回调函数
    handleChange = (targetKeys, direction, moveKeys) => {
        console.log('右边数据的key',targetKeys,'穿梭的方向', direction,'右边数据变化的key', moveKeys);
        this.setState({ targetKeys });
    };

    // 每行渲染的函数
    renderItem = item => {
        const customLabel = (
          <span className="custom-item">
            {item.title} - {item.description}
          </span>
        ); 

        return {
            label: customLabel, // for displayed item
            value: item.title, // for title and filter matching
        };
    };

    render() {
        const { mockData, targetKeys } = this.state
        return (
          <div>
            <div className={styles.Transfers}>
              <span>监测站名称</span>
              <span>已分配监测站名称</span>
            </div>
            <Transfer
              dataSource={mockData}
              listStyle={{
                width: 300,
                height: 300,
            }}
              targetKeys={targetKeys}
              onChange={this.handleChange}
              render={this.renderItem}
            />
          </div>

        );
    }
}


export default Index