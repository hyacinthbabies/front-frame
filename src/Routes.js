import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'
  import Home from "./iframe/Home";
  import Indexs from "./iframe";
  const BasicExample = () => (
    <Router>
      <div>
        <Route exact path="/" component={Indexs}/>
        <Route path="/home" component={Home}/>
      </div>
    </Router>
  )
  
  
  const About = () => (
    <div>
      <h2>About</h2>
    </div>
  )

  export default BasicExample