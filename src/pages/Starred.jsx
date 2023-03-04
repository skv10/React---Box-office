
import {useStarredShow} from '../lib/useStarredShow';
import { useQuery } from '@tanstack/react-query';
import { getShowByIds } from '../api/tvmaze';
import ShowGrid from '../components/Shows/ShowGrid';
import {TextCenter} from '../components/common/TextCenter';

const Starred =() =>{

    const [starredShowsIds] = useStarredShow();

    const {data:starredShows,error:starredShowsError} =useQuery({
        queryKey:['starred',starredShowsIds],
        queryFn: async ()=> getShowByIds(starredShowsIds).then(result => 
            result.map(show => ({ show}))),
        refetchOnWindowFocus:false
      });

      if(starredShows?.length > 0){
        return <ShowGrid shows={starredShows} />
      }

      if(starredShows?.length === 0){
        return <TextCenter>No Shows are Starred</TextCenter>
      }

      if(starredShowsError){
        return <TextCenter>Error occurred:{starredShowsError.message}</TextCenter>
      }

    return (<div>Shows are loading</div>)
}

export default  Starred;