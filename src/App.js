import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from './actions';
import { bindActionCreators } from 'redux';
import moment from 'moment';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      dueDate: ''
    }
  }

  addReminder(){
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id){
    this.props.deleteReminder(id);
  }

  clearAllReminders(){
    this.props.clearReminders();
  }

  renderReminders(){
    const { reminders } = this.props;
    return (
      <ul className="list-group">
        {
          reminders.map( (reminder) => {
            return (
              <li key={reminder.id} className="list-group-item">
                  <span>{reminder.text} | &nbsp;</span>
                  <span><strong>due date:</strong> { moment(new Date(reminder.dueDate)).fromNow()} &nbsp;</span>
                  <button className="btn btn-danger" onClick={() => this.deleteReminder(reminder.id)}>&#9747;</button>
              </li>
            )
          })
        }
      </ul>
    )
  }

  render() {
    console.log('this.props', this.props);
    return (
      <div className="App">
        <div className="container">
          <header className="jumbotron">
            <h2>Reminders APP</h2>
          </header>
          <div className="form-group">
            <input type="text" className="form-control"
            onChange={ event => this.setState({text: event.target.value})} />  
            <input type="datetime-local" className="form-control" onChange={ event => this.setState({dueDate: event.target.value})} />  
          </div>
          <button className="btn btn-primary" onClick={() => this.addReminder()}>Add Reminder</button> &nbsp;
          <button className="btn btn-danger" onClick={() => this.clearAllReminders()}>Clear All Reminders</button>
        </div>
        <br />
        <br />
        <div className="container">
          {this.renderReminders()}  
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    reminders: state
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addReminder, deleteReminder, clearReminders}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
