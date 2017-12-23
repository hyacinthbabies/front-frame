import React from "react"
import WangEditor from "./wangEditor"

class ArticleAdd extends React.Component{
    render(){
        return <div>
            <WangEditor id="wangeditor" onChange={()=>{}}/>
        </div>
    }
}

export default ArticleAdd;