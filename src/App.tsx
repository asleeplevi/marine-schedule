import { useEffect, useState } from 'react'

const App: React.FC = () => {
  const [count, setCount] = useState(0)

  function context() {
    console.log('[window]', window.api.get.organization())
  }

  useEffect(() => {
    context()
  }, [])

  return (
    <div>
      <p>hello world</p>
    </div>
  )
}

export default App
