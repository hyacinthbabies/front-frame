import React from "react"
import {Input,List, Avatar,Spin} from "antd";
const Search = Input.Search;
class Reading extends React.Component {
  render() {
    const data = [{"gender":"male","name":{"title":"mr","first":"estéban","last":"rolland"},"email":"estéban.rolland@example.com","nat":"FR"},{"gender":"female","name":{"title":"miss","first":"beatrice","last":"gauthier"},"email":"beatrice.gauthier@example.com","nat":"CA"},{"gender":"female","name":{"title":"mrs","first":"elizabeth","last":"taylor"},"email":"elizabeth.taylor@example.com","nat":"NZ"},{"gender":"male","name":{"title":"mr","first":"yassin","last":"heinhuis"},"email":"yassin.heinhuis@example.com","nat":"NL"},{"gender":"male","name":{"title":"mr","first":"بنیامین","last":"نكو نظر"},"email":"بنیامین.نكونظر@example.com","nat":"IR"}]
    return (
      [<div style={{flex:1}} key="1">
        <div className="title-search">
          <Search 
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
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="http://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a href="https://ant.design">{item.name.last}</a>}
                  description="明天是平安夜"
                />
              </List.Item>
            )}
          />

        </div>
      </div>,
      <div style={{flex:3,borderLeft:"1px solid #ddd",boxShadow:"-2px 0 4px #ddd",display:"flex",flexDirection:"column"}} key="2">
          <div style={{ lineHeight: "49px",height: 49,padding: "0 10px",borderBottom: "1px solid #ddd"}}>
              日期：2017-12-21
          </div>
          <div style={{flex:"auto"}}>

          </div>
      </div>]
    );
  }
}
export default Reading;
