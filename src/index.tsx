import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import app from "./reducers";
import Constant from "./web_modules/common/Constant";

let store:any;
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (Constant.dev) {
  store = createStore(app, composeEnhancers(applyMiddleware(thunk)));
} else {
  store = createStore(app, applyMiddleware(thunk));
}

//设置环境
(window as any).__DEV__ = Constant.dev;
class Index extends React.Component<any,any> {
  componentDidMount() {
    //window.addEventListener('resize', this.handleResize);
  }

  render() {
    return <Provider store={store}>
          <div>333333</div>
      </Provider>
  }
}

ReactDOM.render(<Index />, document.getElementById("app"));
