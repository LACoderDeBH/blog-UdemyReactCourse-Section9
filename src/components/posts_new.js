import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className=`form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
        {/* Display any errors from input validation after it has been touched and there is an error. */}
        { touched ?  error : ''}
        </div>
      </div>
    );
  }

  /*
  values object contains title, category, and content
  Inside of onSubmit we really want to be calling an action creator and that action creator will be
  responsible for posting the API or simply me posting the post into the API.
  I think that will first start off by creating our action creator and put our API request inside of it.
  After that we'll then figure out exactly how to hook it up to this on submit function.
  */
  onSubmit(values) {
    //this === component
    //wire up onSubmit to action creator createPost
      this.props.createPost(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />

        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />

        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel </Link>
      </form>
    );
  }
}

//values is an object that contains all values that user entered into form
//console.log(values) -> { title: 'asf', catgeories: 'asdfee', content: 'Hi!'}
function validate(values) {
  const errors = {};

  //Validate inputs from 'values'
  if (!values.title || values.title.length < 3) {
    errors.title = "Enter a title that is at least 3 characters!";
  }
  if (!values.categories) {
    errors.categories = "Enter a category!";
  }
  if (!values.content) {
    errors.content = "Enter some content!";
  }

  //if errors is empty, the form is fine to submit
  //if errors has any properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate, //validate: validate,
  form:'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
