export function makeRequest(specs) {
  return `https://api.themoviedb.org/3${specs}?api_key=4d91796accee221c06cb109a9805be7e`;
}

export function makePosterImageUrl(posterPath) {
  return `https://image.tmdb.org/t/p/original${posterPath}`;
}

export function makeBackdropImageUrl(url) {
  return `https://image.tmdb.org/t/p/original${url}`;
}
