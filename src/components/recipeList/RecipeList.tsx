import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import './RecipeList.scss';

type Recipe = {
	id: number;
	title: string;
	image: string;
	imageType: string;
}

type RecipeListProps = {
	recipes: Recipe[];
	page: number;
	updatePage: (action: string) => void;
	totalResults: number;
}

const RESULTS_PER_PAGE = 5;

const RecipeList = ({ recipes, page, updatePage, totalResults }: RecipeListProps) => {
	const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);
	return (
		<>
			<ul className="recipes-container">
				{recipes.map((recipe) => (
					<li key={recipe.id} className="recipes-card">
            <div className="recipes-card-image">
              <img src={recipe.image} alt={recipe.title} />
            </div>
            <div>
              <h3>{recipe.title}</h3>
              <NavLink to={`recipe/${recipe.id}`}>View Recipe</NavLink>
            </div>
					</li>
				))}
			</ul>
			<div className="button-bar">
				<button disabled={page === 1} onClick={() => updatePage('decrement')} aria-label="view previous results">
					<FontAwesomeIcon icon={faCaretLeft} />
				</button>
				<button disabled={page >= totalPages} onClick={() => updatePage('increment')} aria-label="view next results">
					<FontAwesomeIcon icon={faCaretRight} />
				</button>
			</div>
		</>
	)
}

export default RecipeList;