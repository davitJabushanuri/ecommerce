import ProgressBar from '@ramonak/react-progress-bar'
import styles from './Progress.module.scss'

const Progress = ({ star = 0, value = 0 }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.star}>
        <p>
          <span className={styles.value}>{star}</span>
          <span>star</span>
        </p>
      </div>
      <div className={styles.bar}>
        <ProgressBar
          completed={value || 0}
          maxCompleted={100}
          bgColor={`#FFCC48`}
          baseBgColor={`#F5F8FF`}
          height="1rem"
          width="100%"
          borderRadius="20px"
          labelColor="#71718A"
          labelAlignment="outside"
          className={styles.wrapper}
          completedClassName={styles.barCompleted}
          labelClassName={styles.label}
        />
      </div>
    </div>
  )
}

export default Progress
