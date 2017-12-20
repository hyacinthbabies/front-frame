import React from "react";
import {Link} from "react-router-dom";
class Index extends React.Component{

    render(){
        return [<div className="contanier text-center">
        <div className="header-navbar">
            <a className="header-logo" href="index.html">hyacinth</a>
        </div>
        <nav className="main-nav">
            <ul>
                <li><a className="active" href="home/home.html">主页</a></li>
                <li><Link to="/home">文档</Link></li>
                <li><a href="article/article.html">阅读</a></li>
                <li><a href="about/about.html">关于我</a></li>
                <li><a href="admin/admin.html">管理入口</a></li>
            </ul>
        </nav> 
    </div>,
    <div className="item">
        <a className="image-popup"><img src="./featured-1.jpg"/></a>
    </div>]
    }
}

export default Index;