import React from 'react'
import App from './App';
import { InfoProvider } from "./Context/UserContext";

function ContextProviders() {
  return (
    <InfoProvider>
        <App/>
    </InfoProvider>
  )
}

export default ContextProviders