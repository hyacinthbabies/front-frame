import React from 'react'
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import Home from "./iframe/Home";
import Indexs from "./iframe";
import Reading from "./article/Reading";
import Login from "./admin/Login";
import AdminHome from "./admin";
import ArticleAdd from "./admin/ArticleAdd";
import ArticleList from "./admin/ArticleList";
import ArticleDetail from "./admin/ArticleDetail";
import UserList from "./admin/userList";
import About from "./about";
import HomePage from "./home";
// 第一种搭配Router使用<Router history={history}/>
// import createBrowserHistory from 'history/createBrowserHistory'
// const history = createBrowserHistory()
// 第二种使用BrowserRouter，在package.json中加入--history-api-fallback
// 第三种使用hashRouter,路由会带/#/
const fakeAuth = {
  isAuthenticated: true,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) 
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const BasicExample = () => (
  <Router>
    {/* 用了Switch 这里每次只匹配一个路由，所有只有一个节点 */}
    <Switch>
      <Route exact path="/" component={Indexs}/>
      <Route path="/login" component={Login}/>
      <Route path="/about" component={About}/>
      <Route path="/home" component={HomePage}/>
      {/* 管理系统 */}
      <PrivateRoute path="/admin" component={props=>(
          <AdminHome {...props}>
              <PrivateRoute path="/admin/articleAdd" component={ArticleAdd}/>   
              <PrivateRoute path="/admin/articleList" component={ArticleList}/> 
              <PrivateRoute path="/admin/articleDetail/:id" component={ArticleDetail}/> 
              <PrivateRoute path="/admin/userList" component={UserList}/>                 
          </AdminHome>
      )} />  
      {/* 阅读 */}
      <Route 
        path="/article"
        component={props =>(
          <Home {...props}>
            <Route path="/article/skill" component={Reading}/>
            <Route path="/article/reading" component={Reading}/>
            <Route path="/article/article" component={Reading}/>
            <Route path="/article/life" component={Reading}/>
            <Route path="/article/travel" component={Reading}/>
            {/* <Route path="/article/life" component={Login}/> */}
          </Home>
        )}
      />


      
    </Switch>
  </Router>
)

export default BasicExample