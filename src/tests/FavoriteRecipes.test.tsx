import { screen, waitFor } from '@testing-library/dom';
import renderWithRouter from './helpers/renderWith';
import App from '../App';

const FAVORITE_RECIPES = '/favorite-recipes';
const TAMIYA_PATH = '/meals/53026';
const TAMIYA_IMAGE = '0-horizontal-image';
const FAV_BUTTON = 'favorite-btn';
const GIN_PATH = '/drinks/17222';
const GIN_IMAGE = '1-horizontal-image';

describe('Testes para o Favorite Recipes Page', () => {
  test('Verifica os botões presentes na página', async () => {
    const { user } = renderWithRouter(<App />, { route: FAVORITE_RECIPES });
    const profileBtn = screen.getByTestId(/profile-top-btn/i);
    const allBtn = screen.getByRole('button', { name: /all/i });
    const allBtnId = screen.getByTestId('filter-by-all-btn');
    const mealsBtn = screen.getByRole('button', { name: /meals/i });
    const mealsBtnId = screen.getByTestId('filter-by-meal-btn');
    const drinksBtn = screen.getByRole('button', { name: /drinks/i });
    const drinksBtnId = screen.getByTestId('filter-by-drink-btn');

    expect(drinksBtnId).toBeInTheDocument();
    expect(mealsBtnId).toBeInTheDocument();
    expect(allBtnId).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    await user.click(profileBtn);
    await waitFor(() => expect(window.location.pathname).toBe('/profile'));
  });

  test('Verifica a lista dinâmica de receitas favoritas com meals', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const foodCard = await screen.findByTestId('4-recipe-card');
    await user.click(foodCard);

    expect(window.location.pathname).toBe(TAMIYA_PATH);
    const continueBtn = await screen.findByRole('button', { name: /start recipe/i });
    await user.click(continueBtn);
    expect(window.location.pathname).toBe('/meals/53026/in-progress');

    const favoriteBtn = await screen.findByTestId(FAV_BUTTON);
    await user.click(favoriteBtn);
    expect(window.location.pathname).toBe('/meals/53026/in-progress');
    const finishBtn = await screen.findByRole('button', { name: /finish recipe/i });
    await user.click(finishBtn);

    const profileIcon = await screen.findByRole('img', { name: /profile icon/i });
    await user.click(profileIcon);
    expect(window.location.pathname).toBe('/profile');
    const favoriteRecipesBtn = await screen.findByRole('button', { name: /favorite recipes/i });
    await user.click(favoriteRecipesBtn);
    expect(window.location.pathname).toBe(FAVORITE_RECIPES);

    const tamiyaCard = await screen.findByTestId(TAMIYA_IMAGE);
    expect(tamiyaCard).toBeInTheDocument();
    const tamiyaCardTitle = await screen.findByTestId('0-horizontal-name');
    expect(tamiyaCardTitle).toBeInTheDocument();
    const tamiyaCardCategory = await screen.findByTestId('0-horizontal-top-text');
    expect(tamiyaCardCategory).toBeInTheDocument();
  });

  test('Verifica a lista dinâmica de receitas favoritas com drinks', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks' });
    const drinkCard = await screen.findByTestId('0-recipe-card');
    await user.click(drinkCard);

    expect(window.location.pathname).toBe(GIN_PATH);
    const continueBtn = await screen.findByRole('button', { name: /start recipe/i });
    await user.click(continueBtn);
    expect(window.location.pathname).toBe('/drinks/17222/in-progress');

    const favoriteBtn = await screen.findByTestId('favorite-btn');
    await user.click(favoriteBtn);
    expect(window.location.pathname).toBe('/drinks/17222/in-progress');
    const finishBtn = await screen.findByRole('button', { name: /finish recipe/i });
    await user.click(finishBtn);

    const profileIcon = await screen.findByRole('img', { name: /profile icon/i });
    await user.click(profileIcon);
    expect(window.location.pathname).toBe('/profile');
    const favoriteRecipesBtn = await screen.findByRole('button', { name: /favorite recipes/i });
    await user.click(favoriteRecipesBtn);
    expect(window.location.pathname).toBe(FAVORITE_RECIPES);

    const ginFizzCard = await screen.findByTestId(GIN_IMAGE);
    expect(ginFizzCard).toBeInTheDocument();
    const ginFizzCardTitle = await screen.findByTestId('1-horizontal-name');
    expect(ginFizzCardTitle).toBeInTheDocument();
    const ginFizzCardCategory = await screen.findByTestId('1-horizontal-top-text');
    expect(ginFizzCardCategory).toBeInTheDocument();
  });

  test('Verifica o botão share na lista de receitas favoritas', async () => {
    const { user } = renderWithRouter(<App />, { route: FAVORITE_RECIPES });
    const shareBtnMeals = await screen.findByTestId('0-horizontal-share-btn');
    await user.click(shareBtnMeals);
    expect(window.location.pathname).toBe(FAVORITE_RECIPES);
    const messageCopiedMeals = await screen.findByText('Link copied!');
    expect(messageCopiedMeals).toBeInTheDocument();

    const shareBtnDrinks = await screen.findByTestId('1-horizontal-share-btn');
    await user.click(shareBtnDrinks);
    expect(window.location.pathname).toBe(FAVORITE_RECIPES);
    const messageCopiedDrinks = await screen.findAllByText('Link copied!');
    expect(messageCopiedDrinks).toHaveLength(2);
  });

  test('Verifica se filtra entre bebidas e comidas', async () => {
    const { user } = renderWithRouter(<App />, { route: FAVORITE_RECIPES });
    const mealsBtn = screen.getByRole('button', { name: /meals/i });
    const ginCard = await screen.findByTestId(GIN_IMAGE);
    expect(ginCard).toBeInTheDocument();

    await user.click(mealsBtn);
    expect(ginCard).not.toBeInTheDocument();
  });
});
