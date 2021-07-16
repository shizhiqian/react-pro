/**
 * 子组件有任何报错都会传递到此，用于页面异步加载出错时显示
 * 此组件只能用class的方式，因为hooks不支持getDerivedStateFromError 和 componentDidCatch
 */
import React, { PureComponent } from 'react';

interface IProps {
  location?: Location;
  children?: JSX.Element;
}
interface IState {
  error: any;
  errorInfo: any;
}
export default class ErrorBoundary extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { error, errorInfo } = this.state;
    if (error && errorInfo) {
      return (
        <>
          {/*@ts-ignore*/}
          <details open="open" style={{ whiteSpace: 'pre-wrap' }}>
            <summary>错误信息</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </>
      );
    }
    return this.props.children;
  }
}
