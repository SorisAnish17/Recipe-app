import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaYoutube, FaHome } from "react-icons/fa";
import { UserUniqueId } from "../Context/Context";
const SingleProduct = () => {
  let [recipes, setrecipes] = useState([]);
  const { id } = useParams();
  const { uuid } = UserUniqueId();
  // console.log(uuid);
  console.log(uuid);
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => setrecipes(data.meals))
      .catch((error) => console.log("error"));
  }, [id]);
  console.log(recipes);
  return (
    <div className="singleProduct">
      <Link to={`/Home/${uuid}`} style={{ color: "red" }}>
        {" "}
        <FaHome
          style={{ width: "35px", height: "35px" }}
          className="d-flex justify-content-start ms-5 mt-3"
        />
      </Link>
      {recipes.map((recipe) => {
        return (
          <div key={recipe.idMeal}>
            <div className="mt-5 text-center">
              <div
                className="d-flex gap-5 justify-content-center align-items-center"
                id="singleProduct"
              >
                <div>
                  <h1 className="mb-3">{recipe.strMeal}</h1>
                  <img
                    src={recipe.strMealThumb}
                    alt="image not found"
                    style={{ width: "350px", borderRadius: "100px" }}
                  />
                </div>
                <div className="w-50" style={{ maxHeight: "500px" }}>
                  <h4>Instructions</h4>
                  <p>{recipe.strInstructions}</p>
                  <h4>Ingredient:</h4>
                  <div className="d-flex gap-3 flex-wrap py-5">
                    {recipe.strIngredient1 && <p>1. {recipe.strIngredient1}</p>}
                    {recipe.strIngredient2 && <p>2. {recipe.strIngredient2}</p>}
                    {recipe.strIngredient2 && <p>3. {recipe.strIngredient3}</p>}
                    {recipe.strIngredient1 && <p>4. {recipe.strIngredient4}</p>}
                    {recipe.strIngredient5 ? (
                      <p>5. {recipe.strIngredient5}</p>
                    ) : (
                      <p className="display-none"></p>
                    )}
                    {recipe.strIngredient6 ? (
                      <p>6. {recipe.strIngredient6}</p>
                    ) : (
                      <p className="display-none"></p>
                    )}
                    {recipe.strIngredient7 ? (
                      <p>7. {recipe.strIngredient7}</p>
                    ) : (
                      <p className="display-none"></p>
                    )}
                    {recipe.strIngredient8 ? (
                      <p>8. {recipe.strIngredient8}</p>
                    ) : (
                      <p className="display-none"></p>
                    )}
                    {recipe.strIngredient9 ? (
                      <p>9. {recipe.strIngredient9}</p>
                    ) : (
                      <p className="display-none"></p>
                    )}
                    {recipe.strIngredient10 ? (
                      <p>10. {recipe.strIngredient10}</p>
                    ) : (
                      <p className="display-none"></p>
                    )}
                    {recipe.strIngredient11 ? (
                      <p>11. {recipe.strIngredient11}</p>
                    ) : (
                      <p className="display-none"></p>
                    )}
                    {recipe.strIngredient12 ? (
                      <p>12. {recipe.strIngredient12}</p>
                    ) : (
                      <p className="display-none"></p>
                    )}
                    {recipe.strIngredient13 ? (
                      <p>13. {recipe.strIngredient13}</p>
                    ) : (
                      <p className="display-none"></p>
                    )}
                    {recipe.strIngredient14 ? (
                      <p>14. {recipe.strIngredient14}</p>
                    ) : (
                      <p className="display-none"></p>
                    )}
                    {recipe.strIngredient15 ? (
                      <p>15. {recipe.strIngredient15}</p>
                    ) : (
                      <p className="display-none"></p>
                    )}
                  </div>
                  <h6>Youtube Source</h6>
                  <a href={recipe.strYoutube} target="blank" id="youtube">
                    <FaYoutube
                      style={{ width: "100px", height: "100px", color: "red" }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default SingleProduct;
