import React from 'react';
import styles from './Comp.css'

export class Comp extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			arr : [{}],
			click : false
		}
		this.addComment = this.addComment.bind(this);
	}

	// Initialize main array to push state comments
	arr = [];


	addComment(index){

		let userName = this.refs.userName.value;
		let userTitle = this.refs.title.value;
		let userPost = this.refs.post.value;
		let form = document.getElementById('inputForm');
		let {arr} = this;

		if(userName.length > 0 && userTitle.length > 0 && userPost.length > 0){
			arr.push({
				name : userName,
				title : userTitle,
				post : userPost,
			})
			this.setState({
				arr,
			})
		}

		form.reset();
	}

	removeComment(index){
		const arr = this.arr;
		arr.splice(index,1);
		this.addState();
	}

	addState(){
		const {arr} = this;
		this.setState({
			arr,
		})
	}

	editPost(index){

		let arr = this.arr;
		let name =  this.refs.userName;
		let title =  this.refs.title;
		let post =  this.refs.post;
		let form = document.getElementById('inputForm');


		let currentIndex = this.state.arr[index];
		name.setAttribute('value', currentIndex.name);
		title.setAttribute('value', currentIndex.title);
		post.textContent = currentIndex.post;

		arr[index].name = name.value;
		arr[index].title = title.value;
		arr[index].post = post.value;

		this.addState();
		form.reset();
	}

	render(){
		const {arr} = this;
		const {click} = this.state;

		return(
			<div className={`${styles['parent']}`}>
				<form id = "inputForm">
					<input
						type = "text"
						ref='userName'
						placeholder="Enter your name"
						required
					/>
					<input
						type = "text"
						ref='title'
						placeholder="Enter post title"
						required
					/>
					<textarea
						type = "text"
						ref='post'
						required
					/>
					<input
						type="button"
						value="Add comment"
						onClick = {this.addComment}
						className={`${styles['button']}`}
					/>
				</form>

				{arr.map((elem,index)=>(
					<div
						className={`${styles['list']}`}
						onClick={()=>this.editPost(index)}
					>
						<ul>
							<li>
								<span>Name : </span>{elem.name} <br/>
							</li>
							<li>
								<span>Title :</span> {elem.title} <br/>
							</li>
							<li>
								<span>Comment :</span> {elem.post} <br/>
							</li>
						</ul>
						<button
							className={`${styles['list-button']}`}
							onClick={()=>{this.removeComment(index)}}
						>
							Delete comment
						</button>
					</div>
				))}
			</div>
		)

	}
}

export default Comp;