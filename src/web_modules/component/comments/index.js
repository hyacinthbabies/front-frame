import React from "react"
import {Input,List, Button,Spin,Form,Icon} from "antd";
import ApiUtil from "utils/ApiUtil";
import {formatMsgTime} from "utils/dataUtils";
const Search = Input.Search;
const FormItem = Form.Item;

class Comment extends React.Component {
  state = {
    date:"",
    data:[],
    currentId:"",
    loading:false,
    commentList:[]
  }

  componentWillMount(){
    this.getCommentList();
  }

  handleSubmit = e=>{
      e.preventDefault();        
      this.props.form.validateFields((err, values) => {
        if (!err) {
          const {articleId} = this.props;
          const params = {
            articleId:articleId,
            userId:1,
            content:values["comment"],
            time:new Date()
          }
          ApiUtil(params,`/api/postComment`,"POST")
          .then(res=>{
            this.getCommentList();
            console.log(res,"/api/postComment")
          })
        }else{
            console.log("error")
        }
      })
  }

  getCommentList = ()=>{
    const {articleId} = this.props;
    ApiUtil({articleId},`/api/commentLists`)
    .then(res=>{
        this.setState({commentList:res})
    })
  }

  render() {
    const {data,commentList,currentId,Comment,loading} = this.state;
    const { getFieldDecorator } = this.props.form;
    const IconText = ({ type, text }) => (
      <span>
          <Icon type={type} style={{ marginRight: 8 }} />
          {text}
      </span>
      );
    return (
    <Spin spinning={loading}>
            {/* 评论 */}
            <div className="comment-box">
              <div className="comment-title">评论</div>
              <div className="comment-form">
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormItem>
                    {getFieldDecorator("comment")(
                      <Input.TextArea
                        rows={4}
                        placeholder="说说你的看法"
                        onFocus={this.onFocus}
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
                      评论
                    </Button>
                  </FormItem>
                </Form>
              </div>
              <div className="comment-content">
                <List
                  itemLayout="horizantal"
                  dataSource={commentList}
                  renderItem={item => (
                    <List.Item
                      key={item.title}
                      // title={"管理员"}
                      actions={
                        [
                          <IconText
                            type="clock-circle-o"
                            text={formatMsgTime(new Date())}
                          />
                        ]
                      }
                    >
                      <List.Item.Meta
                        title={<a>{"管理员"}</a>}
                        description={item.content}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </Spin>
    );
  }
}
export default Form.create()(Comment);
