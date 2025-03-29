import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import QueryPage from "./pages/QueryPage"
import ErrorPage from './pages/ErrorPage';
import { LandingPage } from './pages/LandingPage';


function App() {

  return (
    <>
    <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/queryPage" element={<QueryPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
