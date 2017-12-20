import env from "../config";
import axios from "axios";

const ajax = (
  data,
  url,
  type = "POST",
  timeout = 10000,
  root = env.BASE_URl,
  isFormData
) => {
  const headers = { "Content-Type": "application/json" };
  const tokens = window.localStorage.getItem("x-auth-token");
  if (tokens) {
    headers["x-auth-token"] = tokens;
  }
  if (isFormData) {
    headers["Content-Type"] = "multipart/form-data";
  }
  const options = {
    url: url,
    method: type,
    baseURL: root,
    headers: headers,
    timeout: timeout
  };

  if (type === "GET" || type === "DELETE") {
    options["params"] = data;
  } else {
    options["data"] = data;
  }
  return axios(options).then(response => {
    let { headers, data, status } = response;
    let token = headers["x-auth-token"];
    if (token) {
      window.localStorage.setItem("x-auth-token", token);
    }
    let contentType = headers["content-type"];
    if (status !== 200) {
      return Promise.reject(new Error("服务器请求失败"));
    }

    if (contentType && contentType.indexOf("application/json") !== -1) {
      let { retCode, retMsg } = data;

      // if (retCode === "10005") {
      //   window.localStorage.removeItem("x-auth-token");
      //   window.location.href = "/login" + "长时间未操作，请重新登陆";
      //   return Promise.reject(retMsg);
      // }

      // if (retCode !== "10000") {
      //   return Promise.reject(retMsg);
      // }

      return Promise.resolve(data);
    } else {
      return Promise.reject(new Error("the response is not JSON"));
    }
  });
};

// import axios from 'axios';
// import env from "../config";
// // axios 配置
// axios.defaults.timeout = 5000;
// axios.defaults.baseURL = env.BASE_URl;
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// // axios.defaults.headers.common['x-user-id'] = 1;
// // axios.defaults.headers.common['x-corp-id'] = 1;
// // http response 拦截器
// axios.interceptors.response.use(response => response, (error) => {
//   if (error.response) {
//     // switch (error.response.status) {
//     //   case 401:
        
//     //     break;
//     //   default:
//     //     break;
//     // }
//   }
//   return Promise.reject(error.response.data);
// });
// export default axios;