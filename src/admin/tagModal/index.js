import React from "react";
import { Modal, Input, Tag, Tooltip } from "antd";
import "./style.less";
import PropTypes from "prop-types";
/**
 * 添加标签弹出框
 */
const propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
};

const defaultProps = {
  visible: true
};

class AddTagModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      inputVisible: false,
      inputValue: "",
      width: 10,
      placeholderStyle: { display: "block" }
    };
  }

  componentDidMount() {
    if (this.input) this.input.focus();
  }

  /**
     * 关闭标签
     */
  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    if (tags.length === 0) {
      this.setState({ placeholderStyle: { display: "block" } });
    }
    this.setState({ tags });
  };

  /**
     * 输入框输入变化监听函数
     */
  handleInputChange = e => {
    let length = 10;
    if (e.target.value !== "") {
      this.setState({ placeholderStyle: { display: "none" } });
      //将输入的值放在span标签中，计算span的宽度，作为input输入框的宽度
      this.spanRef.innerHTML = e.target.value + "`&nbsp;`";
      length = this.spanRef.clientWidth;
    } else if (e.target.value === "" && this.state.tags.length === 0) {
      this.setState({ placeholderStyle: { display: "block" } });
    }
    this.setState({ inputValue: e.target.value.trim(), width: length });
  };

  /**
     * 输入框失去焦点时监听函数，失去焦点输入文字变为标签
     */
  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    if (inputValue.trim() === "") return;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue.trim()];
    }
    this.setState({
      tags,
      inputValue: "",
      width: 10
    });
  };

  /**
     * 监听点击输入框所在div标签范围，让输入框获取焦点
     */
  onInputFocus = () => {
    this.input.focus();
  };

  /**
     * 提交按钮
     */
  onOk = () => {
    this.props.onSubmit(this.state.tags);
  };

  /**
   * 监听键盘事件
   */
  onKeydown = e => {
    if (!e) {
      e = window.event;
    }
    //如果是空格键，则形成标签
    if (e.keyCode === 32) {
      this.handleInputConfirm();
    } else if (e.keyCode === 8 && this.state.inputValue === "") {
      if (this.state.tags.length <= 1) {
        this.setState({
          placeholderStyle: { display: "block" }
        });
      }
      //监听后退键
      this.state.tags.pop();
      this.setState({
        tags: this.state.tags
      });
    }
  };

  render() {
    const { tags, inputValue, width, placeholderStyle } = this.state;
    const { title, visible, onCancel } = this.props;
    return (
      <Modal
        title={`新建${title}`}
        width={501}
        visible={visible}
        onCancel={onCancel}
        onOk={this.onOk}
        className="add-crop-modal"
      >
        <div className="add-crop-content">
          <div className="text-input" onClick={this.onInputFocus}>
            <div
              unselectable="unselectable"
              className="text-input__placeholder"
              style={placeholderStyle}
            >
              {`请输入${title}`}
            </div>
            <div>
              {tags.map(tag => {
                const isLongTag = tag.length > 20;
                const tagElem = (
                  <Tag
                    style={{ marginBottom: 5 }}
                    key={tag}
                    closable={true}
                    afterClose={() => this.handleClose(tag)}
                  >
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </Tag>
                );
                return isLongTag ? (
                  <Tooltip title={tag}>{tagElem}</Tooltip>
                ) : (
                  tagElem
                );
              })}
              <Input
                ref={input => (this.input = input)}
                style={{ width: width }}
                type="text"
                size="small"
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.onOk}
                onKeyDown={this.onKeydown}
              />
              <span
                className="input-mirror"
                ref={spanRef => {
                  this.spanRef = spanRef;
                }}
              />
            </div>
          </div>
          <span className="tip">输入完成一个{title}，点击【空格键】可继续添加，如：react ,css</span>
        </div>
      </Modal>
    );
  }
}
AddTagModal.propTypes = propTypes;
AddTagModal.defaultProps = defaultProps;
export default AddTagModal;
