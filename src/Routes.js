import React from 'react'
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import Home from "./iframe/Home";
import Indexs from "bundle-loader?lazy!./iframe";
import Reading from "bundle-loader?lazy!./article/Reading";
import Life from "bundle-loader?lazy!./article/Life";
import Login from "bundle-loader?lazy!./admin/Login";
import AdminHome from "./admin";
import ArticleAdd from "bundle-loader?lazy!./admin/ArticleAdd";
import PhotoAdd from "bundle-loader?lazy!./admin/PhotoAdd";
import ArticleList from "bundle-loader?lazy!./admin/ArticleList";
import ArticleDetail from "bundle-loader?lazy!./admin/ArticleDetail";
import UserList from "bundle-loader?lazy!./admin/userList";
import About from "bundle-loader?lazy!./about";
import HomeIndex from "./home";
import HomePage from "bundle-loader?lazy!./home/Home";
import Bundle from './bundle.js';
import Skill from "bundle-loader?lazy!./article/Skill";
import Travel from "bundle-loader?lazy!./article/Travel";
import VedioHome from "bundle-loader?lazy!./vedio";
import WeeklyHome from "bundle-loader?lazy!./week";
import WeekList from "bundle-loader?lazy!./week/WeekList";
const BlogIndexs = () => (
	<Bundle load={Indexs}>
		{(List) => <List/>}
	</Bundle>
)

const BlogReading = () => (
	<Bundle load={Reading}>
		{(List) => <List/>}
	</Bundle>
)

const BlogSkill = () => (
	<Bundle load={Skill}>
		{(List) => <List/>}
	</Bundle>
)

const BlogTravel = () => (
	<Bundle load={Travel}>
		{(List) => <List/>}
	</Bundle>
)

const BlogLife = () => (
	<Bundle load={Life}>
		{(List) => <List/>}
	</Bundle>
)


const BlogUserList = () => (
	<Bundle load={UserList}>
		{(List) => <List/>}
	</Bundle>
)

const BlogAbout = () => (
	<Bundle load={About}>
		{(List) => <List/>}
	</Bundle>
)

const BlogHomePage = () => (
	<Bundle load={HomePage}>
		{(List) => <List/>}
	</Bundle>
)

const BlogArticleAdd = ()=>(
  <Bundle load={ArticleAdd}>
    {(List) => <List/>}
  </Bundle>
)

const BlogPhotoAdd = ()=>(
  <Bundle load={PhotoAdd}>
    {(List) => <List/>}
  </Bundle>
)

const BlogArticleList = ()=>(
  <Bundle load={ArticleList}>
		{(List) => <List/>}
	</Bundle>
)

const BlogArticleDetail = ()=>(
  <Bundle load={ArticleDetail}>
		{(List) => <List/>}
	</Bundle>
)

const BlogLogin = ()=>(
  <Bundle load={Login}>
		{(List) => <List/>}
	</Bundle>
)

const BlogVedioHome = ()=>(
  <Bundle load={VedioHome}>
		{(List) => <List/>}
	</Bundle>
)

const BlogWeeklyHome = ()=>(
  <Bundle load={WeeklyHome}>
		{(List) => <List/>}
	</Bundle>
)

const BlogWeekList = ()=>(
  <Bundle load={WeekList}>
		{(List) => <List/>}
	</Bundle>
)
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
      <Route exact path="/" component={BlogIndexs}/>
      <Route path="/login" component={BlogLogin}/>
      
      {/* <Route path="/home" component={HomePage}/> */}
      {/* 管理系统 */}
      <PrivateRoute path="/admin" component={props=>(
          <AdminHome {...props}>
              <PrivateRoute path="/admin/articleAdd" component={BlogArticleAdd}/>
              <PrivateRoute path="/admin/photoAdd" component={BlogPhotoAdd}/>    
              <PrivateRoute path="/admin/articleList" component={BlogArticleList}/> 
              <PrivateRoute path="/admin/articleDetail/:id" component={BlogArticleDetail}/> 
              <PrivateRoute path="/admin/userList" component={BlogUserList}/>                 
          </AdminHome>
      )} />  
      {/* 阅读 */}
      <Route path="/home" component={props=>(
        <HomeIndex {...props}>
          <Route path="/home/homePage" component={BlogHomePage}/>
          <Route path="/home/about" component={BlogAbout}/>
          <Route path="/home/vedio" component={BlogVedioHome}/>
          <Route path="/home/week" component={BlogWeeklyHome}/> 
          {/* <Route path="/home/weekList" component={BlogWeekList}/>  */}

          <Route 
            path="/home/article"
            component={props2 =>(
              <Home {...props2}>
                <Route path="/home/article/skill" component={BlogSkill}/>
                <Route path="/home/article/reading" component={BlogReading}/>
                <Route path="/home/article/article" component={BlogReading}/>
                <Route path="/home/article/life" component={BlogLife}/>
                <Route path="/home/article/travel" component={BlogTravel}/>
                <Route path="/home/article/weekList" component={BlogWeekList}/> 
                
                <Route path="/home/article/articleDetail/:id" component={BlogArticleDetail}/> 
                {/* <Route path="/article/life" component={Login}/> */}
              </Home>
            )}
          />
        </HomeIndex>
      )}/>
      
    </Switch>
  </Router>
)

export default BasicExample