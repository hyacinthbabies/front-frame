import React from "react"
import {Input,List, Button,Spin,Form,Icon, message,Row,Col,Empty} from "antd";
import ApiUtil from "utils/ApiUtil";
import {formatMsgTime} from "utils/dataUtils";
import PropTypes from "prop-types";
import "./style.less"
const Search = Input.Search;
const FormItem = Form.Item;

class InputComment extends React.Component {
    static propTypes = {
        showTitle:PropTypes.bool,
        replyUserInfo:PropTypes.object,
        refresh:PropTypes.func
    }

    static defaultProps = {
        showTitle:true,
        replyUserInfo:{}
    }

  state = {
    date:"",
    data:[],
    currentId:"",
    loading:false,
    commentList:[],
  }

  // 提交评论
  postComment = (params)=>{
    ApiUtil(params,`/api/postComment`,"POST")
    .then(res=>{
      this.props.refresh();
      message.success("评论成功");
      this.props.form.resetFields();
      this.setState({
        showName:false
      })
    })
    .catch(err=>{
      message.error("评论失败");
    })
  }

  handleSubmit = e=>{
      e.preventDefault();        
      this.props.form.validateFields((err, values) => {
        if (!err) {
          // /api/postUser
          // 如果第一次登陆
          const userId = localStorage.getItem("userId");
          const userName = localStorage.getItem("userName");
          const {articleId,showTitle,replyUserInfo} = this.props;
          const params = {
            articleId:articleId,
            userId:userId,
            userName:userName,
            content:values["comment"],
            time:new Date()
          }
          if(!userId){
            ApiUtil({userName:values["nickName"],userPwd:values["email"]},`/api/postUser`,"POST")
            .then(res=>{
              params.userId = res._id;
              params.userName = res.userName;
              if(!showTitle && !replyUserInfo.commentId){
                // 回复评论的内容
                  params.commentId = replyUserInfo._id;
                  params.fromUserId = res._id;
                  params.fromUserName = res.userName;
                  params.toUserId = replyUserInfo.userId;
                  params.toUserName = replyUserInfo.userName;
                  this.postReply(params);
                  
              }else if(!showTitle && replyUserInfo.commentId){
                // 回复回复的内容
                  params.commentId = replyUserInfo.commentId;
                  params.fromUserId = res._id;
                  params.fromUserName = res.userName;
                  params.toUserId = replyUserInfo.toUserId;
                  params.toUserName = replyUserInfo.toUserName;
                  this.postReply(params);
              }else{
                this.postComment(params);
              }
              localStorage.setItem("userName",res.userName);  
              localStorage.setItem("userId",res._id);
            })
          }else{
              if(!showTitle && !replyUserInfo.commentId){
                // 回复评论的内容
                  params.commentId = replyUserInfo._id;
                  params.fromUserId = userId;
                  params.fromUserName = userName;
                  params.toUserId = replyUserInfo.userId;
                  params.toUserName = replyUserInfo.userName;
                  this.postReply(params);
                  
              }else if(!showTitle && replyUserInfo.commentId){
                // 回复回复的内容
                  params.commentId = replyUserInfo.commentId;
                  params.fromUserId = userId;
                  params.fromUserName = userName;
                  params.toUserId = replyUserInfo.toUserId;
                  params.toUserName = replyUserInfo.toUserName;
                  this.postReply(params);
              }else{
                this.postComment(params);
              }
          }  
        }
      })
  }

//   回复
  postReply = params =>{
    ApiUtil(params,`/api/postReply`,"PUT")
    .then(res=>{
        this.props.refresh();
        message.success("回复成功");
        this.props.form.resetFields();
        this.setState({
            showName:false
        })
    })
  }

  onFocus = ()=>{
    if(localStorage.getItem("userId")){
      this.setState({
        showName:false
      })
    }else{
      this.setState({
        showName:true
      })
    }
  }

  render() {
    const { commentList,loading} = this.state;
    const { showTitle,replyUserInfo } = this.props;
    const { getFieldDecorator } = this.props.form;
    const IconText = ({ type, text }) => (
      <span>
          <Icon type={type} style={{ marginRight: 8 }} />
          {text}
      </span>
      );
    const userName = localStorage.getItem("userName")?"“"+localStorage.getItem("userName")+"”":"";
    const placeholder = !showTitle?(replyUserInfo.commentId?`回复 ${replyUserInfo.fromUserName}：`:`回复 ${replyUserInfo.userName}：`):`${userName}说说你的看法`;
    return (
        <div className="comment-box">
            {showTitle && <div className="comment-title">评论</div>}
            <div className="comment-form">
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                {getFieldDecorator("comment")(
                    <Input.TextArea
                    rows={2}
                    placeholder={placeholder}
                    onFocus={this.onFocus}
                    />
                )}
                </FormItem>
                <Row>
                <Col span={11}>
                {
                    this.state.showName && <FormItem>
                    {getFieldDecorator("nickName")(
                        <Input
                        placeholder="请输入昵称"
                        />
                    )}
                    </FormItem>
                }
                </Col>
                <Col span={11} offset={2}>
                {
                    this.state.showName && <FormItem>
                    {getFieldDecorator("email")(
                        <Input
                        placeholder="请输入邮箱"
                        />
                    )}
                    </FormItem>
                    }
                </Col>
                </Row>
                

                <FormItem>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ float: "right" }}
                >
                    {showTitle?"评论":"回复"}
                </Button>
                </FormItem>
            </Form>
            </div>
        </div>
    );
  }
}
export default Form.create()(InputComment);
