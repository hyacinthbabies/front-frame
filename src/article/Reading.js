import React from "react"
import {Input,List, Avatar,Spin,Icon} from "antd";
import ApiUtil from "utils/ApiUtil";
import "./style.less";
import { withRouter } from 'react-router'
import {getMenuKeys} from "common/menuUtils";
const Search = Input.Search;

class Reading extends React.Component {
  state = {
    articleDetail:"",
    data:[],
    currentId:"",
    detailLoading:false,
    listLoading:false,
    collapsed:false,
  }
  componentDidMount(){
    const {state} = this.props.location;
    //如果从首页入口进去，则默认查询技术类文档
    let param = {
      articleType:"SKILL_ID",
      keyword:""
    }
    //刷新浏览器
    let menuItem = getMenuKeys();
    if(menuItem){
      param.articleType = menuItem.id;
    }
    
    if(state && state.id){
      param.articleType = state.id;
    }
    this.getArticleList(param);
  }

  getArticleList = (param)=>{
    this.setState({listLoading:true})
    //查询列表
    ApiUtil(param,"/api/content/list")
    .then(res=>{
      if(res.length > 0 ){
        this.onHandleItem(res[0]._id);
      }
      this.setState({data:res,listLoading:false});
    })
  }

  //查询详情
  onHandleItem = id =>{
    this.setState({currentId:id,detailLoading:true});
      ApiUtil({},`/api/queryContent/${id}`)
      .then(res=>{
        this.setState({articleDetail:res,Comment});
        $("#content").html(res.articleContent); 
        this.setState({detailLoading:false}) 
      })
  }

  //模糊搜索
  onSearch = val=>{
    const {state} = this.props.location;
    
    //如果从首页入口进去，则默认查询技术类文档
    let param = {
      articleType:"SKILL_ID"
    }
    if(state && state.id){
      param.articleType = state.id;
      param.keyword = val
    }
    this.getArticleList(param)
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const {data,articleDetail,currentId,Comment,listLoading,detailLoading,collapsed} = this.state;
    return (
      [!collapsed?<div className="article-container" style={{flex:1,display: "flex",
        flexDirection: "column"}} key="1">
        <div className="title-search">
          <Search 
            onSearch={this.onSearch}
            placeholder="输入搜索内容"/>
        </div>
        <div className="article-list">
          <List
            className="demo-loadmore-list"
            loading={listLoading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={data}
            renderItem={item => (
              <List.Item onClick={this.onHandleItem.bind(null,item._id)} style={item._id === currentId?{background:"#f1ededc7"}:{background:"#fff"}}>
                <List.Item.Meta
                  title={<span>{item.articleName}</span>}
                  description={`时间：${item.articleDate}`}
                />
              </List.Item>
            )}
          />

        </div>
      </div>:null,
      <div className="content-container" key="2" style={collapsed?{maxWidth:"100%"}:{}}>
          <div className="publish-date">
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
              style={{paddingLeft:0}}
            />
              发布于：{articleDetail.articleDate}
          </div>
          <div className="publish-detail" style={collapsed?{paddingLeft: "20%",paddingRight: "20%"}:{}}>
            <Spin spinning={detailLoading}>
              <h2 style={{textAlign:"center"}}>{articleDetail.articleName}</h2>
              <div id="content"></div>
            </Spin> 
          </div>
          
      </div>,
      ]
    );
  }
}
export default withRouter(Reading);
