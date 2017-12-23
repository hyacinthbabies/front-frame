import React from "react"
import WangEditor from "./wangEditor"
import {Form,Icon, Input, Button,message,Select} from "antd"
const FormItem = Form.Item;
const Option = Select.Option;

class ArticleAdd extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();        
        this.props.form.validateFields((err, values) => {
          if (!err) {
            
          }
        });
    }

    handleChange = val =>{
        console.log(val)
    }

    render(){
        const { getFieldDecorator } = this.props.form; 
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 1 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 20 },
            },
          };      
        return <div style={{padding:20,width:"100%"}}>
            <Form onSubmit={this.handleSubmit} className="login-form">         
            <FormItem 
            {...formItemLayout}
            label="标题"
            >
                {getFieldDecorator('title')(
                <Input placeholder="请输入标题" />
                )}
            </FormItem>
            <FormItem 
            {...formItemLayout}
            label="作者"
            >
                {getFieldDecorator('author')(
                <Input placeholder="请输入作者" />
                )}
            </FormItem>
            <FormItem 
            {...formItemLayout}
            label="内容"
            >
                {getFieldDecorator('editor')(
                    <WangEditor id="wangeditor" onChange={()=>{}}/>
                    // <Input placeholder="请输入作者" />
                )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label="类型"
            >
                {
                    getFieldDecorator('type')(
                        <Select style={{ width: 200 }} onChange={this.handleChange}>
                            <Option value="skill">技术类</Option>
                            <Option value="life">生活类</Option>
                            <Option value="book">书籍类</Option>
                        </Select>
                    )
                }
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit" >
                    添加
                </Button>
            </FormItem>
            </Form>
        </div>
    }
}

export default Form.create()(ArticleAdd);