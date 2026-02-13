export const fetchRecipes = async (keyword : string, cuisine: string) => {
    const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
    try {
        const url = `https://api.spoonacular.com/recipes/complexSearch?query=${keyword}&cuisine=${cuisine}&apiKey=${apiKey}`
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch matching recipes');
        }
        const data = await response.json();
        return data;
    } catch(error: any) {
        console.error(error);
        return [];
    }
} 