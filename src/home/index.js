import React from "react"
import { Layout, Menu, Breadcrumb,List, Avatar, Icon } from 'antd'
import ApiUtil from "utils/ApiUtil"
const { Header, Content, Footer } = Layout;

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

    /**
     * 点击菜单
     */
    onClickMenu = item=>{
        switch(item.key){
            case "1":
                this.props.history.push("/article/reading",{id:"BOOK_ID"});
                break;
            case "3":
                this.props.history.push("/about");
                break;
        }
    }
    render(){
      const {listData} = this.state;
      const pagination = {
        pageSize: 10,
        current: 1,
        total: listData.length,
        onChange: (() => {}),
      };
        return <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
            onClick={this.onClickMenu}
          >
            <Menu.Item key="1">文档</Menu.Item>
            <Menu.Item key="2">阅读</Menu.Item>
            <Menu.Item key="3">关于</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <List
                itemLayout="vertical"
                size="large"
                pagination={pagination}
                dataSource={listData}
                renderItem={item => (
                <List.Item
                    key={item.articleName}
                    actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                    extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                >
                    <List.Item.Meta
                    // avatar={<Avatar src={item.avatar} />}
                    title={<a>{item.articleName}</a>}
                    description={item.articleContent.substr(0,30)}
                    />
                    {item.articleContent}
                </List.Item>
                )}
            />

          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          博客 ©2018 songhuaqian
        </Footer>
      </Layout>
    
    }
}

export default Index;