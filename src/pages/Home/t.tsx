import React, { Component } from 'react';
import { Modal } from 'antd';

interface AgreeProps {
  isShowVisible?: boolean;
  handleCancel?: any;
}

interface AgreeState {
  isShowVisible?: boolean;
}

export default class Agreement extends Component<AgreeProps, AgreeState> {
  render(): React.ReactNode {
    return (
      <Modal visible centered={true} title="“香溢贷”平台用户服务协议" footer={null} width={790}>
        <div>wwwwwww</div>
      </Modal>
    );
  }
}
