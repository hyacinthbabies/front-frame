import React from "react"
import {Table, Input, Popconfirm,Divider } from "antd"
import env from "config";
import ApiUtil from "utils/ApiUtil";
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);
  
class userList extends React.Component{
    constructor(props) {
        super(props);
        this.columns = [{
          title: '姓名',
          dataIndex: 'name',
          render: (text, record) => this.renderColumns(text, record, 'name'),
        }, {
          title: '密码',
          dataIndex: 'age',
          render: (text, record) => this.renderColumns(text, record, 'age'),
        }, {
          title: '操作',
          dataIndex: 'operation',
          render: (text, record) => {
            const { editable } = record;
            return (
              <div className="editable-row-operations">
                {
                  editable ?
                    <span>
                        <a onClick={() => this.save(record.key)}>保存</a>
                        <Divider type="vertical" />
                        <a>取消</a>
                    </span>
                    : <span>
                        <a onClick={() => this.edit(record.key)}>编辑</a>
                        <Divider type="vertical" />
                        <Popconfirm 
                        title="确定删除吗?" 
                        onConfirm={() => this.cancel(record.key)}
                        okText="确认" 
                        cancelText="取消">
                            <a>删除</a>
                        </Popconfirm>
                    </span>
                }
              </div>
            );
          },
        }];
        this.state = { data,selectedRowKeys:[] };
        this.cacheData = data.map(item => ({ ...item }));
    }

    componentDidMount(){
        this.init();
    }

    /**
     * 渲染列
     * @param {*} text 
     * @param {*} record 
     * @param {*} column 
     */
    renderColumns(text, record, column) {
        return (
            <EditableCell
            editable={record.editable}
            value={text}
            onChange={value => this.handleChange(value, record.key, column)}
            />
        );
    }

    /**
     * 选中列
     * @param {*} value 
     * @param {*} key 
     * @param {*} column 
     */
    handleChange(value, key, column) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target[column] = value;
            this.setState({ data: newData });
        }
    }

    /**
     * 编辑
     * @param {*} key 
     */
    edit(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target.editable = true;
            this.setState({ data: newData });
        }
    }

    /**
     * 保存
     * @param {*} key 
     */
    save(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            delete target.editable;
            this.setState({ data: newData });
            this.cacheData = newData.map(item => ({ ...item }));
        }
    }

    /**
     * 取消
     * @param {*} key 
     */
    cancel(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
            delete target.editable;
            this.setState({ data: newData });
        }
    }
    
    render(){
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
    
        return <div style={{width:"100%"}}>
            <Table bordered dataSource={this.state.data} columns={this.columns} />
        </div>

    }
}

export default userList;