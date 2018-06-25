import React from "react";
import { withRouter } from 'react-router';
import EChart from "./echart";
console.log(EChart,"EChart")
class Travel extends React.Component{
    
    render(){
        return <EChart/>
    }
}
export default withRouter(Travel);