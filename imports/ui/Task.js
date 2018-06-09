import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import classnames from 'classnames'

import { Tasks } from '../api/tasks.js'

export default class Task extends Component {

    toggleChecked = () => {
        Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked)
    }

    deleteThisTask = () => {
        Meteor.call('tasks.remove', this.props.task._id)
    }

    togglePrivate = () => {
        Meteor.call('tasks.setPrivate', this.props.task._id, !this.props.task.private)
    }

    render() {

        const { task } = this.props
        const {username, checked  } = task
        // const taskClassName = task.checked ? 'checked' : ''
        const taskClassName = classnames({
            checked: checked,
            private: task.private,
        })

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

                {this.props.showPrivateButton ? (
                    <button
                        className="toggle-private"
                        onClick={this.togglePrivate}
                    >
                        {task.private ? 'Private' : 'Public'}
                    </button>
                ):(null)}

                <span className="text">
                    <strong>{username && `${username}: `}</strong>{this.props.task.text}
                </span>
            </li>
        )
    }
}