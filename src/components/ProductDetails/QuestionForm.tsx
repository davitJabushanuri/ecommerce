import styles from './QuestionForm.module.scss'
import { useFormik } from 'formik'
import useQuestion from '@components/hooks/useQuestion'

interface IQuestionForm {
  productId: string
  userId: string
  userName: string
}

const QuestionForm = ({ productId, userId, userName }: IQuestionForm) => {
  const formik = useFormik({
    initialValues: {
      question: '',
    },
    onSubmit: (values) => {
      questionMutation.mutate({
        message: values.question,
        userName: userName,
        userId: userId,
        productId: productId,
      })
      formik.resetForm()
    },
  })

  const questionMutation = useQuestion(productId)

  return (
    <div className={styles.container}>
      <h2>Don&rsquo;t see the answer you&rsquo;re looking for?</h2>
      <form onSubmit={formik.handleSubmit}>
        <h3>Post your question</h3>
        <input
          type="text"
          id="question"
          name="question"
          placeholder="Please enter a question"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.question}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export default QuestionForm
