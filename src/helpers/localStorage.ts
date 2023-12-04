//вместо того чтоб для каждого компонента создавать состояние локального хранилища
//лучше сделаем общий свой стэйтмент
//и будем экспортировать
//Это хороший подход, который позволяет вам управлять состоянием, сохраненным в локальном хранилище,
//в едином месте, что упрощает код и предотвращает дублирование логики работы с локальным хранилищем
//в разных компонентах.


import { useState, useEffect, Dispatch, SetStateAction } from "react";

const getStorageData = function<T> (key:string, value:T):T {
  const data = localStorage.getItem(key);
  if(data !== null){
    const parsedData:T = JSON.parse(data)
    return parsedData
  }
  else{
    return value;
  }
};

type returnStorageData<T> = [T,Dispatch<SetStateAction<T>>]

const useStorageData = function<T> (key:string, value:any):returnStorageData<T> {
  const [storageValue, setStorageValue] = useState<T>(getStorageData(key, value));
  //key-потому что он сразу обхватывает первое изменение на key и будет срабатывать сразу же каждый раз когда делаем вызов useStorageData
  //storageValue - потому что снаружи где то если меняем через setStorageValue то измениться и storageValue,
  //и без разницы что useEffect находится внутри функции, useEffect напрямую связан с зависимостью storageValue, а storageValue
  //меняется через setStorageValue, они хуки им похуй...
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storageValue));
  }, [key, storageValue]);
  //снаружи когда используем где то эту функцию
  //возвращается состояние и функция для изменения состояния
  //то есть если там снаружи в компонентах если где то изменяется состояние,
  //срабатывает useEffect, так как он всегда зависит от изменения storageValue или Key
  //короче говоря useState и useEffect всегда срабатывают где бы мы их не указывали, даже внутри функции другого
  //js файла или же внутри другого компонента, без разницы короче.
  //главное использовать их внутри компонентов React или пользовательских хуков))
  //и собственно возвращаем состояние и функция для изменения состояния
  return [storageValue, setStorageValue];
};

export default useStorageData;
