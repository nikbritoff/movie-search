import Card from "../card/card";

function Content({moviesList}) {
  return (
    <>
    {<div className="content__wrapper">
      {moviesList.map((movie) => <Card movie={movie} key={movie.imdbID}/>)}      
    </div>}
    </>
  )
}

export default Content;
