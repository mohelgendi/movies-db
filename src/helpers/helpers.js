import axios from 'axios';
export function addCastAndImages(movies) {
    if (movies != undefined && movies.length > 0) {
        movies.forEach(movie => {
            axios.get(`${process.env.VUE_APP_API_URL}/movie/${movie.id}/credits?api_key=${process.env.VUE_APP_API_KEY}`)
                .then(res => {
                    movie.cast = res.data.cast;
                })
                .catch(err => {
                    alert(JSON.stringify(err));
                });
            axios.get(`${process.env.VUE_APP_API_URL}/movie/${movie.id}/images?api_key=${process.env.VUE_APP_API_KEY}`)
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