import { HashRouter, Routes, Route } from 'react-router-dom';
import RecipeProvider from './contexts/recipeContext';
import HomePage from './pages/homePage/HomePage';
import RecipePage from './pages/recipePage/RecipePage';
import ScrollPage from './utils/scrollPage';
import './styles/base.scss'

function App() {

  return (
    <RecipeProvider>
      <HashRouter>
        <ScrollPage />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:recipeId" element={<RecipePage />} />
        </Routes>
      </HashRouter>
    </RecipeProvider>
  )
}

export default App