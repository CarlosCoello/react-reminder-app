export const ADD_REMINDER = 'ADD_REMINDER';
export const DELETE_REMINDER = 'DELETE_REMINDER';
export const CLEAR_REMINDERS = 'CLEAR_REMINDERS';

export const addReminder = (text, dueDate) => {
    const action = {
        type: ADD_REMINDER,
        text,
        dueDate
    }
    console.log('action in addReminder', action);
    return action;
}

export const deleteReminder = (id) => {
    const action = {
        type: DELETE_REMINDER,
        id
    }
    console.log('deleting in actions', action);
    return action;
}

export const clearReminders = () => {
    const action = {
        type: CLEAR_REMINDERS
    }
    return action;
}