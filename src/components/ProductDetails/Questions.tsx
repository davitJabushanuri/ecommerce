import styles from './Questions.module.scss'

const Questions = () => {
  return (
    <div className={styles.container}>
      <h2>Customer questions & answers</h2>

      <div className={styles.searchQuestion}>
        <input type="text" placeholder="Have a question? Search for answers" />
      </div>

      <div className={styles.questions}>
        <div className={styles.question}></div>
      </div>
    </div>
  )
}

export default Questions
