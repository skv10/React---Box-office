import {SearchCard,SearchImgWrapper} from '../common/SearchGrid';

const ActorCard =({name,image,gender,country,birthday})=>{


    return (<SearchCard>
        <SearchImgWrapper>
        <img src={image} alt={name}/>

        </SearchImgWrapper>

        <h1>{name} {!!gender && `(${gender})`}</h1>

        <p>{country?`Comes from ${country}`:'No country known'}</p>

        {!!birthday && <p>Born {birthday}</p>}
        </SearchCard>
    );
}

export default ActorCard;