import React, { JSX, PropsWithChildren, useState } from 'react'

const Toggle: React.FC<PropsWithChildren> = ({children}: React.PropsWithChildren): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
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
