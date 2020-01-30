import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Formik } from 'formik';

// Import styles
import styles from './CommentForm.css';

// Import constants
import { CommentFormValidationSchema } from '../../constants';

const CommentForm = (props, { intl }) => (
  <form onSubmit={props.handleSubmit} className={styles.form}>
    <div className={styles['input-container']}>
      <label htmlFor="author" className={styles.label}>
        <FormattedMessage id="commentForm.author.label" />
      </label>
      <input
        className={styles.input}
        type="text"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.author}
        name="author"
        placeholder={intl.formatMessage({ id: 'commentForm.author.placeholder' })}
      />
      {props.errors.author && <div className={styles.error}>{props.errors.author}</div>}
    </div>
    <div className={styles['input-container']}>
      <label htmlFor="content" className={styles.label}>
        <FormattedMessage id="commentForm.content.label" />
      </label>
      <textarea
        className={styles.input}
        name="content"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.content}
        placeholder={intl.formatMessage({ id: 'commentForm.content.placeholder' })}
      />
      {props.errors.content && <div className={styles.error}>{props.errors.content}</div>}
    </div>
    {props.errors.form && <div className={styles.error}>{props.errors.form}</div>}
    <button
      type="submit"
      className={`btn ${styles.submit}`}
      disabled={props.isSubmitting || !props.isValid}
    >
      <FormattedMessage id="submit" />
    </button>
  </form>
);

const WrappedCommentForm = ({ inline, initialValues, onSubmit, onClose }) => {
  return (
    <div className={`${styles['form-wrapper']} ${inline ? styles.inline : ''}`}>
      <span className={styles['close-btn']} onClick={onClose} />
      <Formik
        initialValues={initialValues}
        validationSchema={CommentFormValidationSchema}
        onSubmit={(comment, actions) => {
          return new Promise((resolve, reject) => onSubmit({ comment, resolve, reject }))
            .then(() => {
              actions.setSubmitting(false);
            })
            .catch(error => {
              actions.setErrors({ form: error });
              actions.setSubmitting(false);
            });
        }}

        component={injectIntl(CommentForm)}
      />
    </div>
  );
};

CommentForm.contextTypes = {
  intl: PropTypes.object,
};

CommentForm.propTypes = {
  dirty: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  isValidating: PropTypes.bool.isRequired,
  resetForm: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  setFieldError: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  submitCount: PropTypes.number.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  setSubmitting: PropTypes.func.isRequired,
  setTouched: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  status: PropTypes.any,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  validateForm: PropTypes.func.isRequired,
  validateField: PropTypes.func.isRequired,
};

WrappedCommentForm.propTypes = {
  inline: PropTypes.bool,
  initialValues: PropTypes.shape({
    author: PropTypes.string,
    content: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default WrappedCommentForm;
