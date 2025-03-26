import React, { JSX, PropsWithChildren, useState } from 'react'

type Props = {
  open?: boolean
}
const Toggle: React.FC<PropsWithChildren<Props>> = ({
  children,
  open = false,
}: PropsWithChildren<Props>): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(open)
  const handleOnClick = () => setIsOpen(!isOpen)

  return (
    <>
      <div>
        <span onClick={handleOnClick}>
          {isOpen ? '▼ クリックすると閉じます' : '▶︎ クリックすると表示します'}
        </span>
      </div>
      {isOpen && children}
    </>
  )
}
export default Toggle
