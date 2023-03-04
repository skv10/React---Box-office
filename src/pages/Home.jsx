import {useState} from 'react';
import { searchForShows,searchForPeople } from '../api/tvmaze';
import SearchForm  from "../components/SearchForm";
import ShowGrid from '../components/Shows/ShowGrid';
import ActorsGrid from '../components/Actors/ActorsGrid';
import { useQuery } from '@tanstack/react-query';
// import styled from 'styled-components';
import {TextCenter} from '../components/common/TextCenter';


// const Button = styled.button`
//   color: palevioletred;
//   font-size: 1em;
//   margin: 1em;
//   padding: 0.25em 1em;
//   border: 2px solid palevioletred;
//   border-radius: 3px;
//   `


// const reducerFn = (currentCounter,action) =>{

//     switch(action.type){
//         case'INCREMENT':return currentCounter+1;
//         case'DECREMENT':return currentCounter-1;
//         case'RESET':return 0;
//     }
//     return 0;
// }

const Home =() =>{

    const [filter,setFilter] = useState(null);

    // const [counter,dispatch] = useReducer(reducerFn,0);


    // const onIncrement =() => {
    //     dispatch({type:'INCREMENT'})
    // };

    // const onDecrement =() => {
    //     dispatch({type:'DECREMENT'})
    // };

    // const onReset =() => {
    //     dispatch({type:'RESET'})
    // };


    const {data:apiData,error:apiDataError} =useQuery({
      queryKey:['search',filter],
      queryFn:()=> filter.searchOption === 'shows' ? searchForShows(filter.q):searchForPeople(filter.q),
      enabled:!!filter,
      refetchOnWindowFocus:false
    });

    // const [apiData,setApiData]= useState(null);
    // const [apiDataError,setApiDataError]= useState(null);
 

    const onSearch = async ({q,searchOption}) =>{

        setFilter({q,searchOption});
    //    try{
    //     setApiDataError(null);
    //     let result;
    //     if(searchOption === 'shows'){
    //         result = await searchForShows(q);
    //     }
    //     else{
    //         result = await searchForPeople(q);
    //     }
    //     setApiData(result); 
    // } catch(error){
    //     setApiDataError(error);
    // }
    console.log(apiData);
    }

    const renderApiData =() =>{
     if(apiDataError){
        return <TextCenter>Error occurred</TextCenter>
     }

     if(apiData?.length ===0){
        return <TextCenter>No result</TextCenter>
     }
     
     if(apiData){
     return apiData[0].show ? (<ShowGrid  shows={apiData}/>):(<ActorsGrid actors={apiData} />)
     }
     
     return null;
    }


    return (<div>

      {/* <Button>Heloo</Button> */}
        <SearchForm onSearch={onSearch}/>

        {/* <div>Counter:{counter}</div>

        <button type='button' onClick={onIncrement}>Increment</button>
        <button type='button' onClick={onDecrement}>Decrement</button>
        <button type='button' onClick={onReset}>Reset</button> */}

       <div>
        {renderApiData()}
       </div>
    </div>)
}

export default  Home;