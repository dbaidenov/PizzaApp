import React,{FC,useState} from 'react'
import PizzaType from '../models/PizzaType'

const initState = {
    title:'',
    price:'',
    img:'',
}
 
type initStateType = {
    title:string,
    price:string,
    img:string
}
 
//мы должны явно указать тип для пропса, иначе будет ошибка при получении пропсов. потому что типы могут не совпадать с встроенным интерфейсом IntrinsicAttributes
type AddPizzaFormProps = {
    addPizza: (newPizza:PizzaType) => void
}

//FC - это сокращение от "Function Component" и представляет собой тип в React, предназначенный специально для определения функциональных компонентов. 
//указывание FC является более распространенным подходом в сообществе React TypeScript
//FC только ожидает использование generics для указания типа пропсов.
const PizzaForm:FC<AddPizzaFormProps> = ({addPizza}):JSX.Element => {
    const [newPizza,setNewPizza] = useState<initStateType>(initState)
        
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault()
        setNewPizza({...newPizza,[`${e.target.name}`]:e.target.value})
        
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        addPizza({...newPizza,id:Date.now()})
        setNewPizza(initState)
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <input name='title' required type="text" placeholder='Введите название пиццы'  value={newPizza.title} onChange={handleChange}/>
            <input name='price' required type="text" placeholder='Стоимость' value={newPizza.price} onChange={handleChange}/>
            <input name='img' required type="text" placeholder='Изображение' value={newPizza.img} onChange={handleChange}/>
            <button type='submit'>Добавить в меню</button>
        </form>
     );
}

export default PizzaForm;