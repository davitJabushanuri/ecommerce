import style from './Search.module.scss'
import { FiSearch } from 'react-icons/fi'

const Search = () => {
  return (
    <div className={style.container}>
      <input type="text" placeholder="Search products" name="search" />
      <button>
        <FiSearch />
      </button>
    </div>
  )
}

export default Search
