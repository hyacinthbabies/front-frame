import React from "react";
//导入echarts
import echarts from "echarts"; //必须
import "echarts/lib/chart/bar"; //图表类型
import "echarts/lib/component/title"; //标题插件
import "echarts/lib/chart/map";
import "echarts/map/js/china";
export default class EChart extends React.Component {
  componentDidMount() {
    this.init();
  }

  /**
     * 初始化图表
     */
  init = () => {
    //初始化echarts
    const myChart = echarts.init(this.eChart);
    //我们要定义一个setPieOption函数将data传入option里面
    // const options = this.setOption();
    const option = {
      title : {
          text: '中国旅行地图',
          subtext: '纯属虚构',
          left: 'center'
      },
      tooltip : {
          trigger: 'item'
      },
      legend: {
          orient: 'vertical',
          left: 'left',
          data:['iphone3','iphone4','iphone5']
      },
      visualMap: {
          min: 0,
          max: 2500,
          left: 'left',
          top: 'bottom',
          text:['高','低'],           // 文本，默认为数值文本
          calculable : true
      },
      toolbox: {
          show: true,
          orient : 'vertical',
          left: 'right',
          top: 'center',
          feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              restore : {show: true},
              saveAsImage : {show: true}
          }
      },
      series : [
          {
              name: 'iphone3',
              type: 'map',
              mapType: 'china',
              roam: false,
              label: {
                  normal: {
                      show: false
                  },
                  emphasis: {
                      show: true
                  }
              },
              data:[
                  {name: '北京',value: Math.round(Math.random()*1000)},
                  {name: '天津',value: Math.round(Math.random()*1000)},
                  {name: '上海',value: Math.round(Math.random()*1000)},
                  {name: '重庆',value: Math.round(Math.random()*1000)},
                  {name: '河北',value: Math.round(Math.random()*1000)},
                  {name: '河南',value: Math.round(Math.random()*1000)},
                  {name: '云南',value: Math.round(Math.random()*1000)},
                  {name: '辽宁',value: Math.round(Math.random()*1000)},
                  {name: '黑龙江',value: Math.round(Math.random()*1000)},
                  {name: '湖南',value: Math.round(Math.random()*1000)},
                  {name: '安徽',value: Math.round(Math.random()*1000)},
                  {name: '山东',value: Math.round(Math.random()*1000)},
                  {name: '新疆',value: Math.round(Math.random()*1000)},
                  {name: '江苏',value: Math.round(Math.random()*1000)},
                  {name: '浙江',value: Math.round(Math.random()*1000)},
                  {name: '江西',value: Math.round(Math.random()*1000)},
                  {name: '湖北',value: Math.round(Math.random()*1000)},
                  {name: '广西',value: Math.round(Math.random()*1000)},
                  {name: '甘肃',value: Math.round(Math.random()*1000)},
                  {name: '山西',value: Math.round(Math.random()*1000)},
                  {name: '内蒙古',value: Math.round(Math.random()*1000)},
                  {name: '陕西',value: Math.round(Math.random()*1000)},
                  {name: '吉林',value: Math.round(Math.random()*1000)},
                  {name: '福建',value: Math.round(Math.random()*1000)},
                  {name: '贵州',value: Math.round(Math.random()*1000)},
                  {name: '广东',value: Math.round(Math.random()*1000)},
                  {name: '青海',value: Math.round(Math.random()*1000)},
                  {name: '西藏',value: Math.round(Math.random()*1000)},
                  {name: '四川',value: Math.round(Math.random()*1000)},
                  {name: '宁夏',value: Math.round(Math.random()*1000)},
                  {name: '海南',value: Math.round(Math.random()*1000)},
                  {name: '台湾',value: Math.round(Math.random()*1000)},
                  {name: '香港',value: Math.round(Math.random()*1000)},
                  {name: '澳门',value: Math.round(Math.random()*1000)}
              ]
          },
          {
              name: 'iphone4',
              type: 'map',
              mapType: 'china',
              label: {
                  normal: {
                      show: false
                  },
                  emphasis: {
                      show: true
                  }
              },
              data:[
                  {name: '北京',value: Math.round(Math.random()*1000)},
                  {name: '天津',value: Math.round(Math.random()*1000)},
                  {name: '上海',value: Math.round(Math.random()*1000)},
                  {name: '重庆',value: Math.round(Math.random()*1000)},
                  {name: '河北',value: Math.round(Math.random()*1000)},
                  {name: '安徽',value: Math.round(Math.random()*1000)},
                  {name: '新疆',value: Math.round(Math.random()*1000)},
                  {name: '浙江',value: Math.round(Math.random()*1000)},
                  {name: '江西',value: Math.round(Math.random()*1000)},
                  {name: '山西',value: Math.round(Math.random()*1000)},
                  {name: '内蒙古',value: Math.round(Math.random()*1000)},
                  {name: '吉林',value: Math.round(Math.random()*1000)},
                  {name: '福建',value: Math.round(Math.random()*1000)},
                  {name: '广东',value: Math.round(Math.random()*1000)},
                  {name: '西藏',value: Math.round(Math.random()*1000)},
                  {name: '四川',value: Math.round(Math.random()*1000)},
                  {name: '宁夏',value: Math.round(Math.random()*1000)},
                  {name: '香港',value: Math.round(Math.random()*1000)},
                  {name: '澳门',value: Math.round(Math.random()*1000)}
              ]
          },
          {
              name: 'iphone5',
              type: 'map',
              mapType: 'china',
              label: {
                  normal: {
                      show: false
                  },
                  emphasis: {
                      show: true
                  }
              },
              data:[
                  {name: '北京',value: Math.round(Math.random()*1000)},
                  {name: '天津',value: Math.round(Math.random()*1000)},
                  {name: '上海',value: Math.round(Math.random()*1000)},
                  {name: '广东',value: Math.round(Math.random()*1000)},
                  {name: '台湾',value: Math.round(Math.random()*1000)},
                  {name: '香港',value: Math.round(Math.random()*1000)},
                  {name: '澳门',value: Math.round(Math.random()*1000)}
              ]
          }
      ]
  };
    //设置options
    myChart.setOption(option)
  };

  render() {
    return (
      <div className="eChart" style={{ paddingTop: "24px",width:"100%" }}>
        <div
          ref={ref => (this.eChart = ref)}
          style={{ width: "99%", height: 600 }}
        />
      </div>
    );
  }
}

// EChart.propTypes = propTypes;
// EChart.defaultProps = defaultProps;
