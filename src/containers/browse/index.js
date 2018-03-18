import React, { Component } from 'react';
import Calendar from '../../components/calendar';
import { connect } from 'react-redux';
import { SavePhotos, SaveDayInfo } from '../../reducers/main';

class BrowseCalendar extends Component{

  saveDayInfo = (dayInfo, photos) => {
    this.props.SaveDayInfo(dayInfo, photos);
  }

  render(){
    const {savedPhotos, daywiseData} = this.props;
    return (
      <div className="upload-images">
       <Calendar savedPhotos={savedPhotos} daywiseData={daywiseData} saveCallback={this.saveDayInfo}/>
      </div>
    )
  }
}

const mapsStateToProps = ({
  mainReducer: { savedPhotos, daywiseData },
}) => ({
  savedPhotos,
  daywiseData
});


const mapDispatchToProps = dispatch => ({
  SavePhotos: (photos) => dispatch(SavePhotos(photos)),
  SaveDayInfo: (dayInfo, photos) => dispatch(SaveDayInfo(dayInfo, photos))
});

export default connect(mapsStateToProps, mapDispatchToProps)(BrowseCalendar);
