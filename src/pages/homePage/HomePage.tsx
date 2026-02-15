import { useState, useContext } from 'react'
import { RecipeContext } from '../../contexts/recipeContext';
import RecipeForm from '../../components/recipeForm/RecipeForm';
import RecipeList from '../../components/recipeList/RecipeList';
import { fetchRecipes } from '../../spoonacularService';
import './HomePage.scss';

const RESULTS_PER_PAGE = 5;

const HomePage = () => {
  const { searchParams, setSearchParams, recipes, setRecipes, currentPage: page, setCurrentPage, totalResults, setTotalResults } = useContext(RecipeContext)!;

	const [loading, setLoading] = useState(false);
	const [loadError, setLoadError] = useState('');
	const [submitted, setSubmitted] = useState(false);
	const renderResults = recipes.length > 0 && !loading;
	const renderNoResults = recipes.length === 0 && submitted && !loading && !loadError;

  const loadRecipes = (keyword: string, cuisine: string, page: number) => {
		if (!keyword) return;
	
		setLoading(true);
		setSubmitted(false);
		setLoadError('');

		const offset = (page - 1) * RESULTS_PER_PAGE;
		fetchRecipes(keyword, cuisine, offset)
			.then((data) => {
				setRecipes(data.results);
				setTotalResults(data.totalResults || 0);
				setSubmitted(true);
			})
			.catch((err) => {
				setRecipes([]);
				setLoadError(err.message ?? 'Failed to load matching recipes.')
			})
			.finally(() => setLoading(false));
  }

	const updateChoices = (keyword: string, cuisine: string) => {
		setSearchParams({ keyword, cuisine });
		setCurrentPage(1);
    loadRecipes(keyword, cuisine, 1)
	}

	const updatePage = (action: string) => {
    const newPage = action === 'increment' ? page + 1 : Math.max(1, page - 1);
		setCurrentPage(newPage);
    loadRecipes(searchParams.keyword, searchParams.cuisine, newPage);
	};

	return (
		<main className="main--home">
      <div className="home__search">
        <h1>Find Your Recipes!</h1>
				<RecipeForm submitChoices={updateChoices} />
      </div>
      <div className="home__content">
				{loading && <p>Loading recipes...</p>}
        {renderResults ? (
          <>
            <h2>Recipe List</h2>
            <RecipeList recipes={recipes} page={page} updatePage={updatePage} totalResults={totalResults}/>
          </>
        ) : renderNoResults ? (
          <p>No recipes found. Check your spelling or try a different search.</p>
        ) : !loading && (
				<p>Select the recipe you want to find</p>
			)}
        {!!loadError && <p className="error">{loadError}</p>}
      </div>
		</main>
	)
}

export default HomePage;