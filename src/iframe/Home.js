import React from "react"
import { Layout, Menu, Icon ,Input,Card,Avatar} from 'antd';
import {Link} from "react-router-dom";
import "./style.less";
import Audio from "images/bigFish.mp3";
const { Header, Sider, Content } = Layout;
const Search = Input.Search;
const { Meta } = Card;
class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };
  componentDidMount(){
    console.log(this.audio,"ddd")
    
    
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  
  render() {
    const examples = [2,3];
    return (
      <Layout className="components-layout-demo-custom-trigger">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu 
          theme="dark" 
          mode="inline"
          defaultSelectedKeys={['1']} 
          inlineCollapsed={this.state.collapsed}>
            <Menu.Item key="1">
              <i className="iconfont article-menu-icon">&#xe60d;</i>
              <span className="article-menu-item">阅读</span>
            </Menu.Item>
            <Menu.Item key="2">
              <i className="iconfont article-menu-icon">&#xe628;</i>
              <span className="article-menu-item">文章</span>
            </Menu.Item>
            <Menu.Item key="3">
              <i className="iconfont article-menu-icon">&#xe614;</i>
              <span className="article-menu-item">生活</span>
            </Menu.Item>
            <Menu.Item key="4">
              <i className="iconfont article-menu-icon">&#xe601;</i>
              <span className="article-menu-item">旅行</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <audio ref={ref=>this.audio= ref} preload="auto" controls style={{position: "absolute",top: 18}}>
              <source src={Audio}/>
              {/* <!-- <source src="audio/BlueDucks_FourFlossFiveSix.ogg">
              <source src="audio/BlueDucks_FourFlossFiveSix.wav"> --> */}
              </audio>
          </Header>
          <Content style={{ margin: '24px 16px', display:"flex", background: '#fff', minHeight: 280 }}>
              {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default SiderDemo;
