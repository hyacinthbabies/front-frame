import React from "react";
import { Timeline,Card,Icon,Avatar,Row,Col } from "antd";
import Newtouch from "../web_modules/images/newtouch.png";
import Step from "images/step.png";
import Home from "images/app.png";
import Nrb from "images/nrb.png";
import Eds from "images/eds.png";
const { Meta } = Card;

/**
 * 个人简历
 * @date 2017-12-25
 * @author songhuaqian
 */
class Index extends React.Component{
    componentDidMount(){
    }
    onChange = ()=>{}
    render(){
        return <div className="about-container">
            <div className = "content-block" id="header">
                <div style={{height:300}}>
                    <header id="site-header" className = "clearfix" style={{width:100,height:100,borderRadius:50,padding:0,display:"flex",flexDirection:"column",justifyContent:"center",margin:10}}>
                        <div style={{color: "#fff",textAlign: "center",fontSize: 25,borderBottom: "1px solid #ffd013"}}>宋华茜</div>
                        <div style={{color: "#fff",textAlign: "center",paddingTop:5}}>前端工程师</div>
                    </header>	
                    
                    <div className = "bottom text-center">
                        <a href="#portfolio"><i className = "fa fa-angle-down fa-3x pulse"></i></a>
                    </div>
                </div>  
            </div> 
            <div id="services" className = "content-block">
                <div id="numbers" className = "parallax">
                    <div className = "overlay">
                        <div className = "container-fluid numbers-title">
                            <div className = "container">
                                <div className = "row block-heading">
                                    <h1></h1>
                                </div>
                            </div>
                        </div>
                        <div className = "container-fluid">
                            <Timeline>
                                <Timeline.Item>
                                    2017年南京特易有信有限公司
                                </Timeline.Item>
                                <Timeline.Item>
                                    2016年上海全端网络有限公司
                                </Timeline.Item>
                                <Timeline.Item>
                                    2016年毕业于江苏大学
                                </Timeline.Item>
                            </Timeline>

                        </div>
                    </div>
                </div>
            </div>            
            <div className = "content-block" id="testimonials" style={{display:"flex",justifyContent:"space-around"}}>
                <Card
                    style={{ width: 300 }}
                >
                    <Meta
                    title="资金平台"
                    description="后台管理系统"
                    />
                    <div className="card-content-hide">react、antd、webpack、loadsh</div>
              </Card>
              <Card
                    style={{ width: 300 }}
                    cover={<img alt="example" src={Nrb}/>}
                >
                    <Meta
                    title="农人帮"
                    description="This is the description"
                    />
                    <div className="card-content-hide">react、antd、webpack、loadsh</div>
              </Card>
              <Card
                    style={{ width: 300 }}
                    cover={<img alt="example" src={Home} />}
                >
                    <Meta
                    title="村花帮app"
                    description="This is the description"
                    />
                    <div className="card-content-hide">react、antd、webpack、loadsh</div>
              </Card>
            </div>	
            <div className = "content-block" id="testimonials" style={{display:"flex",justifyContent:"space-around"}}>
                <Card
                    style={{ width: 300 }}
                    cover={<img alt="example" src={Eds} />}
                >
                    <Meta
                    title="NewtouchEDS微信开发与维护"
                    description="This is the description"
                    />
                    <div className="card-content-hide">react、antd、webpack、loadsh</div>
              </Card>
              <Card
                    style={{ width: 300 }}
                    cover={<img alt="example" src={Newtouch}/>}
                >
                    <Meta
                    title="新致云管理控制台"
                    description="This is the description"
                    />
                    <div className="card-content-hide">react、antd、webpack、loadsh</div>
              </Card>
              <Card
                    style={{ width: 300 }}
                    cover={<img alt="example" src={Step} />}
                >
                    <Meta
                    title="NewtouchStep团队协作"
                    description="This is the description"
                    />
                    <div className="card-content-hide">react、antd、webpack、loadsh</div>
              </Card>
            </div>
            <div className="content-block" id="contact">
                <div className="overlay-3" style={{paddingBottom:10}}>
                    <div className="block-content text-center">
                        <div className="container" style={{display:"flex",justifyContent:"space-around",margin:"5% 30%"}}>
                            <Icon type="github" style={{fontSize:30}}/>
                            <Icon type="weibo-circle" style={{fontSize:30}}/>
                            <Icon type="wechat" style={{fontSize:30}}/>
                            <Icon type="qq" style={{fontSize:30}}/>
                        </div>
                        <p className="text-center">@版权所有 hyacinth个人简历 2017</p>
                    </div>	
                </div>	
            </div>
        </div>
    }
}

export default Index;