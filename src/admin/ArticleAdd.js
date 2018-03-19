import React from "react"
import WangEditor from "./wangEditor"
import axios from "axios";
import ApiUtil from "utils/ApiUtil";
import {Form,Icon, Input, Button,message,Select} from "antd"
const FormItem = Form.Item;
const Option = Select.Option;

/**
 * 新增文章
 * @date 2017-12-27
 * @author songhuaqian
 */
class ArticleAdd extends React.Component{
    state = {
        loading:false,
        isEdit:false//是否处于编辑状态
    }

    componentDidMount(){
        this.props.form.setFieldsValue({
            type:"SKILL_ID"
        });
        const {state} = this.props.location;
        if(state && state.id){
            this.getArticleDetail(state.id);   
            this.setState({isEdit:true})         
        }
    }

    //编辑页填充数据
    onEditValue = values =>{
        this.props.form.setFieldsValue({
            type:"SKILL_ID",
            title:values.articleName,
            author:values.authorName,
            editor:values.articleContent
        });
        this.handle(values.articleContent);
    }

    //查询详情
    getArticleDetail = id =>{
        this.setState({loading:true});
        ApiUtil({},`/api/queryContent/${id}`)
        .then(res=>{
            this.onEditValue(res);
            this.setState({loading:false});
        })
    }
    
    //提交文章
    handleSubmit = (e) => {
        e.preventDefault();        
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const params = {
                articleName:values["title"],
                articleContent:values["editor"],
                authorName:values["author"],
                articleType:values["type"],
                articleDate:new Date()
            }
            if(this.state.isEdit){
                const {state} = this.props.location;
                params.articleId = state.id;
                axios.post(`/api/updateContent`,params)
                .then(res=>{
                    this.setState({loading:false});
                    message.success("修改成功");
                });
            }else{
                axios.post(`/api/postContent`,params)
                .then(res=>{
                    message.success("保存成功");
                })
            }
          }
        });
    }

    handleChange = val =>{
        console.log(val)
    }

    onChangeEditor = val=>{
    }

    changeTxt = handle =>{
        this.handle = handle;
    }

    updateArticle = param=>{
        this.setState({loading:true});
        ApiUtil(param,`/api/updateContent`)
        .then(res=>{
            this.onEditValue(res);
            this.setState({loading:false,placeholder:res.editorValue});
        })
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
                        <WangEditor id="wangeditor" onChange={this.onChangeEditor} changeTxt={this.changeTxt}/>
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

export default Form.create()(ArticleAdd);