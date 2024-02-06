import Header from '../Components/Header';
import FavRecipes from '../Components/FavRecipes';

function FavoriteRecipes() {
  return (
    <div>
      <Header />
      <h1 data-testid="page-title">
        Favorite Recipes
      </h1>
      <FavRecipes />
    </div>
  );
}

export default FavoriteRecipes;
