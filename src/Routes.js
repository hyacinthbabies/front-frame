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
        {/* 管理系统 */}
        <PrivateRoute path="/admin" component={props=>(
            <AdminHome {...props}>
                <PrivateRoute path="/admin/articleAdd" component={ArticleAdd}/>                    
            </AdminHome>
        )} />  
        {/* 阅读 */}
        <Route 
          component={props =>(
            <Home {...props}>
              <Route path="/reading" component={Reading}/>
              <Route path="/life" component={Login}/>
            </Home>
          )}
        />

        
      </Switch>
    </Router>
  )
  
  
  const About = () => (
    <div>
      <h2>About</h2>
    </div>
  )

  

  export default BasicExample