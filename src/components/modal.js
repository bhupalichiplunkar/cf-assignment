import React from 'react';
import { Modal as AntdModal } from 'antd';
import { goBack, replace } from 'react-router-redux';
import { connect } from 'react-redux';


const Modal = ({children, preventClose, goHome, back, goHomeOnCancel = true, visible = true, ...rest}) => (
  <AntdModal 
    closable={false}
    visible={visible}
    onCancel={preventClose ? null : ( goHomeOnCancel ? goHome : back)}
    footer={null}
    {...rest}
  >
    {children}
  </AntdModal>
)

const mapDispatchToProps = dispatch => ({
  back: () => dispatch(goBack()),
  goHome: () => dispatch(replace('/')),
});

export default connect(null, mapDispatchToProps)(Modal);