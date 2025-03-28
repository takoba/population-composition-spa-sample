import React, { JSX, PropsWithChildren, useEffect, useRef, useState } from 'react'
import styles from './CheckboxButton.module.scss'
import { useEffectEvent } from '~/hooks'

type Props =
  Pick<HTMLInputElement, 'name' | 'value'>
  & Pick<React.HTMLAttributes<HTMLDivElement>, 'className'>
  & {
    onToggle?: (current: boolean) => void
  }
const CheckboxButton: React.FC<PropsWithChildren<Props>> = ({
  children, name, value, className, onToggle
}): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [checked, setChecked] = useState<HTMLInputElement['checked']>(
    inputRef.current?.checked ?? false
  )

  const onChangeChecked = useEffectEvent((checked: HTMLInputElement['checked']) => {
    if (onToggle !== undefined) {
      onToggle(checked)
    }
  })
  useEffect(() => {
    onChangeChecked(checked)
  }, [checked, onChangeChecked])

  const handleToggleChecked = () => {
    setChecked((prev) => !prev)
  }

  const inputProps = { name, value }
  return (
    <div className={className}>
      <button className={styles.button} onClick={handleToggleChecked}>
        <div className={styles.buttonInnerWrapper}>
          <label onClick={(e) => e.stopPropagation()}>
            <input
              type='checkbox'
              {...inputProps}
              checked={checked}
              onChange={handleToggleChecked}
              ref={inputRef}
              readOnly
            />
            {children}
          </label>
        </div>
      </button>
    </div>
  )
}
export default CheckboxButton
