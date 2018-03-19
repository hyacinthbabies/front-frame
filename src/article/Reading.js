import React from "react"
import {Input,List, Avatar,Spin} from "antd";
import ApiUtil from "utils/ApiUtil";
import "./style.less";
const Search = Input.Search;

class Reading extends React.Component {
  state = {
    date:"",
    data:[],
    currentId:"",
    loading:false
  }
  componentDidMount(){
    const {state} = this.props.location;
    
    //如果从首页入口进去，则默认查询技术类文档
    let param = {
      articleType:"SKILL_ID",
      keyword:""
    }
    if(state && state.id){
      param.articleType = state.id;
    }
    this.getArticleList(param);
  }

  getArticleList = (param)=>{
    //查询列表
    ApiUtil(param,"/api/content/list")
    .then(res=>{
      if(res.length > 0 ){
        this.onHandleItem(res[0]._id);
      }
      this.setState({data:res});
    })
  }

  //查询详情
  onHandleItem = id =>{
    this.setState({currentId:id,loading:true});
      ApiUtil({},`/api/queryContent/${id}`)
      .then(res=>{
        this.setState({date:res.articleDate,Comment});
        $("#content").html(res.articleContent); 
        this.setState({loading:false}) 
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

  render() {
    const {data,date,currentId,Comment,loading} = this.state;
    return (
      [<div className="article-container" style={{flex:1,display: "flex",
        flexDirection: "column"}} key="1">
        <div className="title-search">
          <Search 
            onSearch={this.onSearch}
            placeholder="输入搜索内容"/>
        </div>
        <div className="article-list">
          <List
            className="demo-loadmore-list"
            // loading={loading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={data}
            renderItem={item => (
              <List.Item onClick={this.onHandleItem.bind(null,item._id)} style={item._id === currentId?{background:"#f1ededc7"}:{background:"#fff"}}>
                <List.Item.Meta
                  title={<span>{item.articleName}</span>}
                  description={`时间：${date}`}
                />
              </List.Item>
            )}
          />

        </div>
      </div>,
      <div className="content-container" key="2">
          <div className="publish-date">
              发布于：{date}
          </div>
          <div className="publish-detail">
            <Spin spinning={loading}>
              <div id="content"></div>
            </Spin> 
          </div>
          
      </div>]
    );
  }
}
export default Reading;
