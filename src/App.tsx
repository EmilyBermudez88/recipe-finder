import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import './App.css'

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:recipeId" element={<RecipePage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
