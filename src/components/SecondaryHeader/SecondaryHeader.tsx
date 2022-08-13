import styles from './SecondaryHeader.module.scss'
import { MdArrowBackIos } from 'react-icons/md'
import { HiDotsHorizontal } from 'react-icons/hi'
import Link from 'next/link'

interface Props {
  header: string
}

const SecondaryHeader = ({ header }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <Link href="/">
          <a>
            <MdArrowBackIos />
          </a>
        </Link>
      </div>
      <h1 className={styles.header}>{header}</h1>
      <div className={styles.more}>
        <HiDotsHorizontal />
      </div>
    </div>
  )
}

export default SecondaryHeader
