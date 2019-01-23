import React from "react"
import {Input,List, Button,Spin,Form,Icon, message,Row,Col,Divider} from "antd";
import ApiUtil from "utils/ApiUtil";
import InputComment from "./InputComment";
import "./style.less"
import CommentItem from "./CommentItem";
const Search = Input.Search;
const FormItem = Form.Item;

class Comment extends React.Component {
  state = {
    date:"",
    data:[],
    currentId:"",
    loading:false,
    commentList:[],
  }

  componentWillMount(){
    this.getCommentList();
  }


  getCommentList = ()=>{
    const {articleId} = this.props;
    ApiUtil({articleId},`/api/commentLists`)
    .then(res=>{
        this.setState({commentList:res})
    })
  }

  onReplyComment=id=>{
    
    if(localStorage.getItem("userInfo") && id !== this.state.currentId){
      this.setState({
        currentId:id
      })
    }else if(id === this.state.currentId){
      this.setState({currentId:undefined})

    }
  }

  refresh=()=>{
    this.getCommentList();
  }

  render() {
    const { commentList,loading,currentId} = this.state;
    const { getFieldDecorator } = this.props.form;
    const IconText = ({ type, text }) => (
      <span>
          <Icon type={type} style={{ marginRight: 8 }} />
          {text}
      </span>
      );
    const userName = localStorage.getItem("userName")?"“"+localStorage.getItem("userName")+"”":"";
    return (
    <Spin spinning={loading}>
            {/* 评论 */}
            <div className="comment-box">
              <InputComment articleId={this.props.articleId} refresh={this.refresh}/>
              <div className="comment-content">
                <List
                  itemLayout="vertical"
                  dataSource={commentList}
                  renderItem={item => {
                    return <section key={item._id}>
                      <CommentItem item={item} refresh={this.refresh} onReplyComment={this.onReplyComment}>
                      {item._id === currentId && <InputComment showTitle={false} refresh={this.refresh} articleId={item.articleId} replyUserInfo={{...item}}/>}

                      {item.replyList.length>0 &&<List
                        className="comment-section"
                        itemLayout="vertical"
                        dataSource={item.replyList}
                        renderItem={reply => {
                          return <CommentItem item={reply} refresh={this.refresh} onReplyComment={this.onReplyComment}>
                      {reply._id === currentId && <InputComment showTitle={false} refresh={this.refresh} articleId={item.articleId} replyUserInfo={{...reply}}/>}

                          </CommentItem>

                        }}
                      />}
                      </CommentItem>
                      
                      </section>

                  }}
                />
                
              </div>
            </div>
          </Spin>
    );
  }
}
export default Form.create()(Comment);
