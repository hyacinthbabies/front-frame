import React from "react";
import ReactDOM from "react-dom";
import Constant from "./web_modules/common/Constant";
import Routes from "./Routes";

//设置环境
// (window as any).__DEV__ = Constant.dev;
class Index extends React.Component {
  componentDidMount() {
    //window.addEventListener('resize', this.handleResize);
  }

  render() {
    return <Routes/>
  }
}

ReactDOM.render(<Index />, document.getElementById("app"));
