import { useState, useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { RecipeContext } from '../../contexts/recipeContext';
import RecipeForm from '../../components/recipeForm/RecipeForm';
import RecipeList from '../../components/recipeList/RecipeList';
import { fetchRecipes } from '../../utils/spoonacularService';
import './HomePage.scss';

const RESULTS_PER_PAGE = 5;

const HomePage = () => {
  const { searchParams, setSearchParams, recipes, setRecipes, currentPage: page, setCurrentPage, totalResults, setTotalResults } = useContext(RecipeContext)!;

	const [loading, setLoading] = useState(false);
	const [loadError, setLoadError] = useState('');
	const [submitted, setSubmitted] = useState(false);
	const renderResults = recipes.length > 0 && !loading;
	const renderNoResults = recipes.length === 0 && submitted && !loading && !loadError;
	const renderSearchPrompt = recipes.length === 0 && !submitted && !loading;

  const loadRecipes = (keyword: string, cuisine: string, time: number, page: number) => {
		if (!keyword) return;
	
		setLoading(true);
		setSubmitted(false);
		setLoadError('');

		const offset = (page - 1) * RESULTS_PER_PAGE;
		let adjustedTime = time === 0 ? 720 : time;
		fetchRecipes(keyword, cuisine, adjustedTime, offset)
			.then((data) => {
				setRecipes(data.results);
				setTotalResults(data.totalResults || 0);
				setSubmitted(true);
			})
			.catch((err) => {
				setRecipes([]);
				setSubmitted(true);
				setLoadError(err.message ?? 'Failed to load matching recipes.')
			})
			.finally(() => setLoading(false));
  }

	const updateChoices = (keyword: string, cuisine: string, time: number) => {
		setSearchParams({ keyword, cuisine , time});
		setCurrentPage(1);
    loadRecipes(keyword, cuisine, time, 1)
	}

	const updatePage = (action: string) => {
    const newPage = action === 'increment' ? page + 1 : Math.max(1, page - 1);
		setCurrentPage(newPage);
    loadRecipes(searchParams.keyword, searchParams.cuisine, searchParams.time, newPage);
	};
	console.log(loadError, submitted)

	return (
		<main className="home__main">
      <div className="home__search">
        <h1 className="home__title">Find Your Recipes!</h1>
				<RecipeForm submitChoices={updateChoices} />
      </div>
      <div className="home__content">
				<div role="status" aria-live="polite">
					{loading && <p className="loading-results">Loading recipes...</p>}
					{renderResults && (
						<RecipeList recipes={recipes} page={page} updatePage={updatePage} totalResults={totalResults}/>
					)} 
					{renderNoResults && (
						<p className="no-results">No recipes found. Check your spelling or try a different search.</p>
					)}
					{renderSearchPrompt && (
						<p className="no-results">Select the recipe you want to find</p>
					)}
				</div>
        {!!loadError && (
					<p className="error" role="alert">
						<FontAwesomeIcon className="error__icon" icon={faCircleExclamation}/>
						{loadError}
					</p>
					)}
      </div>
		</main>
	)
}

export default HomePage;