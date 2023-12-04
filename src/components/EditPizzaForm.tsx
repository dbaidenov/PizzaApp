import React,{FC,useState} from 'react'
import PizzaType from '../models/PizzaType'
 
type AddPizzaFormProps = {
    data: PizzaType
    editPizza:(pizza:PizzaType)=>void
    handleToogleEdit:Function
}

const EditPizzaForm:FC<AddPizzaFormProps> = ({data,editPizza,handleToogleEdit}) => {
    const [newPizza,setNewPizza] = useState<PizzaType>(data)
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault()
        setNewPizza({...newPizza,[`${e.target.name}`]:e.target.value})
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        editPizza(newPizza)
        handleToogleEdit()
    }

    return ( 
        <form className='edit-form' onSubmit={handleSubmit}>
            <input name='title' required type="text" placeholder='Введите название пиццы'  value={newPizza.title} onChange={handleChange}/>
            <input name='price' required type="text" placeholder='Стоимость' value={newPizza.price} onChange={handleChange}/>
            <input name='img' required type="text" placeholder='Изображение' value={newPizza.img} onChange={handleChange}/>
            <button type='submit'>Добавить в меню</button>
        </form>
     );
}

export default EditPizzaForm;