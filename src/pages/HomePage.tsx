import { useState, useEffect } from 'react'
import RecipeForm from '../components/recipeForm/RecipeForm';
import RecipeList from '../components/recipeList/RecipeList';
import { fetchRecipes } from '../spoonacularService'

const RESULTS_PER_PAGE = 5;

const HomePage = () => {
	const [searchParams, setSearchParams] = useState({ keyword: '', cuisine: '' });
	const [recipes, setRecipes] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalResults, setTotalResults] = useState(0);
	const [loading, setLoading] = useState(false);
	const [loadError, setLoadError] = useState('');

	useEffect(() => {
		if (!searchParams.keyword) return;
	
		setLoading(true);
		setLoadError('');

		const offset = (currentPage - 1) * RESULTS_PER_PAGE;
		fetchRecipes(searchParams.keyword, searchParams.cuisine, offset)
			.then((data) => {
				setRecipes(data.results);
				setTotalResults(data.totalResults || 0);
			})
			.catch((err) => {
				setRecipes([]);
				setLoadError(err.message ?? 'Failed to load matching recipes.')
			})
			.finally(() => setLoading(false));
		
	}, [searchParams, currentPage])

	const updateChoices = (keyword: string, cuisine: string) => {
		setSearchParams({ keyword, cuisine });
		setCurrentPage(1);
	}

	const updatePage = (action: string) => {
		action === 'increment' ? setCurrentPage(currentPage + 1) : setCurrentPage(Math.max(1, currentPage - 1));
	};

	return (
		<>
			<h1>Find Your Recipes!</h1>
			<RecipeForm submitChoices={updateChoices} />
			{!!recipes.length && !loading && (
				<>
					<h2>Recipe List</h2>
					<RecipeList recipes={recipes} page={currentPage} updatePage={updatePage} totalResults={totalResults}/>
				</>
			)}
			{!!loadError && <p className="error">{loadError}</p>}
		</>
	)
}

export default HomePage;