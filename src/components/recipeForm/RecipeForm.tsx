import { useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { CUISINELIST } from '../../cuisines';
import './RecipeForm.scss';

type RecipeFormProps = {
	submitChoices: (query: string, cuisine: string) => void;
}

const RecipeForm = ({ submitChoices }: RecipeFormProps) => {
	const [recipeName, setRecipeName] = useState('');
	const [cuisine, setCuisine] = useState('');
	const [formError, setFormError] = useState('');
	const inputClass = classNames('form__input-box', { 'form__input-box--error': formError });

	const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRecipeName(e.target.value);
		if (formError) {
			setFormError('');
		}
	};

	const handleSubmit = (e: React.SubmitEvent) => {
		e.preventDefault();
		if (!recipeName.trim()) {
			setFormError('Must be non-empty')
		} else {
			submitChoices(recipeName, cuisine);
		}
	};

	return (
		<form className="form"onSubmit={handleSubmit}>
			<div className="form__group">
				<label className="form__group-label" htmlFor="recipeName">Recipe Name:</label>
				<div className="form__input-wrapper">
					<div className={inputClass}>
					<input id="recipeName"
								 className="form__input"
							 value={recipeName}
							 type="text"
							 onChange={handleUserInput}
							 aria-required="true"
							 aria-invalid={!!formError}
							 aria-errormessage='validation-message' />
					<FontAwesomeIcon icon={faMagnifyingGlass} className="form__icon" />
				</div>
				{!!formError && <p id="validation-message" className="form__validation-message" role="alert">{formError}</p>}
				</div>
			</div>
			<div className="form__group">
				<label className="form__group-label" htmlFor="cuisine">Cuisine:</label>
				<select id="cuisine" className="form__select"value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
					<option value="">Select a cuisine</option>
					{CUISINELIST.map((type, idx) => (
						<option key={idx} value={type}>
							{type}
						</option>
					))}
				</select>
			</div>
			<button	className="form__button" type="submit">Find Your Recipes!</button>
		</form>
	)
}

export default RecipeForm;