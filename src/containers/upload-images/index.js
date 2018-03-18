import React, { Component } from 'react';
import {Button} from 'antd';
import Upload from '../../components/upload';
import { connect } from 'react-redux';
import { SavePhotos } from '../../reducers/main';
import './style.css';

class UploadImage extends Component{
  constructor(props){
    super(props);
    this.state = {
      photos : [],
      noChanges : true
    }
    this.photoUploadCallback = this.photoUploadCallback.bind(this);
  }

  photoUploadCallback = (photos) => this.setState({photos, noChanges : false});

  handleUpload = () => {
    const {photos} = this.state;
    this.props.SavePhotos(photos);
    this.setState({noChanges : true})
  }

  render(){
    const { photos, noChanges } = this.state;
    const {savedPhotos} = this.props;
    return (
      <div className="upload-images">
        <Upload initialValue={savedPhotos} showPlusIcon={true} onUpdate={this.photoUploadCallback} text="Add Photos" type="Normal" maxPictures={100} />
        <Button
            className="upload-demo-start"
            type="primary"
            onClick={this.handleUpload}
            disabled={ noChanges || photos.length === 0} 
          >
            Save
        </Button>
      </div>
    )
  }
}

const mapsStateToProps = ({
  mainReducer: { savedPhotos },
}) => ({
  savedPhotos
});


const mapDispatchToProps = dispatch => ({
  SavePhotos: (photos) => dispatch(SavePhotos(photos))
});

export default connect(mapsStateToProps, mapDispatchToProps)(UploadImage);
