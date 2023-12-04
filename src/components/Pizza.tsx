import React,{FC,useState} from 'react'
import PizzaType from '../models/PizzaType';
import { CiEdit } from "react-icons/ci";
import { FaDeleteLeft } from "react-icons/fa6";
import EditPizzaForm from './EditPizzaForm';


interface PizzaPropsType{
    pizza:PizzaType
    editPizza:(pizza:PizzaType)=>void
    removePizza:(pizza:PizzaType)=>void
}

const Pizza:FC<PizzaPropsType> = ({pizza,removePizza, editPizza}) => {
    const [edit,setEdit] = useState<boolean>(false)
    const handleToogleEdit = function(){
        setEdit(!edit)
    }
    return (    
    <div className="pizza">
        <img src={`/images/${pizza.img}`} alt={pizza.title} />
        <h2>{pizza.title}</h2>
        <span>{pizza.price} тг</span>
        <div className="pizza-controls">
            <CiEdit onClick={handleToogleEdit}/>
            <FaDeleteLeft onClick={()=>removePizza(pizza)}/>
        </div>
        {edit ? <EditPizzaForm handleToogleEdit={handleToogleEdit} editPizza={editPizza} data={pizza}/> : null}
    </div> 
    );
}
 
export default Pizza;