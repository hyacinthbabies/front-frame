import React from "react";
import {Link} from "react-router-dom";
class Index extends React.Component{

    render(){
        return [<div className="contanier text-center" key="1">
        <div className="header-navbar">
            <a className="header-logo" href="index.html">hyacinth</a>
        </div>
        <nav className="main-nav">
            <ul>
                <li><Link to="/">主页</Link></li>
                <li><Link to="/reading">文档</Link></li>
                <li><Link to="/life">阅读</Link></li>
                <li><Link to="/reading">关于我</Link></li>
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