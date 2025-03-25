import React, { JSX, useContext } from 'react'
import CheckboxButton from './CheckboxButton.tsx'
import styles from './PrefecturesPicker.module.scss'
import PickedPrefecturesContext from '~/context/PickedPrefecturesContext.tsx'
import { Prefecture } from '~/types'

type Props = {
  prefectures: Prefecture[]
}
const PrefecturesPicker: React.FC<Props>  = ({prefectures}: Props): JSX.Element => {
  const pickedContext = useContext(PickedPrefecturesContext)
  if (!pickedContext) {
    throw new Error(
      'PickedPrefecturesContext must be used within a PickedPrefecturesContext.Provider'
    )
  }

  return (
    <>
      <div className={styles.container}>
        <fieldset>
          <legend>都道府県</legend>

          <div className={styles.flex}>
            {prefectures.map((pref) => {
              const { prefCode, prefName } = pref

              return (
                <CheckboxButton
                  key={`${prefCode}-${prefName}`}
                  name='prefectures'
                  value={String(prefCode)}
                  className={styles.checkboxButton}
                  onToggle={
                    (current) =>
                      current
                        ? pickedContext?.dispatch({ type: 'add', target: pref })
                        : pickedContext?.dispatch({ type: 'delete', target: pref })
                  }
                >
                  <span>{prefName}</span>
                </CheckboxButton>
              )
            })}
          </div>
        </fieldset>
      </div>
    </>
  )
}
export default PrefecturesPicker
