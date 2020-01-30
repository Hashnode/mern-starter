import * as yup from 'yup';

export const CommentFormValidationSchema = yup.object({
  author: yup.string().required(),
  content: yup.string().required(),
});
