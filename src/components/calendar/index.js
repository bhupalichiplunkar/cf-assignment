import BigCalendar from 'react-big-calendar';
import React, {Component} from 'react';
import {Button, Modal} from 'antd';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Upload from '../upload';
import './style.css';
import moment from 'moment';

BigCalendar.momentLocalizer(moment);

const DateCell = ({
 value,
 children
}) => {
 const now = new Date();
 now.setHours(0,0,0,0);
 let later = new Date();
 later = new Date(later.setMonth(later.getMonth()+6));
 later.setHours(0,0,0,0);
 return (
  <div className={ (value < now || value > later) ? "unselectable" : "" }>
   { children }
  </div>
 )
}



class AttireCalendar extends Component{
  constructor(props){
    super(props);
    this.state={
      photos : [],
      loading : false,
      showAttireModal : false,
      startValue: null,
      endValue: null,
      endOpen: false,
      confirmLoading : false,
      events : [],
      dayChosen: new Date(),
      fromDateRange : moment().startOf('month').subtract(1, 'month').format('YYYY-MM-DD'),
      toDateRange : moment().startOf('month').add(1, 'year').format('YYYY-MM-DD')
    }
    this.monthEvent = this.monthEvent.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.navigate = this.navigate.bind(this);
    this.saveAttire = this.saveAttire.bind(this);
    this.photoSelected = this.photoSelected.bind(this);
  }

  setEvents = (daywiseData) =>{
    let {fromDateRange, toDateRange, events} = this.state;
    const toDateRangeMoment = moment(toDateRange), fromDateRangeMoment = moment(fromDateRange)
    let daysCount = toDateRangeMoment.diff(fromDateRangeMoment, 'days')
    let currentCounterDate = fromDateRangeMoment;
    events = [];
    while(daysCount > 0){
        currentCounterDate = moment(currentCounterDate).add(1, 'days')
        const dateString = currentCounterDate.format('YYYY-MM-DD');
        let title = 'Add Attire', photos=[],day = currentCounterDate.format('dddd'), status = 'Unattached';
        const eventDate = daywiseData.find(dd=>dd.id === dateString);
        if(eventDate && eventDate.status === 'Attached'){
            title = 'Attire Attached';
            photos = eventDate.photos;
            status = eventDate.status
        }
        events.push({
            id: dateString,
            title,
            start: currentCounterDate,
            end: currentCounterDate,
            photos,
            day,
            date : moment(dateString),
            status
        })
        daysCount --;
    }
    this.setState({events: [...events]});
  }

  componentDidMount(){
    this.setEvents(this.props.daywiseData);
  }

  componentWillReceiveProps(nextProps){
    const { savedPhotos, daywiseData } = this.props;
    if(savedPhotos.length !== nextProps.savedPhotos.length || daywiseData.length !== nextProps.daywiseData.length){
      this.setEvents(nextProps.daywiseData);
    }
  }

  handleUpload = (selectedDateData) => {
    this.setState({ selectedDateData, showAttireModal : true})
  }
  
  monthEvent ({ event }){
    return (
      <div className="available"> 
          <Button
            className="add-attire-btn"
            type="primary"
            onClick={()=>this.handleUpload(event)}
          >
            {event.status === 'Attached' && event.photos.length ? 'View Attire' : 'Add Attire'}
        </Button>
      </div>
    )
  }

  photoUploadCallback = (photos) => this.setState({photos});

  closeModal = () => {
    this.setState({showAttireModal : false, selectedDateData : null, photos:[]});
  }

  renderPhotoSelection(){
    const {savedPhotos} = this.props
    return(
     <div className="photo-selection">
       <div className="upload-section">
        <h4>Upload new photos here( Max 2) : </h4>
        <Upload showPlusIcon={true} onUpdate={this.photoUploadCallback} text="Add Photos" type="Normal" maxPictures={2} />
       </div>
       {savedPhotos.length> 0 && <h4>OR</h4>}
       {savedPhotos.length> 0 && <div className="figure-list">
        <h4>Select from existing photos : </h4>
        <div className="selection-image-list">
        {
          savedPhotos.map((pic,index)=>{
            return(
              <img className={`selection-image ${this.photoSelected(pic) ? 'photo-selected' : ''}`} src={pic.url} alt={index} key={index} onClick={()=>this.onSelect(pic)}/>
            )
          })
        }
        </div>
       </div>}
     </div>
    )
  }

  renderUploadedPhotos(photos){
    return(
      <div className="figure-list">
        {
          photos.map((pic,index)=>{
            return(
              <img src={pic.url} alt={index} key={index}/>
            )
          })
        }
      </div>
    )
  }

  renderModal=() =>{
    const {showAttireModal, selectedDateData} = this.state;
    let footerArr = [
      <Button key="back" onClick={this.closeModal}>Close</Button>
    ]
    if(selectedDateData.status !== 'Attached'){
      footerArr.push(<Button key="submit" type="primary" onClick={this.saveAttire}>
        Save
      </Button>)
    }
    return(
      <Modal
        onCancel={this.closeModal}
        title={`Attire for ${selectedDateData.day}, ${selectedDateData.date.format('MMMM Do YYYY')}`}
        visible={showAttireModal}
        footer={footerArr}
      >
        {
          selectedDateData.status === 'Attached' && selectedDateData.photos.length ? this.renderUploadedPhotos(selectedDateData.photos) : this.renderPhotoSelection()
        }
      </Modal>
    )
  }

  saveAttire = () => {
    let { selectedDateData, photos } = this.state;
    let newDayData = {
      id: selectedDateData.id,
      photos,
      day : selectedDateData.day,
      date : selectedDateData.date,
      status : 'Attached'
    }
    this.props.saveCallback(newDayData, photos);
    this.closeModal();
  }

  onSelect = (pic) => {
    const {photos} = this.state;
    const elementIndex = photos.findIndex(p=>p.id===pic.id && p.url === pic.url);
    if(elementIndex>-1){
      let newPhotos = photos.filter(p=>p.id !== pic.id && p.url !== pic.url);
      this.setState({photos : [...newPhotos]})
    } else {
      if(photos.length < 2) {
        this.setState({photos : [...photos, pic]})
      }
    }
  }

  photoSelected(pic){
    const {photos} = this.state;
    return photos.findIndex(p=>p.id===pic.id && p.url === pic.url) > -1;
  }

  navigate(focusDate, flipUnit, prevOrNext) {
    let {dayChosen} = this.state;
    const now = new Date();
    const nextMonthToday = prevOrNext === "NEXT"  ? moment(dayChosen).add(1, "month").toDate() : moment(dayChosen).subtract(1, "month").toDate();
    const compareDate = prevOrNext === "NEXT" ? moment().add(6, "month").toDate() : moment().subtract(2, "month").toDate() ;
    if (prevOrNext === "NEXT" 
        && nextMonthToday < compareDate){
            this.setState({
            dayChosen: nextMonthToday
            });
    } else if (prevOrNext === "PREV" 
    && nextMonthToday >= compareDate){
        this.setState({
        dayChosen: nextMonthToday
        });
    } else if (prevOrNext === "TODAY" ){
        this.setState({
            dayChosen: now
        });
    }
  }

  render(){
    const { events, showAttireModal, selectedDateData } = this.state;
    let formats = {
      dateFormat: 'Do MMM',
    }
    return (
      <div className="calendar">
        <div className="heading"> Now you can save your daily attire here </div>
        <div className="instuctions"> Click on day to add/view attire. </div>
        <BigCalendar
          selectable
          events = {events}
          formats = {formats}
          views={['month']}
          defaultView="month"
          scrollToTime={new Date(2018, 1, 1, 6)}
          defaultDate={new Date()}
          components={{
          dateCellWrapper: DateCell,
          event: this.monthEvent,
          }}
          date={this.state.dayChosen}
          onNavigate={this.navigate}
        />
        {
          selectedDateData && showAttireModal && this.renderModal()
        }
      </div>
    )
  }
}


export default AttireCalendar;