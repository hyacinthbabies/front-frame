import React from "react"
import {Table,Divider,message} from "antd"
import ApiUtil from "utils/ApiUtil"
import { withRouter } from 'react-router'
  
class ArticleList extends React.Component{
  constructor(props){
    super(props);
    this.columns = [{
      title: '文章编号',
      dataIndex: '_id',
    }, {
      title: '文章内容',
      dataIndex: 'articleName',
    }, {
      title: '作者名称',
      dataIndex: 'authorName',
    },{
      title: '文章日期',
      dataIndex: 'articleDate',
    },{
      title: '文章类型',
      dataIndex: 'articleType',
    },
    {
        title:"操作",
        render:record=>{
            return <span>
                <a onClick={this.onHandleEdit.bind(null,record._id)}>编辑</a>
                <Divider type="vertical" />
                <a onClick={this.getArticalDetail.bind(null,record._id)}>详情</a>
                <Divider type="vertical" />
                <a onClick={this.deleteArticle.bind(null,record._id)}>删除</a>
                </span>
        }
    }];
  }
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        data:[]//表格数据
      };

    componentDidMount(){
      this.getArticleList();
    }
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
    
    getArticleList = ()=>{
      let param = {
        articleType:"",
        keyword:""
      }
      //查询列表
      ApiUtil(param,"/api/content/list")
      .then(res=>{
        this.setState({data:res});
      })
    }

    //查询详情
    getArticalDetail = id =>{
      this.props.history.push(`/admin/articleDetail/${id}`);
    }

    onHandleEdit = id=>{
      this.props.history.push(`/admin/articleAdd`,{id:id});
    }

    deleteArticle = id=>{
      ApiUtil({articleId:id},"/api/removeArticle")
      .then(res=>{
        // this.getArticleList();
        message.success("删除成功");
      });
    }

    render(){
        const { loading, selectedRowKeys,data } = this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
    
        return <div style={{width:"100%"}}>
        <Table rowSelection={rowSelection} columns={this.columns} dataSource={data} />
      </div>

    }
}

export default withRouter(ArticleList);