import React, { FC } from "react";

interface PizzaPaginationProps {
  pizzasPerPage: number;
  pizzasCnt: number;
  setCurrentPage: (value: number) => void;
  currentPage: number;
}

const Pagination: FC<PizzaPaginationProps> = ({
  pizzasPerPage,
  pizzasCnt,
  setCurrentPage,
  currentPage,
}) => {
  let pageNumbers: number[] = [];

  //количество пиц делим на количество пиц в странице
  //используем так же ceil для округление наверх
  //типа если у нас будет 3 пиццы а число пиц в стр равно 2 то при делении будет 1,5. Соотвественно нужны 2 кнопки для страниц
  //знак <= потому что начальная страница у нас должно быть равно 1, и пришлось использовать этот оператор сравнения
  for (let i: number = 1; i <= Math.ceil(pizzasCnt / pizzasPerPage); i++) {
    pageNumbers.push(i);
  }

  return pizzasCnt > pizzasPerPage ? (
    <>
      <ul className="pagination">
        {pageNumbers.map((pageNumber,index) => {
          return (
            <li key={index} onClick={() => setCurrentPage(pageNumber)}>{pageNumber}</li>
          );
        })}
      </ul>
      <div className="navigate--buttons button">
        <button
          onClick={() => {
            if (currentPage > 1)
              setCurrentPage(currentPage - 1);
            else return;
          }}
        >
          Prev
        </button>
        <button
          onClick={() => {
            if (currentPage < pageNumbers.length)
              setCurrentPage(currentPage + 1);
            else return;
          }}
        >
          Next
        </button>
      </div>
    </>
  ) : null;
};

export default Pagination;
