import { useState, useContext, useRef } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";
import { RecipeContext } from '../../contexts/recipeContext';
import { CUISINE_LIST, MAX_TIME_LIST } from '../../utils/dropdownOptions';
import './RecipeForm.scss';

type RecipeFormProps = {
	submitChoices: (query: string, cuisine: string, time: number) => void;
}

const RecipeForm = ({ submitChoices }: RecipeFormProps) => {
	const { searchParams } = useContext(RecipeContext)!;
	const [recipeName, setRecipeName] = useState(searchParams.keyword);
	const [cuisine, setCuisine] = useState(searchParams.cuisine);
	const [time, setTime] = useState(MAX_TIME_LIST.find((option) => option.value === searchParams.time)?.value || 0);
	const [formError, setFormError] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);
	const inputClass = classNames('form__input-box', { 'form__input-box--error': formError });

	const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRecipeName(e.target.value);
		if (formError) {
			setFormError('');
		}
	};

	const setFocusToInput = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}

	const handleSubmit = (e: React.SubmitEvent) => {
		e.preventDefault();
		if (!recipeName.trim()) {
			setFormError('Must be non-empty')
		} else {
			submitChoices(recipeName, cuisine, time);
		}
	};

	return (
		<form className="form"onSubmit={handleSubmit}>
			<div className="form__group">
				<label className="form__group-label" htmlFor="recipeName">Recipe Name:</label>
				<div className="form__input-wrapper">
					<div className={inputClass} onClick={setFocusToInput}>
						<FontAwesomeIcon icon={faMagnifyingGlass} className="form__icon--search" />
						<input id="recipeName"
									ref={inputRef}
									className="form__input"
									value={recipeName}
									type="text"
									onChange={handleUserInput}
									aria-required="true"
									aria-invalid={!!formError}
									aria-errormessage='validation-message' />
						{recipeName && (
							<button type="button" className="form__reset-button" onClick={() => setRecipeName('')} aria-label="clear input">
								<FontAwesomeIcon icon={faX} className="form__icon--reset" />
							</button>
						)}
					</div>
					{!!formError && <p id="validation-message" className="form__validation-message" role="alert">{formError}</p>}
				</div>
			</div>
			<div className="form__group">
				<label className="form__group-label" htmlFor="cuisine">Cuisine:</label>
				<select id="cuisine" className="form__select"value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
					<option value="">Select a cuisine</option>
					{CUISINE_LIST.map((type, idx) => (
						<option key={idx} value={type}>
							{type}
						</option>
					))}
				</select>
			</div>
			<div className="form__group">
				<label className="form__group-label" htmlFor="times">Max Time:</label>
				<select id="times" className="form__select" value={time} onChange={(e) => setTime(parseInt(e.target.value))}>
					<option value="">How Much Time Do You Have?</option>
					{MAX_TIME_LIST.map((time, idx) => (
						<option key={idx} value={time.value}>
							{time.label}
						</option>
					))}
				</select>
			</div>
			<button	className="form__button" type="submit">FIND RECIPE</button>
		</form>
	)
}

export default RecipeForm;