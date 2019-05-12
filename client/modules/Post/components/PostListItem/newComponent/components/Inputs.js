import React from 'react';
import styles from './Inputs.css';

export const InputName = (props) => {
  return (
     <div className={styles['input-parent']}>
       <input
         className={styles['input-div']}
         ref={props.inputName}
         onChange={props.changeInput}
         type="text"
         placeholder="Enter your name"
       />
     </div>
   );
};

 // export const InputTitle = (props) =>{
 //    return(
 //      <div className={styles["input-parent"]}>
 //        <input
 //         className={styles["input-div"]}
 //         ref={props.inputTitle}
 //         onChange={props.changeInput}
 //         type = "text"
 //         placeholder="Enter title"
 //        />
 //      </div>
 //    )
 //  }

export const TextArea = (props) => {
  return (
      <div>
        <textarea
          ref={props.textArea}
          onChange={props.changeInput}
          className={styles['textarea-div']}
          type="text"
          placeholder="Write comment"
          rows="5"
          cols="72"
        />
      </div>
    );
};

export const AddComment = (props) => {
  return (
      <div >
       <input
         type="button"
         value="Submit"
         onClick={(props.addComment)}
         className={styles['button-div']}
       />
      </div>
    );
};

