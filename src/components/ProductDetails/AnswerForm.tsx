import useAnswer from '@components/hooks/useAnswer'
import styles from './AnswerForm.module.scss'
import { useFormik } from 'formik'
import useAuth from '@components/hooks/useAuth'
import { answerValidation } from '@components/Schemas/questionValidation'

interface IAnswerForm {
  questionId: string
  userId: string
  userName: string
  setAnswerModal: any
  productId: string
  question: string
}

const AnswerForm = ({
  questionId,
  userId,
  userName,
  setAnswerModal,
  productId,
  question,
}: IAnswerForm) => {
  const session = useAuth()

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: answerValidation,

    onSubmit: (values) => {
      if (session)
        answerMutation.mutate({
          message: values.message,
          questionId: questionId,
          userId: userId,
          userName: userName,
        })
    },
  })

  const answerMutation = useAnswer(productId, setAnswerModal)

  return (
    <div
      onClick={() =>
        setAnswerModal({
          questionId: '',
          question: '',
          show: false,
        })
      }
      className={styles.container}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <p>{question}</p>
        <form onSubmit={formik.handleSubmit}>
          <textarea
            id="message"
            name="message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            placeholder="Type your answer here..."
          />
          <span style={{ color: 'red', fontSize: '14px' }}>
            {formik.errors.message && formik.touched.message
              ? formik.errors.message
              : null}
          </span>
          <button disabled={answerMutation.isLoading} type="submit">
            Answer
          </button>
        </form>
      </div>
    </div>
  )
}

export default AnswerForm
