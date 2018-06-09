import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'

import { Tasks } from '../api/tasks.js'

export default class Task extends Component {

    toggleChecked = () => {
        Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked)
    }

    deleteThisTask = () => {
        Meteor.call('tasks.remove', this.props.task._id)
    }

    render() {

        const { task } = this.props
        const taskClassName = task.checked ? 'checked' : ''

        const {username, checked } = task

        return (
            <li className={taskClassName}>
                <button className="delete" onClick={this.deleteThisTask}>
                    &times;
                </button>

                <input
                    type="checkbox"
                    readOnly
                    checked={!!this.props.task.checked}
                    onClick={this.toggleChecked}
                />

                <span className="text">
                    <strong>{username && `${username}: `}</strong>{this.props.task.text}
                </span>
            </li>
        )
    }
}