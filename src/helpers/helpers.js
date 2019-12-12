import axios from 'axios';
let apiURL = 'https://api.themoviedb.org/3';
let apiKey = '96e7d4223b658d3d50bfe77083eaa6d0';
export function addCastAndImages(movies) {
    if (movies != undefined && movies.length > 0) {
        movies.forEach(movie => {
            axios.get(`${apiURL}/movie/${movie.id}/credits?api_key=${apiKey}`)
                .then(res => {
                    movie.cast = res.data.cast;
                })
                .catch(err => {
                    alert(JSON.stringify(err));
                });
            axios.get(`${apiURL}/movie/${movie.id}/images?api_key=${apiKey}`)
                .then(res => {
                    movie.backdrops = res.data.backdrops;
                })
                .catch(err => {
                    alert(JSON.stringify(err));
                });
        });
    }
    return movies;
}