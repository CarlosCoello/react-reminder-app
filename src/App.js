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
    this.setState({
      text: '',
      dueDate: ''
    })
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
      <tbody>
        {
          reminders.map( (reminder) => {
            return (
                <tr key={reminder.id} >
                  <td>{reminder.text}</td>
                  <td>{moment(new Date(reminder.dueDate)).fromNow()}</td>
                  <td><button className="btn btn-danger" onClick={() => this.deleteReminder(reminder.id)}>&#9747;</button></td>
                </tr>
            )
          })
        }
      </tbody>
    )
  }

  render() {
    console.log('this.props', this.props);
    return (
      <div className="App">
        <div className="container">
          <header className="jumbotron bg-primary text-success">
            <h2>Reminders APP</h2>
            <p className="lead text-light">type a task you need to do today or in the future</p>
          </header>
          <div className="form-group">
            <input type="text" className="form-control"
            onChange={ event => this.setState({text: event.target.value})} />  
            <input type="datetime-local" className="form-control" onChange={ event => this.setState({dueDate: event.target.value})} />  
          </div>
          <button className="btn btn-success" onClick={() => this.addReminder()}>Add Reminder</button> &nbsp;
          <button className="btn btn-danger" onClick={() => this.clearAllReminders()}>Clear All Reminders</button>
        </div>
        <br />
        <br />
        <div className="container">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Reminder</th>
                <th>Date</th>
                <th>Delete Reminder</th>
              </tr>
            </thead>
              {this.renderReminders()}
          </table>  
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