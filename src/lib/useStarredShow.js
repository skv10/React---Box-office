import {useReducer,useEffect} from 'react';

const usePersistedReducer = (reducer,initalState,localStorageKey) =>{

    const [state,dispatch] = useReducer(reducer,initalState,(intial)=>{
      const persistedValue = localStorage.getItem(localStorageKey);
  
      return persistedValue ? JSON.parse(persistedValue): initalState;
    });
  
  
    useEffect(() => {
      localStorage.setItem(localStorageKey,JSON.stringify(state));
    },[state,localStorageKey])
  
    return [state,dispatch];
  
  }
  
  //{type:'STAR',}
  const starredShowsReducer =(currentStarred,action) =>{
  
    switch(action.type){
        case 'STAR': return currentStarred.concat(action.showId);
        case 'UNSTAR': return currentStarred.filter((showId) => showId !== action.showId );
        default:
            return currentStarred;
    }
  
  }

  export const useStarredShow =() => {
 
  return usePersistedReducer(starredShowsReducer,[],'starredshows');


  }