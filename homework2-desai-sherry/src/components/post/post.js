import React from 'react';
import './post.css';
import { Avatar } from '../avatar';
import { Comment } from './comment.js';

export class Post extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      comments: props.comments,
      likes: props.likes,
      filled: false
    }
    this.handleCommentSubmission = this.handleCommentSubmission.bind(this)
    this.handleToggleLike = this.handleToggleLike.bind(this)
  }

handleCommentSubmission(event) {
  // prevent page from refreshing
  event.preventDefault();

  // Create a comment object from the text
  const text = event.target[0].value;
  const comment = { owner: 'alaboudi', text: text };

  // Erase the text from the input box
  event.target[0].value = '';
  console.log(event);

  // include the new comment in the comment array
  const comments = this.state.comments
  comments.push(comment);

  // update the state of the component with the new comment
  this.setState({
    comments: comments
  });
}

handleToggleLike(event) {
  event.preventDefault()
  
  const { filled } = this.state

  if(filled) 
    this.setState(state => ({
      likes: state.likes - 1,
      filled: !state.filled
    }))
  else 
    this.setState(state => ({
      likes: state.likes + 1,
      filled: !state.filled
    }))
}

  render(){
    const { filled, likes, comments } = this.state
    return (
      <div className="post">
       <div className="post__header">
         <div className="post__avatar">
           <Avatar avatarUrl={this.props.owner.avatarUrl} />
         </div>
         <div className="post__header-info">
           <div><b>{this.props.owner.name}</b></div>
           <div>{this.props.location}</div>
         </div>
       </div>
       <img className="post__img" src={this.props.imageUrl} alt='post'/>
       <div className="post__body">
         <div className="post__likebtn">
          <button onClick={this.handleToggleLike} className={filled ? "thumbs-down" : "thumbs-up"}>
           {filled ? <i className="thumbs">&#x1f44e;</i> : <i className="thumbs">&#x1f44d;</i>} 
           {filled ? "Unlike" : "Like"}
          </button>
         </div>        
         <div className="post__likes"><b>{likes} likes</b></div>
         { comments.map((comment, i) => <Comment key={i} owner={comment.owner} text={comment.text} />) }
         <hr className="post__body-separator" />
         <form
           onSubmit={this.handleCommentSubmission}
           className="post__comment-form">
           <input placeholder="Add a comment..." className="post__comment-input"/>
         </form>
       </div>
     </div>
    );
  }
}
