import PizzaType from "../models/PizzaType";
import React, { FC } from "react";
import Pizza from "./Pizza";

interface DisplayPizzasType {
  pizzaList: PizzaType[];
  removePizza: (pizza: PizzaType) => void;
  editPizza: (pizza: PizzaType) => void;
}

const DisplayPizzas: FC<DisplayPizzasType> = ({
  pizzaList,
  removePizza,
  editPizza,
}) => {
  return (
    <div className="container wrap">
      {pizzaList.map((pizza) => {
        return (
          <Pizza
            key={pizza.id}
            pizza={pizza}
            editPizza={editPizza}
            removePizza={removePizza}
          />
        );
      })}
    </div>
  );
};

export default DisplayPizzas;
