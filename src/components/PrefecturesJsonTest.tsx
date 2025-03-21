import { Prefecture, PrefecturesAPIResponse } from '~/types'

type Props = {
  prefectures: PrefecturesAPIResponse
}
const PrefecturesJsonTest = ({prefectures}: Props) => (
  <>
    <div style={{margin: '1em'}}>
      <pre style={{whiteSpace: 'pre-wrap', border: '1px solid', padding: '1em'}}>
        {JSON.stringify(prefectures)}
      </pre>
    </div>
    <hr />
    <div>
      {prefectures.result.map((pref) => {
        return <>
          <div style={{border: '1px solid', margin: '1em', padding: '1em'}}>
            <pre>{JSON.stringify(pref)}</pre>
            <dl>
              {Object.keys(pref).map((key) => (
                <>
                  <dt>{key}</dt>
                  <dd><pre>
                    {key in pref && pref[key as keyof Prefecture]}
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
