import React from "react"
import { Layout, Menu, Icon ,Input,Card,Avatar} from 'antd';
import {Link} from "react-router-dom";
const { Header, Sider, Content } = Layout;
const Search = Input.Search;
const { Meta } = Card;
const SubMenu = Menu.SubMenu;

class Index extends React.Component {
    state = {
        collapsed: false,
    }

    /**
     * 收起菜单栏
     */
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }    

    /**
     * 退出到首页
     */
    logout = ()=>{
        this.props.history.push("/");
    }

    /**
     * 点击菜单
     */
    onClickMenu = item=>{
        switch(item.key){
            case "1":
                this.props.history.push("/admin/articleAdd");
                break;
            case "2":
                this.props.history.push("/admin/articleList");
                break;
            case "3":
                this.props.history.push("/admin/userList");
                break;
            default:
                this.props.history.push("/admin/articleAdd");
                break;
        }
    }
  
    render() {
        return (
        <Layout className="components-layout-demo-custom-trigger">
            <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            >
            <div className="logo" />
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
                onClick={this.onClickMenu}
                >
                <SubMenu key="sub1" title={<span><Icon type="mail" /><span>文章设置</span></span>}>
                    <Menu.Item key="1">添加文章</Menu.Item>
                    <Menu.Item key="2">文章列表</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>用户设置</span></span>}>
                    <Menu.Item key="3">用户列表</Menu.Item>
                </SubMenu>
                </Menu>

            </Sider>
            <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggleCollapsed}
                />
                <Avatar 
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                onClick={this.logout}
                style={{top:9,cursor:"pointer"}}/>
            </Header>
            <Content style={{ margin: '24px 16px', display:"flex", background: '#fff', minHeight: 280 }}>
                {this.props.children}
            </Content>
            </Layout>
        </Layout>
        );
    }
}
export default Index;
