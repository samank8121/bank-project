import { FC } from 'react'
import styles from './button.module.scss'

type ButtonProps = {
  children: React.ReactNode
  onClick: () => void
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button