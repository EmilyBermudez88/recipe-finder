import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import Toggle from '../../components/toggle/Toggle';
import { fetchRecipeDetails } from '../../utils/spoonacularService';
import './RecipePage.scss';

type InstructionStep = {
	step: string;
	number: number;
}

type IngredientMeasurement = {
	metric: { amount: number, unitShort: string };
	us: { amount: number, unitShort: string }
}

type Ingredient = {
	id: number;
	original: string;
	measures: IngredientMeasurement;
	nameClean: string;
}

type RecipeDetails = {
	id: number;
	title: string;
	image: string;
	imageType: string;
	extendedIngredients: Ingredient[];
	readyInMinutes: number;
	servings: number;
	vegetarian: boolean;
	vegan: boolean;
	glutenFree: boolean;
	dairyFree: boolean;
	analyzedInstructions: { name: string; steps: InstructionStep[] }[];
	creditsText: string;
}

const RecipePage = () => {
	const { recipeId } = useParams<{ recipeId: string }>();
	const [loadError, setLoadError] = useState('');
	const [recipeDetails, setRecipeDetails] = useState<RecipeDetails | null>(null);
	const [isMetric, setIsMetric] = useState(false);
	const [loading, setLoading] = useState(false);

	const measurement = isMetric ? 'metric' : 'us';

	useEffect(() => {
		if (!recipeId) return;

		setLoading(true);
		setLoadError('');
		const id = parseInt(recipeId);
		fetchRecipeDetails(id)
			.then((data) => setRecipeDetails(data))
			.catch((err) => setLoadError(err.message || 'Failed to load recipe details.'))
			.finally(() => setLoading(false));
	}, [recipeId]);
	console.log(recipeDetails);

	return (
		<div className="recipe-page">
			<header className="recipe-page__header">
				<nav>
					<NavLink to="/">
						<FontAwesomeIcon icon={faCaretLeft} />
						Back to Recipe Lists
					</NavLink>
				</nav>
			</header>
			<main className="recipe-page__main">
				{recipeDetails && !loading ? (
					<>
						<div className="recipe__header">
							<h1 className="recipe__title">{recipeDetails.title}</h1>
							<div className="recipe__image">
								<img src={recipeDetails.image} alt={recipeDetails.title} />
							</div>
							<div className="recipe__highlights">
								<div className="recipe__pill-bar">
									{recipeDetails.vegetarian && <span className="recipe__pill recipe__pill--veggie">Vegetarian</span>}
									{recipeDetails.vegan && <span className="recipe__pill recipe__pill--vegan">Vegan</span>}
									{recipeDetails.dairyFree && <span className="recipe__pill recipe__pill--dairy">Dairy Free</span>}
									{recipeDetails.glutenFree && <span className="recipe__pill recipe__pill--gluten">Gluten Free</span>}
								</div>
								<div className="recipe__highlights-container">
									<p className="recipe__highlights-text"><b>Ready In:</b> {recipeDetails.readyInMinutes} minutes</p>
									<p className="recipe__highlights-text"><b>Serves:</b> {recipeDetails.servings}</p>
									<p className="recipe__highlights-text"><b>By:</b> {recipeDetails.creditsText}</p>
								</div>
							</div>
						</div>
						<div className="recipe__ingredients">
							<div className="recipe__ingredients-header">
								<h2>Ingredients</h2>
								<Toggle isMetric={isMetric} setIsMetric={setIsMetric} />
							</div>
							{recipeDetails.extendedIngredients.length > 0 && (
								<ul className="recipe__list">
									{recipeDetails.extendedIngredients.map((ingredient) => (
										<li key={ingredient.id}>
											<p className="recipe__ingredient-item">
												<span className="recipe__ingredient-item--amount">
													{ingredient.measures[measurement].amount} {ingredient.measures[measurement].unitShort}
												</span>
												{ingredient.nameClean}
											</p>
										</li>
									))}
								</ul>
							)}
						</div>
						<div className="recipe__instructions">
							<h2>Instructions</h2>
							{recipeDetails.analyzedInstructions.length > 0 ? (
								<ol className="recipe__list">
									{recipeDetails.analyzedInstructions[0].steps.map((step) => (
										<li key={step.number} className="recipe__instructions-step">{step.step}</li>
									))}
								</ol>
							): (
								<p>No Instructions Provided</p>
							)}
						</div>
					</>
				) : loading && (
					<p>Loading recipe details...</p>
				)}
				{!!loadError && <p className="error">{loadError}</p>}
			</main>
		</div>
	)
};

export default RecipePage;