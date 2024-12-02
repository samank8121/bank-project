'use client';
import Button from '@/components/button/button'
import { FC } from 'react';

type ButtonProps = {
  children: React.ReactNode
}

const WrapperButton: FC<ButtonProps> = ({ children }) => {
  return (
    <Button onClick={() => alert('Button clicked!')}>
      {children}
    </Button>
  )
}

export default WrapperButton