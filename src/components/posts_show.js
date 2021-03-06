import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    //will call action creator to delete post
    const { id } = this.props.match.params;

    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
}
  render() {
  const { post } = this.props;

  if (!post) {
    return <div>Loading...</div>
  }

    return (
      <div>
        <Link to="/" className="btn btn-primary" > Back To Index </Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title} </h3>
        <h6>Categories: {post.categories} </h6>
        <p> {post.content}</p>
      </div>
    );
  }
}

//ownProps is the props object that is headed to the PostsShow components
function mapStateToProps({ posts }, ownProps) {
  return {post: posts[ownProps.match.params.id] };
}

/* Wire up fetchPost action creator with PostsShow component*/
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
