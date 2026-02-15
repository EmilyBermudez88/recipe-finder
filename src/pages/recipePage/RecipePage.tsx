import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { fetchRecipeDetails } from '../../spoonacularService';
import './RecipePage.scss';

type InstructionStep = {
	step: string;
	number: number;
}

type Ingredient = {
	id: number;
	original: string;
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
}

const RecipePage = () => {
	const { recipeId } = useParams<{ recipeId: string }>();
	const [loadError, setLoadError] = useState('');
	const [recipeDetails, setRecipeDetails] = useState<RecipeDetails | null>(null);
	const [loading, setLoading] = useState(false);
	// const [instructions, setInstructions] = useState<string[]>([]);

	useEffect(() => {
		if (!recipeId) return;

		setLoading(true);
		setLoadError('');
		const id = parseInt(recipeId);
		fetchRecipeDetails(id)
			.then((data) => setRecipeDetails(data))
			.catch((err) => setLoadError(err.message || 'Failed to load recipe details.'))
			.finally(() => setLoading(false));
	
		// fetchRecipeInstructions(id)
		// 	.then((data) => {
		// 		if (data.length > 0 && data[0].steps) {
		// 			const steps = data[0].steps.map((step: InstructionStep) => ({description: step.step, order: step.number}));
		// 			setInstructions(steps);
		// 		} else {
		// 			setInstructions(['No instructions available.']);
		// 		}
		// 	})
		// 	.catch((err) => setLoadError(err.message || 'Failed to laod recipe instructions.'));

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
							<div className="recipe__image">
								<img src={recipeDetails.image} alt={recipeDetails.title} />
							</div>
							<div className="recipe__highlights">
								<h1>{recipeDetails.title}</h1>
								<div className="recipe__pill-bar">
									{recipeDetails.vegetarian && <span className="recipe__pill recipe__pill--veggie">Vegetarian</span>}
									{recipeDetails.vegan && <span className="recipe__pill recipe__pill--vegan">Vegan</span>}
									{recipeDetails.dairyFree && <span className="recipe__pill recipe__pill--dairy">Dairy Free</span>}
									{recipeDetails.glutenFree && <span className="recipe__pill recipe__pill--gluten">Gluten Free</span>}
								</div>
								<p>Ready in: {recipeDetails.readyInMinutes} minutes</p>
								<p>Serves: {recipeDetails.servings}</p>
							</div>
						</div>
						<div className="recipe__ingredients">
							<h2>Ingredients</h2>
							{recipeDetails.extendedIngredients.length > 0 && (
								<ul>
									{recipeDetails.extendedIngredients.map((ingredient) => (
										<li key={ingredient.id}>
											<p>{ingredient.original}</p>
										</li>
									))}
								</ul>
							)}
						</div>
						<div className="recipe__instructions">
							<h2>Instructions</h2>
							{recipeDetails.analyzedInstructions.length > 0 && (
								<ol>
									{recipeDetails.analyzedInstructions[0].steps.map((step) => (
										<li key={step.number}>{step.step}</li>
									))}
								</ol>
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