import React from "react";
import Editor from "wangeditor";
import PropTypes from "prop-types";
// import { FILE_API } from "config";
import emotion from "./emotion.js";
/**
 * 富文本编辑器
 * @date 2017-11-23
 * @author xiaoqian
 */
class WangEditor extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired, //容器id
    placeholder: PropTypes.string, //默认值
    onChange: PropTypes.func.isRequired //取到编辑器实时内容
  };

  static defaultProps = {
    placeholder: ""
  };

  componentDidMount() {
    this.editor = this.initEditor();
  }

  componentWillUnmount() {
    //销毁编辑器
    // this.destroyEditor();
  }

  /**
   * 初始化富文本编辑器
   */
  initEditor = () => {
    //初始化编辑器
    const editor = new Editor("#editor");
    //请求上传图片的接口，放到服务器上
    editor.customConfig.uploadImgServer = `file/upload`;
    //图片名称，后端约定 file
    editor.customConfig.uploadFileName = "file";
    //表情配置
    // editor.customConfig.emotions = {
    //   default: {
    //     title: "微博表情", // 组名称
    //     data: emotion
    //   }
    // };
    //将后台返回的图片地址插入编辑器
    editor.customConfig.uploadImgHooks = (resultText, xhr)=> {
      customInsert:  (insertImg, result, editor)=> {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        var url = result.url
        insertImg(url)

        // result 必须是一个 JSON 格式字符串！！！否则报错
    }

    };
  
    //监听编辑器内容变化，必须放到editor.create()之前
    editor.onchange = () => {
      this.props.onChange(editor.$txt.html());
    };
    //创建编辑器
    editor.create();
    return editor;
  };

  /**
   * 销毁富文本编辑器
   */
  destroyEditor = () => {
    if (!this.editor) return;
    this.editor.destroy();
    //2版本暂时无法销毁，只能隐藏，所以地图需要自己减，否则会报错
    this.editor = null;
    Editor.numberOfLocation--;
  };

  render() {
    const { placeholder } = this.props;
    return (
      <div className="wangeditor">
        <div style={{ height: 250 }} id="editor">
          {placeholder && <p>{this.props.placeholder}</p>}
        </div>
      </div>
    );
  }
}

export default WangEditor;
