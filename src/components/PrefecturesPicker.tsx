import { useAtom } from 'jotai'
import React, { JSX } from 'react'
import CheckboxButton from './CheckboxButton.tsx'
import styles from './PrefecturesPicker.module.scss'
import { pickedPrefecturesAtom } from '~/atoms'
import { Prefecture } from '~/types'

type Props = {
  prefectures: Prefecture[]
}
const PrefecturesPicker: React.FC<Props>  = ({prefectures}: Props): JSX.Element => {
  const [picked, setPicked] = useAtom(pickedPrefecturesAtom)

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
                        ? setPicked(new Set([...picked, pref]))
                        : setPicked(new Set([
                          ...Array.from(picked).filter(p => p.prefCode !== prefCode)
                        ]))
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
