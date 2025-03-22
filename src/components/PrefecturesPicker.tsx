import React, { Fragment, JSX, PropsWithChildren, useRef, useState } from 'react'
import styles from './PrefecturesPicker.module.scss'
import { Prefecture } from '~/types'

type CheckboxButtonProps =
  Pick<HTMLInputElement, 'name' | 'value'>
const CheckboxButton: React.FC<PropsWithChildren<CheckboxButtonProps>> = ({
  children, name, value,
}): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [checked, setChecked] = useState<HTMLInputElement['checked']>(
    inputRef.current?.checked ?? false
  )

  const handleToggleChecked = () => {
    setChecked((prev) => !prev)
  }

  const inputProps = { name, value }
  return (
    <>
      <button className={styles.pickerItem} onClick={handleToggleChecked}>
        <label onClick={(e) => e.stopPropagation()}>
          <input
            type='checkbox'
            {...inputProps}
            defaultChecked={checked}
            onChange={handleToggleChecked}
            ref={inputRef}
          />
          {children}
        </label>
      </button>
    </>
  )
}

type Props = {
  prefectures: Prefecture[]
}
const PrefecturesPicker: React.FC<Props>  = ({prefectures}: Props): JSX.Element => {

  return (
    <>
      <div className={styles.container}>
        <fieldset>
          <legend>都道府県</legend>
          {prefectures.map((pref) => (
            <Fragment key={`${pref.prefCode}-${pref.prefName}`}>
              <CheckboxButton
                name='prefectures'
                value={String(pref.prefCode)}
              >
                <span>{pref.prefName}</span>
              </CheckboxButton>
            </Fragment>
          )
          )}
        </fieldset>
      </div>
    </>
  )
}
export default PrefecturesPicker
