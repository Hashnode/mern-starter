import React from 'react';
import styles from './Comp.css';

class Comp extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			arr: [{}],
			click: true,
			textareaValue: '',
			indexNum: 0,
		};
		this.addComment = this.addComment.bind(this);
		this.editPost = this.editPost.bind(this);
		this.addState = this.addState.bind(this);
		this.removeComment = this.removeComment.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	arr = [];

	addComment() {
		let userName = this.refs.name.value;
		let userTitle = this.refs.title.value;
		let userPost = this.refs.post.value;
		let form = document.getElementById('inputForm');
		let { arr } = this;

		if (userName.length > 0 && userTitle.length > 0 && userPost.length > 0) {
			arr.push({
				name : userName,
				title : userTitle,
				post : userPost,
			});
			this.setState({
				arr,
			});
			form.reset();
		}
	}

	handleChange(event) {
		this.setState({ textareaValue: event.target.value });
	}

	removeComment(index) {
		const arr = this.arr;
		arr.splice(index, 1);
		this.addState();
	}

	addState() {
		const { arr } = this;
		this.setState({
			arr,
			click : true,
		});
	}

	editPost(index) {
		this.setState({
			click : false,
			indexNum : index,
		});

		const arr = this.arr;
		const name = this.refs.name;
		const title = this.refs.title;
		const post = this.refs.post;
		const currentIndex = arr[index];

		name.value = currentIndex.name;
		title.value = currentIndex.title;
		post.value = this.state.textareaValue;
	}

	savePost(index) {
		let arr = this.arr;
		let name = this.refs.name;
		let title = this.refs.title;
		let post = this.refs.post;
		let currentIndex = arr[index];

		if (name.value.length > 0 && title.value.length > 0 && this.state.textareaValue.length > 0) {
			currentIndex.name = name.value;
			currentIndex.title = title.value;
			currentIndex.post = this.state.textareaValue;

			name.value = '';
			title.value = '';
			post.value = '';

			this.setState({ click: true });
		}
	}
	render() {
		const { arr } = this;
		const { click, indexNum } = this.state;
		return (
			<div className={`${styles['parent']}`}>
				<form id="inputForm">
					<input
						type="text"
						ref="name"
						placeholder="Enter your name"
					/>
					<input
						type="text"
						ref="title"
						placeholder="Enter post title"
					/>
					<textarea
						type="text"
						ref="post"
						placeholder="Enter post"
						value={this.setState.value}
						onChange={this.handleChange}
					/>
					{click && <input
						type="button"
						value="Add comment"
						onClick={(this.addComment)}
						className={`${styles['button']}`}
					/>}
				</form>

				{arr.map((elem, index) => (
					<div
						className={`${styles['list']}`}
					>
						<ul>
							<li>
								<span>Name : </span>{elem.name} <br />
							</li>
							<li>
								<span>Title :</span> {elem.title} <br />
							</li>
							<li>
								<span>Comment :</span> {elem.post} <br />
							</li>
						</ul>
						<button
							className={`${styles['list-button']}`}
							onClick={() => { this.removeComment(index); }}
						>
							Delete comment
						</button >
						{click && <button
							className={`${styles['list-button']}`}
							onClick={() => this.editPost(index)}
						>
							Edit comment
						</button>}
						{!click && index === indexNum && <button
							onClick={() => this.savePost(index)}
							className={`${styles['list-button']}`}
						>
							Save
						</button>}
					</div>
				))}
			</div>
		)

	}
}

export default Comp;
