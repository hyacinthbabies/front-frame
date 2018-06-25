import React from "react"
import {Input,List, Avatar,Spin,Form} from "antd";
import ApiUtil from "utils/ApiUtil";
import { withRouter } from 'react-router'
const Search = Input.Search;
const FormItem = Form.Item;

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
      <div className="content-container" style={{boxShadow:"none",borderLeft:"none",background:"#fff",padding:20 }}>
        <div className="">
          <Spin spinning={loading}>
            {/* 新闻详情 */}
            <h1 className="news-title">{data.articleName}</h1>
            <p>2018-05-21</p>
            {/* <div className="article-sub">
              <span>{data.addUserName}</span>
              <span>
                2018-05-21
              </span>
            </div> */}
            <div id="content" />
            {/* 评论 */}
            <div className="comment-box">
              <div className="comment-title">评论</div>
              <div className="comment-form">
                {/* <Form onSubmit={this.handleSubmit} className="login-form">
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
                </Form> */}
              </div>
              {/* <div className="comment-content">
                <List
                  itemLayout="horizantal"
                  dataSource={commentList}
                  renderItem={item => (
                    <List.Item
                      key={item.title}
                      // title={"管理员"}
                      actions={
                        [
                          // <IconText type="dislike" text="隐藏" />
                          // <IconText
                          //   type="clock-circle-o"
                          //   text={formatMsgTime(new Date())}
                          // />
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
              </div> */}
            </div>
          </Spin>
        </div>
      </div>
    );
  }
}
export default withRouter(ArticleDetail);
