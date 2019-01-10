import React from "react"
import { Layout, Menu, Breadcrumb,BackTop, Card, Icon,Popover } from 'antd'
import ApiUtil from "utils/ApiUtil";
import {Link} from "react-router-dom";
const { Header, Content, Footer } = Layout;
const { Meta } = Card;


const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const typeList=[{
    type:"weibo-circle",
    img:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
},{
    type:"github",
    img:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
},{
    type:"wechat",
    img:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
},{
    type:"qq",
    img:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
}]
class Index extends React.Component{
  state = {
    listData:[],
    currentType:"",
    needFixed:false,
    
  }
  lastScrollTop = 0

  componentDidMount(){
    ApiUtil({},"/api/content/list")
    .then(res=>{
      this.setState({listData:res});
    });
    this.onscroll();
  }

  onscroll=()=>{
	window.onscroll = () => {
		const scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop)
		//控制元素块A随鼠标滚动固定在顶部
		if (scrollTop >= this.lastScrollTop) {
			this.setState({ needFixed: true })
		} else if (scrollTop < 50) {
            this.setState({ needFixed: false });
        }
        
        this.lastScrollTop = scrollTop;        
        
    }
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

    // 隐藏
    hide = () => {
        this.setState({
            currentType: "",
        });
    }
    
    // 气泡显示隐藏
    handleVisibleChange = (type,visible) => {
        if(visible){
        this.setState({ currentType: type});
        }else{
        this.setState({ currentType: ""});
        }
    }

    render(){
      const {listData,needFixed} = this.state;
        return <Layout className="layout home_container">
          <div className="contanier text-center" key="1">
            <div className="header-navbar home-navbar" style={needFixed?{}:{transform:"translateZ(0)"}}>
                <a className="header-logo" href="index.html">hyacinth</a>
            </div>
            
            <nav className="main-nav home-nav" style={needFixed ? {transform: "translate3d(0px, -100px, 0px)"} : {}}>
                <ul>
                    <li><Link to="/home/homePage">主页</Link></li>
                    <li><Link to="/home/article/skill">分享</Link></li>
                    <li><Link to="/home/life">每周一技</Link></li>
                    <li><Link to="/home/vedio">声相</Link></li>
                    <li><Link to="/home/about">关于我</Link></li>
                    <li><Link to="/login">管理入口</Link></li>
                </ul>
            </nav> 
        </div>
        <Content className="home-layout">
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" style={{position:"absolute"}}>
                <text style={{fontFamily:"microsoft yahei",fontSize:20}} x="100" y="100" fill="#cd0000">☃️
                    <animate attributeName="x" values="160;100;160" dur="3s" repeatCount="indefinite" />
                </text>
            </svg>
            {this.props.children}
        </Content>
        <BackTop />
        <Footer style={{ textAlign: 'center',padding:0 }}>
          <div className="content-block" id="contact">
                <div className="overlay-3" style={{paddingBottom:10}}>
                    <div className="block-content text-center">
                        <div className="container" style={{display:"flex",justifyContent:"space-around",margin:"5% 30%"}}>
                            
                            {
                                typeList.map(list=>{
                                    return <Popover
                                        key={list.type}
                                        content={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                        trigger="click"
                                        visible={this.state.currentType === list.type}
                                        onVisibleChange={this.handleVisibleChange.bind(this,list.type)}
                                    >
                                        <Icon type={list.type} style={{fontSize:30}}/>
                                    </Popover>
                                })
                            }
                        </div>
                        <p className="text-center"> 博客 ©2018 songhuaqian</p>
                    </div>	
                </div>	
            </div>
        </Footer>
      </Layout>
    
    }
}

export default Index;