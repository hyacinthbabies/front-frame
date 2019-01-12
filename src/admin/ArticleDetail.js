import React from "react"
import {Input,List, Tag,Spin,Form} from "antd";
import ApiUtil from "utils/ApiUtil";
import { withRouter } from 'react-router'
import Comments from "component/comments"
import Constant from "common/Constant";
import {DateFormat} from "utils/dataUtils";
import axios from "axios";
const Search = Input.Search;
const FormItem = Form.Item;

class ArticleDetail extends React.Component {
  state = {
    date:"",
    data:[],
    currentId:"",
    loading:false,
    commentList:[],
    readCount:1
  }

  componentWillMount(){
    const {params:{id}} = this.props.match;
    axios.put(`/api/articleCount/add`,{articleId:id})
    .then(res=>{
      this.setState({
        readCount:res.data.totalCount?res.data.totalCount+1:1
      })
    });
  }

  componentDidMount(){
    const {params:{id}} = this.props.match;
    this.getArticleDetail(id);
  }

  //查询详情
  getArticleDetail = id =>{
    this.setState({currentId:id,loading:true});
      ApiUtil({},`/api/queryContent/${id}`)
      .then(res=>{
        this.setState({data:res,date:res.articleDate,Comment});
        $("#content").html(res.articleContent); 
        this.setState({loading:false}) 
      })
  }

  render() {
    const {data,commentList,currentId,readCount,loading} = this.state;
    const { getFieldDecorator } = this.props.form;
    const {params:{id}} = this.props.match;
    return (
      <div className="content-container" style={{boxShadow:"none",borderLeft:"none",background:"#fff",padding:20,width:"100%",maxWidth:"100%" }}>
        <div className="">
          <Spin spinning={loading}>
            {/* 新闻详情 */}
            <h1 className="news-title">{data.articleName}</h1>
            <p>
              <span>{DateFormat(new Date(data.articleDate),"yyyy年MM月dd日")}</span>
              <span style={{marginLeft:20}}>阅读 {readCount}</span>
            </p>
            <p>{
              data.tag &&data.tag.split(",").map(t=>{
                return <Tag key={t} color={Constant.tagColorList[t]}>
                  {t}
                </Tag>
              })
            }
            </p>
            {/* <div className="article-sub">
              <span>{data.addUserName}</span>
              <span>
                2018-05-21
              </span>
            </div> */}
            <div id="content" />
            {/* 评论 */}
            <Comments articleId={id}/>
            </Spin>
        </div>
      </div>
    );
  }
}
export default Form.create()(withRouter(ArticleDetail));
