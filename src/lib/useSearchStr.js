import {useState,useEffect} from 'react';

const usePersistedState = (initalState,sessionStorageKey) =>{

    const [state,setState] = useState(()=>{
      const persistedValue = sessionStorage.getItem(sessionStorageKey);
  
      return persistedValue ? JSON.parse(persistedValue): initalState;
    });
  
  
    useEffect(() => {
        sessionStorage.setItem(sessionStorageKey,JSON.stringify(state));
    },[state,sessionStorageKey])
  
    return [state,setState];
  
  }




export const useSearchStr = () => {
  return usePersistedState('','searchString')
}