type Prefectures = {
  message: string | null
  result: {
    prefCode: number
    prefName: string
  }[]
}

type Props = {
  prefectures: Prefectures
}
const PrefecturesJsonTest = ({prefectures}: Props) => (
  <>
    <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(prefectures)}</pre>
    <hr />
    <div>
      {prefectures.result.map((pref) => {
        return <>
          <pre>{JSON.stringify(pref)}</pre>
          <div>
            <dl>
              {Object.keys(pref).map((key) => (
                <>
                  <dt>{key}</dt>
                  <dd><pre>
                    {key in pref && pref[key as keyof Prefectures['result'][number]]}
                  </pre></dd>
                </>
              ))}
            </dl>
          </div>
        </>
      })}
    </div>
  </>
)
export default PrefecturesJsonTest
