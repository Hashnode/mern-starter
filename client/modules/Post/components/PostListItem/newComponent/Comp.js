import React from 'react';
import styles from './Comp.css';
import { InputName, TextArea, AddComment } from './Components/Inputs';
import CommentLists from './Components/CommentLists';

class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [{}],
      indexNum: 0,
      click: true,
      isOpen: false,
    };

    this.inputName = React.createRef();
    this.textArea = React.createRef();
    this.formRef = React.createRef();
  }

  arr = [];
  inputValues = {
    name: '',
    comment: '',
  }

  changeInput = () => {
    this.inputValues.name = this.inputName.current.value;
    this.inputValues.comment = this.textArea.current.value;
  }

  addComment = () => {
    let { name, comment } = this.inputValues;
    let { arr } = this;

    if (name.length > 0 && comment.length > 0) {
      arr.push({
        name,
        comment,
      });
      this.setState({ arr });
      this.formRef.current.reset();
    }
  }

  editComment = (index) => {
    if (this.state.isOpen) {
      let name = this.inputName.current;
      let comment = this.textArea.current;
      let currentIndex = this.arr[index];

      name.value = currentIndex.name;
      comment.value = currentIndex.comment;

      this.setState({
        click: false,
        indexNum: index,
        isOpen: true,
      });
    }
  };

  saveComment = (index) => {
    let name = this.inputName.current;
        // let title = this.inputTitle.current;
    let comment = this.textArea.current;
    let currentIndex = this.arr[index];

		if (name.value.length > 0 && title.value.length > 0 && comment.value.length > 0) {
			currentIndex.name = name.value;
			currentIndex.comment = comment.value;

			name.value = '';
			comment.value = '';

			this.setState({ click: !this.state.click });
		}
  };

  removeComment = (index) => {
    const arr = this.arr;
    arr.splice(index, 1);
    this.addState();
  };

  addState = () => {
    const { arr } = this;
    this.setState({
      arr,
      click: true,
    });
  };

  componentWillReceiveProps(nextProps) {
    const { isOpen } = this.props;
    if (nextProps.isOpen !== this.props.isOpen) {
      if (isOpen) {
        this.setState({ isOpen: true, click: true });
      } else {
        this.setState({ isOpen: false, click: false });
      }
    }
  }


  render() {
    const { arr, inputName, changeInput, textArea, addComment, removeComment, editComment, saveComment, formRef } = this;
    const { click, indexNum, isOpen } = this.state;
    return (
			<div className={styles['parent']}>
			 {arr.map((elem, index) => (
					<CommentLists
						elem={elem}
						index={index}
						removeComment={removeComment}
						editComment={editComment}
						saveComment={saveComment}
						click={click}
						indexNum={indexNum}
						isOpen={isOpen}
					/>
				))}
					{isOpen && <form id="inputForm" ref={formRef}>
							< InputName
								inputName={inputName}
								changeInput={changeInput}
							/>

							< TextArea
								textArea={textArea}
								changeInput={changeInput}
							/>
							{click && <AddComment addComment={addComment} />}
					</form>}
			</div>
		);
  }
}

export default Comp;
