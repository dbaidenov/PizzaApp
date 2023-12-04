import './styles/App.scss'
import './styles/styles.scss'
import { FC, useState } from "react";
import PizzaForm from "./components/PizzaForm";
import PizzaType from "./models/PizzaType";
import DisplayPizzas from "./components/DIsplayPizzas";
import Pagination from "./components/Pagination";
import useStorageData from "./helpers/localStorage";

const App: FC = (): JSX.Element => {
  //в состояниях в виде типа передаем как дженерик,ибо под капотом он принимает дженерик типы
  const [pizzaList, setPizzaList] = useStorageData<PizzaType[]>("pizzas", []);

  //добавление пиццы
  const addPizza = function (newPizza: PizzaType) {
    setPizzaList([...pizzaList, newPizza]);
  };

  //удаление пиццы
  const removePizza = function (pizza: PizzaType) {
    const newPizzaList = pizzaList.filter((value) => value.id !== pizza.id);
    console.log(newPizzaList);

    setPizzaList(newPizzaList);
  };

  //редактирование пиццы
  const editPizza = function (pizza: PizzaType) {
    const newPizzaList = pizzaList.map(function (value) {
      if (value.id === pizza.id) {
        value.price = pizza.price;
        value.img = pizza.img;
        value.title = pizza.title;
      }
      return value;
    });
    setPizzaList(newPizzaList);
  };

  //пагинация
  const [pizzasPerPage] = useState<number>(2);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const lastPizzaIndex = currentPage * pizzasPerPage;
  const firstPizzaIndex = lastPizzaIndex - pizzasPerPage;
  const currentPizzas = pizzaList.slice(firstPizzaIndex, lastPizzaIndex);

  return (
    <div className="App">
      <div className="wrap">
        <span className="heading">Наша пиццерия</span>
        <PizzaForm addPizza={addPizza} />
        {pizzaList && (
          <DisplayPizzas
            removePizza={removePizza}
            editPizza={editPizza}
            pizzaList={currentPizzas}
          />
        )}

        <Pagination
          pizzasPerPage={pizzasPerPage}
          pizzasCnt={pizzaList.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default App;
