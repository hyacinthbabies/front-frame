import React from "react"
import {Input,List, Avatar,Skeleton,Icon,Tag } from "antd";
import ApiUtil from "utils/ApiUtil";
import {formatMsgTime} from "utils/dataUtils";
import "./style.less";
import { withRouter } from 'react-router'
import {getMenuKeys} from "common/menuUtils";
import Constant from "common/Constant";
const env = "";
class Skill extends React.Component {
  constructor(props){
    super(props);
  }

  state = {
    articleDetail:"",
    data:[],
    currentId:"",
    detailLoading:false,
    listLoading:false,
    collapsed:false,
  }

  componentWillMount(){
    
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
      this.setState({data:res,listLoading:false});
    })
  }

  //查询详情
  onHandleItem = id =>{
    this.props.history.push(`/home/article/articleDetail/${id}`);
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
    console.log(Constant.typeList);

    const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
    );
    return (
        <List
        itemLayout="vertical"
        size="large"
        pagination={{
            onChange: (page) => {
            console.log(page);
            },
            pageSize: 10,
        }}
        style={{margin:"0 5%",padding:10,background:"#fff",width:"100%"}}
        loading={listLoading}
        dataSource={data}
        renderItem={item => (
            <List.Item
            onClick={this.onHandleItem.bind(null,item._id)}
            key={item.title}
            actions={[<IconText type="eye" text={item.count[0]?item.count[0].totalCount:1} />, <IconText type="message" text={item.comments.length} />, <IconText type="clock-circle-o" text={formatMsgTime(new Date(item.articleDate))} />]}
            extra={<img width={100} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
            >
            <Skeleton loading={listLoading} active>
            <List.Item.Meta
                title={<a>{item.articleName}</a>}
                description={
                    <div>
                        {
                        item.tag &&item.tag.split(",").map(t=>{
                          return <Tag color={Constant.tagColorList[t]}>
                            {t}
                          </Tag>
                        })
                      }
                    </div>
                }
            />
            </Skeleton>
            {item.content}
            </List.Item>
        )}
        />
        )
    }
}
export default withRouter(Skill);
