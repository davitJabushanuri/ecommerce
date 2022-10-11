import { IQuestion } from '@ts/interfaces/types'
import styles from './Questions.module.scss'
import Moment from 'react-moment'
import { useState } from 'react'
import AnswerForm from './AnswerForm'

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
  const [answerModal, setAnswerModal] = useState({
    questionId: '',
    show: false,
  })

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
                      setAnswerModal({
                        questionId: question.id!,
                        show: true,
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

              <div className={styles.grid}>
                {question.answers!.length > 0 && (
                  <span className={styles.answerLabel}>
                    {question.answers?.length == 1 ? `Answer:` : `Answers:`}
                  </span>
                )}
                <div className={styles.answers}>
                  {question.answers &&
                    question?.answers.map((answer) => {
                      return (
                        <div className={styles.answer} key={answer.id}>
                          <div className={styles.answerInfo}>
                            <span>{answer.message}</span>
                            <p>
                              By {answer.userName.split(' ')[0]} on{' '}
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
            </div>
          )
        })}
        {answerModal.show && (
          <AnswerForm
            questionId={answerModal.questionId}
            userId={userId}
            userName={userName}
            setAnswerModal={setAnswerModal}
            productId={productId}
          />
        )}
      </div>
    </div>
  )
}

export default Questions
