import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import { styled } from 'styled-components';

const ContainerCard = styled.div`
  white-space: nowrap;
  width: 319px;
  overflow-x: auto;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 5px;
`;

const RecomendationCard = styled.div`
  display: inline-block;
`;

const StartRecipeButton = styled.button`
  position: fixed;
  bottom: 0px;
  right: 0px;
`;

const GoBackButton = styled.button`
  position: fixed;
  bottom: 0px;
  left: 0px;
`;

export function RecipesDetails() {
  const { id } = useParams<{ id: string }>();
  const [recipeDetails, setRecipeDetails] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const navigate = useNavigate(); // Adicionando o hook useNavigate

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const isMealPage = window.location.pathname.includes('/meals');
      const mealAPI = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const drinkAPI = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

      try {
        const response = await fetch(isMealPage ? mealAPI : drinkAPI);
        const data = await response.json();
        setRecipeDetails(isMealPage ? data.meals[0] : data.drinks[0]);
        // Realizar requisição para recomendações
        const recommendationsAPI = isMealPage
          ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
          : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const recommendationsResponse = await fetch(recommendationsAPI);
        const recommendationsData = await recommendationsResponse.json();
        setRecommendations(isMealPage
          ? recommendationsData.drinks : recommendationsData.meals);
      } catch (error) {
        console.error('Erro ao buscar detalhes da receita:', error);
        navigate(-1);
      }
    };

    fetchRecipeDetails();
  }, [id, navigate]);

  console.log(recommendations);

  if (!recipeDetails) {
    return <p>Loading...</p>;
  }

  const { strMealThumb, strMeal, strCategory, strInstructions,
    strYoutube, strDrinkThumb, strDrink, strAlcoholic } = recipeDetails;

  const ingredientsKeys = Object.keys(recipeDetails)
    .filter((key) => key.startsWith('strIngredient') && recipeDetails[key]);
  const measuresKeys = Object.keys(recipeDetails)
    .filter((key) => key.startsWith('strMeasure') && recipeDetails[key]);
  const ingredients = ingredientsKeys.map((key) => recipeDetails[key]);
  const measures = measuresKeys.map((key) => recipeDetails[key]);

  const getYouTubeVideoId = (url: string) => {
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
    return videoIdMatch ? videoIdMatch[1] : '';
  };

  return (
    <div>
      <img
        src={ strMealThumb || strDrinkThumb }
        width={ 360 }
        alt="Foto Da Refeição"
        data-testid="recipe-photo"
      />
      <h2
        data-testid="recipe-title"
      >
        { strMeal || strDrink }
      </h2>
      { strCategory
        && <span data-testid="recipe-category">{strAlcoholic || strCategory}</span> }
      <ul>
        { ingredients.map((ingredient, index) => (
          <li
            key={ `ingredient-${index}` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { ingredient }
            -
            { measures[index] }
          </li>
        )) }
      </ul>
      <p
        data-testid="instructions"
      >
        { strInstructions }
      </p>
      <div
        data-testid="video"
      >
        { strYoutube && <YouTube
          videoId={ getYouTubeVideoId(strYoutube) }
          opts={ { width: '360', height: '415' } }
        /> }
      </div>
      <h3>Recomendações</h3>
      <ContainerCard>
        { recommendations.slice(0, 6).map((recommendation, index) => (
          <RecomendationCard
            key={ recommendation.idMeal || recommendation.idDrink }
            data-testid={ `${index}-recommendation-card` }
          >
            <img
              src={ recommendation.strMealThumb || recommendation.strDrinkThumb }
              alt={ recommendation.strMeal || recommendation.strDrink }
              width={ 160 }
            />
            <p
              data-testid={ `${index}-recommendation-title` }
            >
              { recommendation.strMeal || recommendation.strDrink }
            </p>
          </RecomendationCard>
        )) }
      </ContainerCard>
      <GoBackButton onClick={ () => navigate(-1) }>voltar</GoBackButton>
      <StartRecipeButton
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </StartRecipeButton>
    </div>
  );
}