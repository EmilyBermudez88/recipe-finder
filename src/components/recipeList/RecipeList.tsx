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
		<section>
			<h2>Recipe List</h2>
			<ul className="recipes__container">
				{recipes.map((recipe) => (
					<li key={recipe.id}>
						<article className="recipes__card">
							<div className="recipes__image">
								<img src={recipe.image} alt="" aria-hidden="true" />
							</div>
							<div>
								<h3>{recipe.title}</h3>
								<NavLink to={`recipe/${recipe.id}`} className="recipes__link">
									View <span className="sr-only">{recipe.title}</span>Recipe
								</NavLink>
							</div>
						</article>
					</li>
				))}
			</ul>
			<nav aria-label="recipe pagination" className="pagination">
				<button className="pagination__button" disabled={page === 1} onClick={() => updatePage('decrement')} aria-label={`view previous results (currently on page ${page}`}>
					<FontAwesomeIcon icon={faCaretLeft} />
				</button>
				<span className="pagination__count">{page} of {totalPages}</span>
				<button className="pagination__button" disabled={page >= totalPages} onClick={() => updatePage('increment')} aria-label={`view next results (currently on ${page} of ${totalPages})`}>
					<FontAwesomeIcon icon={faCaretRight} />
				</button>
			</nav>
		</section>
	)
}

export default RecipeList;