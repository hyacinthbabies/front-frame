//共同部分样式
const getOption = (xAxisType, yAxis, series, formatter, rotate) => {
    return {
      title: {
        left: 24,
        textStyle: {
          fontSize: 16,
          fontWeight: "normal"
        }
      },
      legend: {
        orient: "vertical",
        itemWidth: 15,
        itemHeight: 15,
        right: 0,
        top: "20%"
      },
      grid: {
        right: "20%", //图表距离容器的距离
        bottom: 40
      },
      tooltip: {
        show: true,
        trigger: "axis",
        formatter: formatter
      },
      //xAxis和yAxis必须有一个是传对象不能全部为数组，必须指定type
      xAxis: {
        triggerEvent: true,
        data: [],
        axisLabel: {
          textStyle: {
            color: "#a7a9ac" //坐标轴字体的颜色
          },
          interval: 0,
          rotate: rotate ? rotate : 0
        },
        axisLine: {
          lineStyle: {
            color: "#a7a9ac" //坐标轴的颜色
          }
        },
        splitLine: {
          interval: 0 //
        },
        axisTick: {
          lineStyle: {
            width: 0 //坐标轴刻度宽度
          }
        },
        type: xAxisType
      },
      yAxis: yAxis,
      series: series
    };
  };
  //有环比的样式
  const getMoM = (yName1, yName2) =>
    getOption(
      "category",
      [
        {
          axisLabel: {
            textStyle: {
              color: "#a7a9ac"
            },
            formatter: value => {
              return value === 0 ? 0 : Math.round(value * 100) + "%";
            }
          },
          axisLine: {
            lineStyle: {
              color: "#a7a9ac"
            }
          },
          axisTick: {
            show: false //是否显示坐标轴刻度
          },
          splitLine: {
            show: false
          },
          position: "right",
          type: "value",
          name: yName2
        },
        {
          axisLabel: {
            textStyle: {
              color: "#a7a9ac"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#a7a9ac"
            }
          },
          axisTick: {
            show: false //是否显示坐标轴刻度
          },
          position: "left",
          type: "value",
          name: yName1
        }
      ],
      [
        {
          barMaxWidth: "30px",
          type: "bar",
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: "#50e3c2"
            }
          }
        },
        {
          barMaxWidth: "30px",
          smooth: true,
          type: "line",
          lineStyle: {
            normal: {
              color: "#4ac5a9"
            }
          },
          itemStyle: {
            normal: {
              color: "#4ac5a9",
              borderColor: "#4ac5a9"
            }
          }
        }
      ],
      params => {
        return `${params[0].seriesName}:${parseFloat(
          params[0].value
        ).toLocaleString()}<br/>
          ${params[1].seriesName}:${params[1].value === 0
          ? 0
          : Math.round(params[1].value * 100) + "%"}`;
      }
    );
  //关于总数的样式
  const getAllAmount = () =>
    getOption(
      "value",
      {
        show: false,
        type: "category"
      },
      {
        barMaxWidth: "30px",
        type: "bar",
        itemStyle: {
          normal: {
            barBorderRadius: [0, 20, 20, 0],
            color: "#fce05b"
          }
        }
      },
      params => {
        return `${params[0].seriesName}:${parseFloat(
          params[0].value
        ).toLocaleString()}`;
      },
      -20
    );
  
  //关于测量图的样式
  const getGauge = () =>
    getOption(
      "value",
      null,
      {
        barMaxWidth: "30px",
        type: "gauge",
        detail: { formatter: "{value}%" }
      },
      params => {
        return `${params[0].seriesName}:${parseFloat(
          params[0].value
        ).toLocaleString()}`;
      }
    );
  export { getMoM, getAllAmount, getGauge };
  