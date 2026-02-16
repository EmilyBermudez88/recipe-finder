import { createContext, useState, ReactNode } from 'react';

type Recipe = {
	id: number;
	title: string;
	image: string;
	imageType: string;
}

type SearchParams = {
    keyword: string;
    cuisine: string;
    time: number;
}

type RecipeContextType = {
    searchParams: SearchParams;
    setSearchParams: (params: SearchParams) => void;
    recipes: Recipe[];
    setRecipes: (recipes: Recipe[]) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalResults: number;
    setTotalResults: (total: number) => void;
}

export const RecipeContext = createContext<RecipeContextType | null>(null);

const RecipeProvider = ({ children }: { children: ReactNode }) => {
    const [searchParams, setSearchParams] = useState<SearchParams>({ keyword: '', cuisine: '', time: 0 });
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const contextValue = {
        searchParams,
        setSearchParams,
        recipes,
        setRecipes,
        currentPage,
        setCurrentPage,
        totalResults,
        setTotalResults
    };

    return (
        <RecipeContext.Provider value={contextValue}>
            {children}
        </RecipeContext.Provider>
    );
}

export default RecipeProvider;