export type MealType = {
  idMeal: string;
  idDrink: string;
  strMeal: string;
  strDrink: string;
  strMealThumb: string;
  strDrinkThumb: string;
  dateModified: string;
  strArea: string;
  strCategory: string;
  strCreativeCommonsConfirmed: string;
  strDrinkAlternate: string;
  strImageSource: string;
  strInstructions: string;
  strImageAttribution: string;
  strSource: string;
  strTags: string;
  strYoutube: string;
  strAlcoholic: string;
  strGlass: string;
  strIBA: string;
  strVideo: string;
  strInstructionsDE: string;
  strInstructionsES: string;
  strInstructionsFR: string;
  strInstructionsIT: string;
  strInstructionsZH_HANS: string;
  strInstructionsZH_HANT: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
};

export type DrinkType = {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: string | null;
  strTags: string | null;
  strVideo: string | null;
  strCategory: string;
  strIBA: string | null;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strInstructionsES: string | null;
  strInstructionsDE: string | null;
  strInstructionsFR: string | null;
  strInstructionsIT: string | null;
  strInstructionsZH_HANS: string | null;
  strInstructionsZH_HANT: string | null;
  strDrinkThumb: string;
  strIngredient1: string;

  strImageSource: string | null;
  strImageAttribution: string | null;
  strCreativeCommonsConfirmed: string;
  dateModified: string;
};

export type MealOrDrinkType = MealType | DrinkType;

export type RecipeDetails = {
  strMealThumb?: string;
  strMeal?: string;
  strDrinkThumb?: string;
  strDrink?: string;
  strCategory?: string;
  strAlcoholic?: string;
  strInstructions?: string;
  strIngredients?: string[];
};

export type FavoriteRecipeType = {
  id: string;
  type: string;
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
};

export type Recipe = {
  image: string;
  name: string;
  category: string;
  doneDate: string;
  tags: string[];
};
