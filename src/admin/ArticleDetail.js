import React from "react"
import {Input,List, Avatar,Spin} from "antd";
import ApiUtil from "utils/ApiUtil";
const Search = Input.Search;

class ArticleDetail extends React.Component {
  state = {
    date:"",
    data:[],
    currentId:"",
    loading:false
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
    const {data,date,currentId,Comment,loading} = this.state;
    return (
      <div className="content-container" style={{maxWidth:"100%"}}>
            <div className="publish-date" style={{textAlign:'center'}}>
                <h2>{data.articleName}<span>{date}</span></h2>
                {/* <h1>发布于：{date}</h1> */}
            </div>
            <div className="publish-detail">
                <Spin spinning={loading}>
                <div id="content"></div>
                </Spin> 
            </div>
      </div>
    );
  }
}
export default ArticleDetail;
