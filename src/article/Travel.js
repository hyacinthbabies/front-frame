import React from "react";
import { withRouter } from 'react-router';
// import EChart from "./echart";

class Travel extends React.Component{
    componentWillMount(){
        
    }
    componentDidMount(){
        
    }
    render(){
        // return null
        return <iframe style={{border:0,width:"100%"}} src="https://m.amap.com/roadbook/index/id=5c417b96dcfc201e03dafc32&src=roadbook_qrcode"></iframe>
    }
}
export default withRouter(Travel);