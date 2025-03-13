import React ,{ReactNode} from 'react'
import store from '../redux/store.js';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
const persistor = persistStore(store);
const AuthProvider = ({children}:{children:ReactNode}) => {
  return (
   <Provider store = {store}>
<PersistGate loading={null} persistor={persistor}>
{children}
</PersistGate>
   </Provider>
  )
}

export default AuthProvider
