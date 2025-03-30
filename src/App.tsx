import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
// import QueryPage from 
// import ErrorPage from './pages/ErrorPage';
// import { LandingPage } from './pages/LandingPage';
import { Suspense } from 'react';


function App() {

  const LazyQueryPage = React.lazy(()=>import("./pages/QueryPage"))

  return (
    <>
    <CssBaseline>
      <Router>
          <Routes>
            {/* <Route path="/" element={<LandingPage />} /> */}
            <Route path="/" element={
              <Suspense fallback={<p>Loading...</p>}>
                <LazyQueryPage />
              </Suspense>
              
              } />
            {/* <Route path="*" element={<ErrorPage />} /> */}
          </Routes>
        </Router>
      </CssBaseline>
    </>
  )
}

export default App
