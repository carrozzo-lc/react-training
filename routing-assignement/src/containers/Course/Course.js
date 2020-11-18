import React, { Component } from 'react';

class Course extends Component {
    render () {

        let courseTitle = null;
        if (this.props.location.state) {
            courseTitle = this.props.location.state.title;
        }

        return (
            <div>
                <h1>{courseTitle}</h1>
                <p>You selected the Course with ID: {this.props.match.params.courseid}</p>
            </div>
        );
    }
}

export default Course;