import { IQuestion } from '@ts/interfaces/types'
import styles from './Questions.module.scss'
import Moment from 'react-moment'
import useAnswer from '@components/hooks/useAnswer'

interface Props {
  questions: IQuestion[]
  productId: string
  userId: string
  userName: string
}

const Questions: React.FC<Props> = ({
  questions,
  productId,
  userId,
  userName,
}) => {
  const answerMutation = useAnswer(productId)

  return (
    <div className={styles.container}>
      <h2>Customer questions & answers</h2>

      <div className={styles.searchQuestion}>
        <input type="text" placeholder="Have a question? Search for answers" />
      </div>

      <div className={styles.questions}>
        {questions.map((question) => {
          return (
            <div className={styles.question} key={question.id}>
              <div className={styles.grid}>
                <span className={styles.questionLabel}>Question:</span>
                <div className={styles.questionInfo}>
                  <span
                    onClick={() =>
                      answerMutation.mutate({
                        message: 'this is a test answer',
                        questionId: question.id!,
                        userId: userId,
                        userName: userName,
                      })
                    }
                  >
                    {question.message}
                  </span>
                  <p>
                    asked on{' '}
                    <Moment format="MMMM D, YYYY">{question.createdAt}</Moment>
                  </p>
                </div>
              </div>

              <div className={styles.answers}>
                {question.answers &&
                  question?.answers.map((answer) => {
                    return (
                      <div className={styles.answer} key={answer.id}>
                        <span className={styles.answerLabel}>Answer:</span>
                        <div className={styles.answerInfo}>
                          <span>{answer.message}</span>
                          <p>
                            By {answer.userName} on{' '}
                            <Moment format="MMMM D, YYYY">
                              {answer.createdAt}
                            </Moment>
                          </p>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Questions
