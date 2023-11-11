import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={
      <div className='h-screen w-screen flex justify-center items-center'>
    <div class="spinnerMain">
  <div></div>   
  <div></div>    
  <div></div>    
  <div></div>    
</div>
      </div>
}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
)
