
import { Provider } from 'react-redux'
import appStore from "./Redux/appStore"
import Body from './Components/Body'

function App() {
  

  return (
    <Provider store={appStore}>
      <Body/>
    </Provider>
  )
}

export default App
