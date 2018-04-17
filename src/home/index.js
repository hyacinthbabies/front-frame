import React from "react"
import { Layout, Menu, Breadcrumb,List, Avatar, Icon } from 'antd'
import ApiUtil from "utils/ApiUtil";
const { Header, Content, Footer } = Layout;

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
class Index extends React.Component{
  state = {
    listData:[]
  }

  componentDidMount(){
    ApiUtil({},"/api/content/list")
    .then(res=>{
      this.setState({listData:res});
    });
    let wookmark;

    // Init lightbox
    $('#container').magnificPopup({
        delegate: 'li:not(.inactive) a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    // Call the layout function after all images have loaded
    imagesLoaded('#container', function () {
        wookmark = new Wookmark('#container', {
            offset: 2, // Optional, the distance between grid items
            itemWidth: 210 // Optional, the width of a grid item
        });
    });
  }

    /**
     * 点击菜单
     */
    onClickMenu = item=>{
        switch(item.key){
            case "1":
                this.props.history.push("/article/reading",{id:"BOOK_ID"});
                break;
            case "3":
                this.props.history.push("/about");
                break;
        }
    }
    render(){
      const {listData} = this.state;
      const pagination = {
        pageSize: 10,
        current: 1,
        total: listData.length,
        onChange: (() => {}),
      };
        return <Layout className="layout photo_container">
          <div role="main">
            <ul id="container" className="tiles-wrap animated">
              <li>
                <a href="http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=e5127fe0db09b3deffb2ec2ba4d606f4/9d82d158ccbf6c813356f460b63eb13532fa40d1.jpg">
                  <img src="http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=e5127fe0db09b3deffb2ec2ba4d606f4/9d82d158ccbf6c813356f460b63eb13532fa40d1.jpg" width="200" height="283"/>
                </a>
                <p>1</p>
              </li>
            </ul>
          </div>
        <Footer style={{ textAlign: 'center' }}>
          博客 ©2018 songhuaqian
        </Footer>
      </Layout>
    
    }
}

export default Index;