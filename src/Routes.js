import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'
  import Home from "./iframe/Home";
  const BasicExample = () => (
    <Router>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </div>
    </Router>
  )
  
  
  const About = () => (
    <div>
      <h2>About</h2>
    </div>
  )

  export default BasicExample