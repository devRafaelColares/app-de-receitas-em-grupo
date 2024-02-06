import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import shareIcon from '../images/shareIcon.svg';
import disFavoriteIcon from '../images/blackHeartIcon.svg';
import { FavoriteRecipeType } from '../types';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 97%;
  gap: 10px;
  border: 5px solid #1add04;
  align-content: space-between;
  justify-content: space-around;
`;

const Image = styled.img`
  width: 50%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  width: 318px;
  height: 135px;
  border: 5px solid #ff0000;
  border-radius: 5px;
  font-size: 12px;
`;

function FavRecipes() {
  const [checkedIngredients, setCheckedIngredients] = useState<FavoriteRecipeType[]>([]);
  const [copyTextDrink, setCopyTextDrink] = useState(false);
  const [copyTextMeal, setCopyTextMeal] = useState(false);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const savedProgress = localStorage.getItem('favoriteRecipes');
    if (savedProgress) {
      setCheckedIngredients(JSON.parse(savedProgress));
    }
  }, []);

  const handleShareMeal = (id: any) => {
    const link = `${window.location.origin}/meals/${id}`;
    navigator.clipboard.writeText(link);
    setCopyTextMeal(true);
  };

  const handleShareDrink = (id: any) => {
    const link = `${window.location.origin}/drinks/${id}`;
    navigator.clipboard.writeText(link);
    setCopyTextDrink(true);
  };

  const DeleteFavorite = (index: any) => {
    const updatedFavorites = checkedIngredients.filter(
      (recipe) => recipe.id !== checkedIngredients[index].id,
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
    window.location.reload();
  };

  const handleCardClick = (recipeId: string, recipeType: string) => {
    const route = recipeType === 'meal' ? `/meals/${recipeId}` : `/drinks/${recipeId}`;
    navigate(route);
  };

  return (
    <>
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('all') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => setFilter('meal') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('drink') }
      >
        Drinks
      </button>
      <Container>
        {checkedIngredients.filter((ingredient: any) => {
          if (filter === 'all') return true;
          return ingredient.type === filter;
        }).map((ingredient: any, index: number) => {
          if (ingredient.type === 'meal') {
            return (
              <Card key={ index }>
                <Image
                  src={ ingredient.image }
                  onClick={ () => handleCardClick(ingredient.id, ingredient.type) }
                  data-testid={ `${index}-horizontal-image` }
                />
                <button
                  onClick={ () => handleCardClick(ingredient.id, ingredient.type) }
                  data-testid={ `${index}-horizontal-name` }
                >
                  { ingredient.name }
                </button>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { `${ingredient.nationality} - ${ingredient.category}` }
                </p>
                <button type="button" onClick={ () => handleShareMeal(ingredient.id) }>
                  <img
                    alt={ ingredient.name }
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                  />
                </button>
                {copyTextMeal && <span>Link copied!</span>}
                <button type="button" onClick={ () => DeleteFavorite(index) }>
                  <img
                    alt={ ingredient.name }
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ disFavoriteIcon }
                  />
                </button>
              </Card>
            );
          } if (ingredient.type === 'drink') {
            return (
              <Card key={ index }>
                <Image
                  src={ ingredient.image }
                  onClick={ () => handleCardClick(ingredient.id, ingredient.type) }
                  data-testid={ `${index}-horizontal-image` }
                />
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { ingredient.alcoholicOrNot }
                </p>
                <button
                  onClick={ () => handleCardClick(ingredient.id, ingredient.type) }
                  data-testid={ `${index}-horizontal-name` }
                >
                  { ingredient.name }
                </button>
                <button type="button" onClick={ () => handleShareDrink(ingredient.id) }>
                  <img
                    alt={ ingredient.name }
                    src={ shareIcon }
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                { copyTextDrink && <span>Link copied!</span> }
                <button type="button" onClick={ () => DeleteFavorite(index) }>
                  <img
                    alt={ ingredient.name }
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ disFavoriteIcon }
                  />
                </button>
              </Card>
            );
          }
          return null;
        })}
      </Container>
    </>
  );
}

export default FavRecipes;
