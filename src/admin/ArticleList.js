import React from "react"
import {Table,Divider} from "antd"
const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Age',
    dataIndex: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
  },
  {
      title:"操作",
      render:()=>{
          return <span>
              <a>编辑</a>
              <Divider type="vertical" />
              <a>详情</a>
              <Divider type="vertical" />
              <a>删除</a>
              </span>
      }
  }
];
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
  
class ArticleList extends React.Component{
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
      };
      start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
          this.setState({
            selectedRowKeys: [],
            loading: false,
          });
        }, 1000);
      }
      onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
      }
    render(){
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
    
        return <div style={{width:"100%"}}>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>

    }
}

export default ArticleList;