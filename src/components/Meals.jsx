import Error from "../componetns/UI/Error";
import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";

const configRequest = {}

export default function Meals() {

  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", configRequest , []);

  if (isLoading) {
    return <p className="center">Fetching meals</p>
  }

  if(error) {
    return <Error title='Failed to fetch meals' message={error}/>
  }


  return (
    <ul id="meals">
      {loadedMeals.map((meal) => {
        return <MealItem meal={meal} key={meal.id} />;
      })}
    </ul>
  );
}
