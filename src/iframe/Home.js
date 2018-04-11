import React from "react"
import { Layout, Menu, Icon ,Input,Card,Avatar} from 'antd';
import {Link} from "react-router-dom";
import Audio from "images/bigFish.mp3";
import ApiUtil from "utils/ApiUtil";
import {getValueById} from "utils/dataUtils";
import HomeImg from "images/hyacinth.jpg";
import { withRouter } from 'react-router'
const { Header, Sider, Content } = Layout;
const Search = Input.Search;
const { Meta } = Card;
class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    currentKey:"1",
    countList:[]
  };

  componentDidMount(){
    this.getCount();
  }

  /**
   * 获取数量
   */
  getCount =()=>{
    //查询列表
    ApiUtil({},"/api/getArticlesCount")
    .then(res=>{
      this.setState({countList:res});
    })
  }

  goHome = ()=>{
    this.props.history.push("/");
  }

  // toggle = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed,
  //   });
  // }

  /**
   * 点击菜单
   */
  onClickMenu = item=>{
    this.setState({
      currentKey:item.key
    })
    switch(item.key){
        case "1":
            this.props.history.push("/article/skill",{id:"SKILL_ID"});
            break;
        case "2":
            this.props.history.push("/article/reading",{id:"BOOK_ID"});
            break;
        case "3":
            this.props.history.push("/article/life",{id:"LIFE_ID"});
            break; 
        case "4":
            this.props.history.push("/article/travel",{id:"TRAVEL_ID"});
            break;  
        default:
          break;
    }
  }
  
  render() {
    return (
      <Layout className="components-layout-demo-custom-trigger">
        <Sider
          trigger={null}
          collapsible
          // collapsed={this.state.collapsed}
        >
          <div className="article-iframe-header">
            <img src={HomeImg} style={{width:40,height:40,cursor:"pointer"}} onClick={this.goHome}/>
            <span style={{color:"#fff",paddingTop:10,marginLeft:20}}>分享</span>            
          </div>
          
          <Menu 
          theme="dark" 
          mode="inline"
          defaultSelectedKeys={[this.state.currentKey]} 
          // inlineCollapsed={this.state.collapsed}
          onClick={this.onClickMenu}>
            <Menu.Item key="1">
              <Icon className="iconfont article-menu-icon">&#xe60d;</Icon>
              <span className="article-menu-item">技术</span>
              <span style={{marginLeft:20}}>
              {getValueById("SKILL_ID",this.state.countList)["count"]}
              </span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon className="iconfont article-menu-icon">&#xe628;</Icon>
              <span className="article-menu-item">阅读</span>
              <span style={{marginLeft:20}}>
              {getValueById("BOOK_ID",this.state.countList)["count"]}
              </span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon className="iconfont article-menu-icon">&#xe614;</Icon>
              <span className="article-menu-item">生活</span>
              <span style={{marginLeft:20}}>
              {getValueById("LIFE_ID",this.state.countList)["count"]}
              </span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon className="iconfont article-menu-icon">&#xe601;</Icon>
              <span className="article-menu-item">旅行</span>
              
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            {/* <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            /> */}
            <audio ref={ref=>this.audio= ref} preload="auto" controls style={{position: "absolute",top: 18,marginLeft:20}}>
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
export default withRouter(SiderDemo);
