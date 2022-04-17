const onlyOnce = (cb, context, condition) => {
  let isOnlyOne = true; 

  
  return () => {
    if (isOnlyOne && condition) {
      cb.call(context);
      isOnlyOne = false;
    }
  }
}

const getFilteredMovieList = (list) => {
  const filteredList = [];
  
  list.forEach((movie) => {
    const index = filteredList.findIndex((element) => element['imdbID'] === movie['imdbID']);
    
    if (index === -1) {
      filteredList.push(movie);
    }
  });
  
  return filteredList;
}

export {onlyOnce, getFilteredMovieList}
