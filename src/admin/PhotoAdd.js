import React from "react"
import env from "config";
import axios from "axios";
import ApiUtil from "utils/ApiUtil";
import {Form,Icon, Input, Button,message,Select} from "antd"
import { withRouter } from 'react-router'
const FormItem = Form.Item;
const Option = Select.Option;

class PhotoAdd extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            isEdit:false
        }
        this.photoName = "";
    }

    

    componentDidMount(){
        this.init();
    }

    init = e =>{
        $("#file").change(()=> {
            if ($("#file").val() == "") {
                return false;
            }
            let _this = $("#file")[0],
                _file = _this.files[0],
                fileType = _file.type;
            if(fileType.indexOf("image")>-1){
                let formData = new FormData();
                formData.append("pic",_file)
                ApiUtil(formData,`/files/upload`,"POST")
                .then(res=>{
                    console.log(res,"rrr");
                    const photoOriginalName = res.url.split("/");
                    
                    this.photoName = photoOriginalName[photoOriginalName.length-1];
                    
                })
            }
        });
    }

    handleSubmit = e => {
        e.preventDefault();        
        this.props.form.validateFields((err, values) => {
            console.log(this.photoName,"this.photoName")
          if (!err) {
            const params = {
                photoName: this.photoName,
                photoDesciption:values["title"],
                location:values["location"],
                // articleType:values["type"],
                photoDate:new Date()
            }
            if(this.state.isEdit){
                const {state} = this.props.location;
                params.articleId = state.id;
                // axios.post(`/api/updateContent`,params)
                // .then(res=>{
                //     this.setState({loading:false});
                //     message.success("修改成功");
                // });
            }else{
                axios.post(`/api/postPhoto`,params)
                .then(res=>{
                    message.success("保存成功");
                })
            }
          }
        });
    }
    
    render(){
        const {isEdit} = this.state;
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
        return <div style={{width:"100%"}}>
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
                label="图片"
                >
                    <input type="file" id="file" name="pic" />                
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="类型"
                >
                    {
                        getFieldDecorator('type')(
                            <Select style={{ width: 200 }} onChange={this.handleChange}>
                                <Option value="SKILL_ID">技术类</Option>
                                <Option value="LIFE_ID">生活类</Option>
                                <Option value="BOOK_ID">书籍类</Option>
                                <Option value="TRAVEL_ID">旅行类</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" >
                        {isEdit?"修改":"添加"}
                    </Button>
                </FormItem>
            </Form>
        </div>

    }
}

export default Form.create()(withRouter(PhotoAdd));