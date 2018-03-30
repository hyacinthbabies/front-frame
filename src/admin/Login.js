import React from "react"
import {Form,Icon, Input, Button, Checkbox,message } from "antd"
const FormItem = Form.Item;

class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();       
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(values["userName"] === "song" && values["password"] === "qian"){
          this.props.history.push("/admin/articleAdd");
        }else{
          message.error("用户名或者密码错误")
        }
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;    
    return (
      <div className="login-container">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <p className="login-title">登录界面</p>          
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
        </Form>
      </div>
      
    );
  }
}
export default Form.create()(Login);
