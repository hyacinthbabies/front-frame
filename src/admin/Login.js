import React from "react"
import {Form,Icon, Input, Button, Checkbox } from "antd"
import { withRouter } from 'react-router'
import PropTypes from "prop-types"
import ApiUtil from "utils/ApiUtil"
const FormItem = Form.Item;

class Login extends React.Component {
  static propTypes ={
    callback:PropTypes.func
  }

  state={
    qrUrl:"",
    uuid:""
  }

  componentWillMount(){
    ApiUtil({},"/files/wxQR")
    .then(res=>{
      this.setState({qrUrl:res.qrUrl,uuid:res.uuid});
      localStorage.setItem("uuid",res.uuid)
      console.log(res,"=========res==========")
    })  
  }

  // 登录
  handleSubmit = (e) => {
    e.preventDefault(); 
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     if(values["userName"] === "song" && values["password"] === "qian"){
    //       this.props.history.push("/admin/articleAdd");
    //     }else{
    //       message.error("用户名或者密码错误")
    //     }
    //   }
    // });
  }
  render() {
    const { getFieldDecorator } = this.props.form;    
    return (
      <div className="login-container">
        <img src={this.state.qrUrl} />   
        {/* <Form onSubmit={this.handleSubmit} className="login-form">
          <p className="login-title">登录界面</p> 
          <img src={this.state.qrUrl} />         
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入姓名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入姓名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>自动登录</Checkbox>
            )}
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </FormItem>
        </Form> */}
      </div>
      
    );
  }
}
export default Form.create()(withRouter(Login));
