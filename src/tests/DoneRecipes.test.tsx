import { screen, waitFor } from '@testing-library/dom';
import { vi } from 'vitest';
import renderWithRouter from './helpers/renderWith';
import DoneRecipes from '../Pages/DoneRecipes';
import App from '../App';

const DONE_RECIPES = '/done-recipes';
const MESSAGE = 'Link copied!';

describe('Testa os elementos da pagina de done-recipes.', () => {
  test('Testa a rota /done-recipes.', async () => {
    const { user } = renderWithRouter(<DoneRecipes />, { route: DONE_RECIPES });
    const profileBtn = screen.getByRole('button', { name: /profile icon/i });
    const profileIcon = screen.getByRole('img', { name: /profile icon/i });
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
    expect(profileIcon).toBeInTheDocument();
  });

  test('Testando a lista dinamica.', async () => {
    const { user } = renderWithRouter(<DoneRecipes />, { route: DONE_RECIPES });
    let indexImg = 0;
    while (indexImg < 100) {
      const imageTestId = `${indexImg}-horizontal-image`;
      const imageElement = screen.queryByTestId(imageTestId);

      if (!imageElement) {
        break;
      }

      expect(imageElement).toBeInTheDocument();
      indexImg += 1;
    }

    let INDEX = 0;
    while (INDEX < 100) {
      const shareBtnTestId = `${INDEX}-horizontal-share-btn`;
      const shareBtnElement = screen.queryByTestId(shareBtnTestId);

      if (!shareBtnElement) {
        break;
      }

      expect(shareBtnElement).toBeInTheDocument();
      user.click(shareBtnElement);
      expect(window.location.pathname).toBe(DONE_RECIPES);
      expect(screen.getByText(MESSAGE)).toBeInTheDocument();

      INDEX += 1;
    }

    let indexShareBtn = 0;
    while (indexShareBtn < 100) {
      const shareBtnTestId = `${indexShareBtn}-horizontal-share-btn`;
      const shareBtnElement = screen.queryByTestId(shareBtnTestId);

      if (!shareBtnElement) {
        break;
      }

      expect(shareBtnElement).toBeInTheDocument();
      user.click(shareBtnElement);
      expect(window.location.pathname).toBe(DONE_RECIPES);
      expect(screen.getByText(MESSAGE)).toBeInTheDocument();

      indexShareBtn += 1;
    }
  });

  test('Testanto as funções', async () => {
    const { user } = renderWithRouter(<DoneRecipes />, { route: DONE_RECIPES });
    const allBtn = screen.getByRole('button', { name: /all/i });
    const mealsBtn = screen.getByRole('button', { name: /meals/i });
    const drinksBtn = screen.getByRole('button', { name: /drinks/i });

    expect(allBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();

    await user.click(allBtn);
    expect(window.location.pathname).toBe(DONE_RECIPES);

    await user.click(mealsBtn);
    expect(window.location.pathname).toBe(DONE_RECIPES);

    await user.click(drinksBtn);
    expect(window.location.pathname).toBe(DONE_RECIPES);

    vi.spyOn(window, 'alert').mockImplementation(() => {});
    await user.click(allBtn);
  });

  test('Testanto as funções', async () => {
    const { user } = renderWithRouter(<DoneRecipes />, { route: DONE_RECIPES });
    const allBtn = screen.getByRole('button', { name: /all/i });
    const mealsBtn = screen.getByRole('button', { name: /meals/i });
    const drinksBtn = screen.getByRole('button', { name: /drinks/i });

    expect(allBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();

    await user.click(allBtn);
    expect(window.location.pathname).toBe(DONE_RECIPES);

    await user.click(mealsBtn);
    expect(window.location.pathname).toBe(DONE_RECIPES);

    await user.click(drinksBtn);
    expect(window.location.pathname).toBe(DONE_RECIPES);

    vi.spyOn(window, 'alert').mockImplementation(() => {});
    await user.click(allBtn);
  });

  test('Verifica a função do botão de compartilhar', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const tamiyaCard = await screen.findByTestId('4-recipe-card');
    await user.click(tamiyaCard);

    expect(window.location.pathname).toBe('/meals/53026');
    const continueBtn = await screen.findByRole('button', { name: /start recipe/i });
    await user.click(continueBtn);
    expect(window.location.pathname).toBe('/meals/53026/in-progress');

    const finishRecipeBtn = await screen.findByRole('button', { name: /finish recipe/i });
    await user.click(finishRecipeBtn);
    expect(window.location.pathname).toBe('/done-recipes');

    const shareBtn = await screen.findByTestId('0-horizontal-share-btn');
    await user.click(shareBtn);
    const messageCopied = await screen.findByText(MESSAGE);
    expect(messageCopied).toBeInTheDocument();
  });
});
