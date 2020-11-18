import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Course from '../Course/Course';

import './Courses.css';

class Courses extends Component {
    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 6, title: 'PWA - The Complete Guide' }
        ]
    }

    courseSelectedHandler = (id, title) => {
        //this.props.history.push({ pathname: '/courses/' + id });
        this.props.history.push( '/courses/' + id, {title: title} );    
    }       

    render () {
        console.log(this.props)
        return (
            <div>
                <h1>Amazing Udemy Courses</h1>
                
                <section className="Courses">
                    {
                        this.state.courses.map( course => {
                            return (
                                // <Link to={'/courses/' + course.id} key={course.id}>
                                    <article 
                                        className="Course" 
                                        key={course.id}
                                        onClick={() => this.courseSelectedHandler(course.id, course.title)}>
                                        {course.title}
                                    </article>
                                // </Link>                          
                            );
                        })
                    }
                </section>

                <Route path={this.props.match.url + '/:courseid'} exact component={Course} />       

            </div>
        );
        
    }
}

export default Courses;