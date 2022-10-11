import { IQuestion } from '@ts/interfaces/types'
import styles from './Questions.module.scss'
import Moment from 'react-moment'

interface Props {
  questions: IQuestion[]
}

const Questions: React.FC<Props> = ({ questions }) => {
  console.log(questions)
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
              <div>
                <span>Question:</span> <span>{question.message}</span>
              </div>
              <p>
                asked on{' '}
                <Moment format="MMMM D, YYYY">{question.createdAt}</Moment>
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Questions
