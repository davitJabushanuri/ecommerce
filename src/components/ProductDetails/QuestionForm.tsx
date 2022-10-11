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

  const questionMutation = useQuestion()

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          id="question"
          name="question"
          placeholder="Ask a question"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.question}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default QuestionForm
