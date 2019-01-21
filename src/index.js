import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import "style/style.less";
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
//设置环境
// (window as any).__DEV__ = Constant.dev;
class Index extends React.Component {
  componentDidMount() {
    //window.addEventListener('resize', this.handleResize);
  }

  render() {
    return <LocaleProvider locale={zhCN}><Routes/></LocaleProvider>
  }
}

ReactDOM.render(<Index />, document.getElementById("app"));
