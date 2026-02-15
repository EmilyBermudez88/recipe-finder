const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

export const fetchRecipes = async (keyword : string, cuisine: string, offset: number) => {
    try {
        const url = `https://api.spoonacular.com/recipes/complexSearch?query=${keyword}&cuisine=${cuisine}&offset=${offset}&number=5&apiKey=${apiKey}`
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch matching recipes');
        }
        const data = await response.json();
        return data;
    } catch(error: any) {
        throw error;
    }
};

export const fetchRecipeDetails = async (id: number) => {
    try {
        const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch recipe details');
        }
        const data = await response.json();
        return data;
    } catch(error: any) {
        throw error;
    }
};
