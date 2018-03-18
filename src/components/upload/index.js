// example usage 
//-----Avatar----------
//<Upload showPlusIcon={true} text="Add Photo" type="Normal"/>
//<Upload text="Add Photo" type="Normal"/>
//<Upload />


//-----Drapgdrop-------
//<Upload type="DragDrop"/>

//-----PictureWall-----
//<Upload showPlusIcon={true} text="Add Photo" type="Normal" maxPictures={5}/>


//---------To over-ride any properties of antd Upload pass it as Props to this component-----
///eg : <Upload showPlusIcon={true} text="Add Photo" type="PictureWall" maxPictures={5} action=""/>


//<Upload showPlusIcon={true} width="150px" height="100px" onUpdate={callbackFunction} text="Upload" type="Normal"/>
//<Upload showPlusIcon={true} onUpdate={callbackFunction} text="Add Photos" type="Normal" maxPictures={5} />
//<Upload type="DragDrop" text="Upload" subText="Click or drag file to this area to upload" onUpdate={callbackFunction} />

import React, { Component } from 'react';
import { Upload as UploadMedia, Icon, message, Modal } from 'antd';
import PropTypes from 'prop-types';
import './style.css'

const Dragger = UploadMedia.Dragger;

export default class Upload extends Component {
  constructor(props){
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: props.initialValue ? [...props.initialValue] : [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  //called before loading file ( perform checks if any here)
  beforeUpload(file) {
    const isLt10M = file.size / 1024 / 1024 <= 10;
    if (!isLt10M) {
      message.error('Max size 10mb!');
    }
    return isLt10M;
  }

  //handler for cancel in case preview modal is open
  handleCancel = () => this.setState({ previewVisible: false })  

  mutateList (fileList){
    return fileList ? fileList.map((file)=>{
      return {
        uid : file.response && file.response.id,
        id : file.response && file.response.id,
        url : file.response && file.response.url,
        status: file.status,
      }
    }) : [];
  }

  //handler for everytime image is uploaded
  handleChange = ({file, fileList}) => {
    const nonErrorList = fileList.filter(f => f.status !== "error");
    
    if (file.status === "error") {
      message.error('Image upload failed. Please compress the file and upload');
    }

    if(file.size / 1024 / 1024 <= 10){
      this.setState({fileList: [...nonErrorList]})
      this.props.onUpdate(this.mutateList(nonErrorList), file.status);
    }
  }

  //handler to open preview modal
  handlePreview = (file) => {
  this.setState({
    previewImage: file.url || file.thumbUrl,
    previewVisible: true,
  });
  }

  render() {

  //state variables
  const { 
    previewVisible, 
    previewImage, 
    fileList } = this.state;

  //prop variables
  const { 
    maxPictures, 
    type, 
    showPlusIcon, 
    text, 
    subText,
    ...rest } = this.props;

  //uploadbutton jsx
  const uploadButton = (
    <div className="button-text">
      {showPlusIcon && <Icon type="plus" className="avatar-uploader-trigger"/>}
      {<div className="ant-upload-text">{text}</div>}
    </div>
  );

  //preview modal jsx
  const previewModal = (
    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
      <img alt="previewImage" style={{ width: '100%' }} src={previewImage} />
    </Modal>
  )


  return (
    <div className="upload-button clearfix">
      { type !== "DragDrop" && 
        <div className="normal-upload">
          <UploadMedia
            className="avatar-uploader"
            fileList = {fileList}
            beforeUpload={this.beforeUpload}
            onPreview = {this.handlePreview}
            onChange={this.handleChange}
            listType="picture-card"
            action="//production.4kbfcxf63m.eu-west-1.elasticbeanstalk.com/api/media/upload"
            accept = "image/*"
            {...rest}
            multiple={maxPictures>1}
          >   
            {
              fileList && fileList.length < maxPictures && uploadButton
            }
          </UploadMedia>
          {
            previewModal
          }
        </div>
      }
      { type==="DragDrop" && 
        <div className="upload-button">
          <Dragger 
            beforeUpload={this.beforeUpload}
            onPreview = {this.handlePreview}
            onChange={this.handleChange} 
            listType="picture-card"
            action="//production.4kbfcxf63m.eu-west-1.elasticbeanstalk.com/api/media/upload"
            accept = "image/*"
            {...rest }>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">{text}</p>
          <p className="ant-upload-hint">{subText}</p>
          </Dragger>
        </div>
      }
    </div>
  );
  }
}

Upload.propTypes = {
  type: PropTypes.oneOf(["Normal","DragDrop", "PictureWall"]),
  maxPictures : PropTypes.number,
  showPlusIcon: PropTypes.bool,
  text : PropTypes.string,
  onUpdate : PropTypes.func.isRequired
};

Upload.defaultProps = {
  type : "Normal",
  maxPictures : 1,
  showPlusIcon: false,
  text: "Add Photo"
}
