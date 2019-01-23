import React from "react"
import {Input,List, Button,Modal,Form,Icon, message,Row,Col,Empty} from "antd";
import ApiUtil from "utils/ApiUtil";
import {formatMsgTime} from "utils/dataUtils";
import Login from "../../../admin/Login";
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
          const userInfo = JSON.parse(localStorage.getItem("userInfo"));
          const userName =userInfo.userName;
          const userId = userInfo._id;

          const {articleId,showTitle,replyUserInfo} = this.props;
          const params = {
            articleId:articleId,
            userId:userId,
            userName:userName,
            avatarUrl:userInfo.avatarUrl,
            content:values["comment"],
            time:new Date()
          }
          if(!showTitle && !replyUserInfo.commentId){
            // 回复评论的内容
              params.commentId = replyUserInfo._id;
              params.fromUserId = userId;
              params.fromUserName = userName;
              params.toUserId = replyUserInfo.userId;
              params.toUserName = replyUserInfo.userName;
              params.toAvatarUrl = replyUserInfo.avatarUrl;
              this.postReply(params);
              
          }else if(!showTitle && replyUserInfo.commentId){
            // 回复回复的内容
              params.commentId = replyUserInfo.commentId;
              params.fromUserId = userId;
              params.fromUserName = userName;
              params.toUserId = replyUserInfo.toUserId;
              params.toUserName = replyUserInfo.toUserName;
              params.toAvatarUrl = replyUserInfo.toAvatarUrl;
              this.postReply(params);
          }else{
            this.postComment(params);
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

  // 评论框获取焦点
  onFocus = ()=>{
    if(localStorage.getItem("userInfo")){
      this.setState({
        visible:false
      })
    }else{
      this.setState({
        visible:true
      });
      const uuid = localStorage.getItem("uuid");
      this.intv = setInterval(()=>{
        ApiUtil({uuid:uuid},`/api/login`)
        .then(res=>{
          // 如果存在值则表示扫码登录成功
          if(res){
            localStorage.setItem("userInfo",JSON.stringify(res));
            this.setState({visible:false,userInfo:res});
            clearInterval(this.intv);
            message.success("登录成功");
          }
        })
      },10000)
    }
  }

  onCancel=()=>{
    this.setState({
      visible:false
    });
    clearInterval(this.intv);
  }



  render() {
    const { showTitle,replyUserInfo } = this.props;
    const { getFieldDecorator } = this.props.form;
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userName = userInfo ?"“"+userInfo.userName+"”":"";
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
                      onClick={this.onFocus}
                      />
                  )}
                  </FormItem>
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
            <Modal
            title="微信扫码登录"
              wrapClassName="comment-login"
              visible={this.state.visible}
              footer={null}
              onCancel={this.onCancel}
            >
              <Login/>
            </Modal>
        </div>
    );
  }
}
export default Form.create()(InputComment);
