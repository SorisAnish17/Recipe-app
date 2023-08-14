import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const RecipeCard = ({ idMeal, strMeal, strCategory, strMealThumb }) => {
  return (
    <Card style={{ width: "225px", height: "375px", borderRadius: "45px" }}>
      <Card.Img variant="top" src={strMealThumb} id="thumbImage" />
      <Card.Body>
        <Card.Title>{strMeal}</Card.Title>
        <Card.Text>{strCategory}</Card.Text>
        <Button variant="light">
          <Link to={`/meal/${idMeal}`} className="text-decoration-none">
            ingredients
          </Link>
        </Button>
      </Card.Body>
    </Card>
  );
};
export default RecipeCard;
