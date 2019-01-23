import React from "react"
import {Input,List, Button,Spin,Form,Icon, message,Row,Col,Divider,Comment,Avatar} from "antd";
import ApiUtil from "utils/ApiUtil";
import {formatMsgTime} from "utils/dataUtils";
import InputComment from "./InputComment";
import "./style.less"

class CommentItem extends React.Component {
  state = {
    currentId:"",
  }

  replyComment=id=>{
    this.props.onReplyComment(id);
    
  }

  render() {
    const { currentId} = this.state;
    const {item}=this.props;
    // const IconText = ({ type, text }) => (
    //   <span>
    //       <Icon type={type} style={{ marginRight: 8 }} />
    //       {text}
    //   </span>
    //   );
    //   return (
    //     <List.Item
    //       >
    //         <List.Item.Meta
    //           title={<a>{item.userName}</a>}
    //           description={<section>
    //             <div>{item.content}</div>
    //             <section> 
    //             {item.replyList && <span>{item.replyList.length}条回复</span>}
    //             {item.replyList && <Divider type="vertical"/>}
                
    //               <span>{formatMsgTime(new Date(item.time))}</span>
    //               <Divider type="vertical"/>
    //               <a onClick={this.replyComment.bind(null,item._id)}>回复</a>
                
    //             </section>
                
    //             {item._id === currentId && <InputComment showTitle={false} refresh={this.props.refresh} articleId={this.props.articleId} replyUserInfo={{...item}}/>}
    //           </section>}
    //         />
    //       </List.Item>
    // );
    return (<Comment
        actions={[<span>{formatMsgTime(new Date(item.time))}</span>,<a onClick={this.replyComment.bind(null,item._id)}>回复</a>]}
        author={<a>{item.commentId?item.fromUserName:item.userName}</a>}
        avatar={(
          <Avatar
            src={item.commentId?item.toAvatarUrl:item.avatarUrl}
            alt="Han Solo"
          />
        )}
        content={<p>{item.commentId?`回复 ${item.toUserName}：${item.content}`:item.content}</p>}
      >
        {this.props.children}
      </Comment>
    )
  }
}
export default Form.create()(CommentItem);
