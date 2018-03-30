import React from "react";
import {Link} from "react-router-dom";
class Index extends React.Component{

    render(){
        return [<div className="contanier text-center" key="1">
        <div className="header-navbar">
            <a className="header-logo" href="index.html">hyacinth</a>
        </div>
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" style={{position:"absolute"}}>
            <text style={{fontFamily:"microsoft yahei",fontSize:20}} x="100" y="100" fill="#cd0000">☃️
                <animate attributeName="x" values="160;100;160" dur="3s" repeatCount="indefinite" />
            </text>
        </svg>
        <nav className="main-nav">
            <ul>
                <li><Link to="/home">主页</Link></li>
                <li><Link to="/article/reading">分享</Link></li>
                <li><Link to="/life">未知空间</Link></li>
                <li><Link to="/about">关于我</Link></li>
                <li><Link to="/login">管理入口</Link></li>
            </ul>
        </nav> 
    </div>,
    <div className="item" key="2">
        <a className="image-popup"><img src="./featured-1.jpg"/></a>
    </div>]
    }
}

export default Index;