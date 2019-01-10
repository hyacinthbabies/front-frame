import React from "react"
import { Layout, Menu, Breadcrumb,List, Card, Icon } from 'antd'
import ApiUtil from "utils/ApiUtil";
import {Link} from "react-router-dom";
import { withRouter } from 'react-router'
const { Header, Content, Footer } = Layout;
const { Meta } = Card;


const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
class Index extends React.Component{
  state = {
    listData:[]
  }

  componentDidMount(){
    ApiUtil({},"/api/content/list")
    .then(res=>{
      this.setState({listData:res});
    });
  }

    render(){
      const {listData} = this.state;
        return <Layout className="layout homepage_container">
        <Content>
          <section>
            <p>最新内容</p>
            <div className="card-container">
            {
              listData.map((list,index)=>{
                if(index<4){
                  return  <Card
                    key={list._id}
                    style={{ width: 250 }}
                    cover={
                      [<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                      ,<span className="type_tag">
                        技术
                      </span>]
                    }
                  >
                    <Meta
                      title={list.articleName}
                      description={list.authorName}
                    />
                    <div>
                    box-shadow 属性向框添加一个或多个阴影。 提示:请使用 !
                    </div>
                  </Card>
                }
              })
            }
            </div>
          </section>
          <section>
            <p>最新内容</p>
            <div className="card-container">
            {
              listData.map((list,index)=>{
                if(index<4){
                  return  <Card
                    key={list._id}
                    style={{ width: 250 }}
                    cover={
                      [<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                      ,<span className="type_tag">
                        技术
                      </span>]
                    }
                  >
                    <Meta
                      title={list.articleName}
                      description={list.authorName}
                    />
                    <div>
                    box-shadow 属性向框添加一个或多个阴影。 提示:请使用 !
                    </div>
                  </Card>
                }
              })
            }
            </div>
          </section>
        </Content>
      </Layout>
    
    }
}

export default withRouter(Index);