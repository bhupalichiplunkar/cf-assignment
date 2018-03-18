import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../../components/header';
import UploadImages from '../upload-images';
import BrowseCalendar from '../browse';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route path="/" exact component={BrowseCalendar} />
        <Route path="/upload-images" component={UploadImages} />
      </div>
    );
  }
}

export default App;
