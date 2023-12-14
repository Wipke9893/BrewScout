<template>
  <div>
    <section class="beers-list">
      <div v-for="beer in beers" :key="beer.beer_id" class="beer-card">
        <div class="beer-image-container">
          <img :src="beer.image" alt="beer" class="beer-image" />
        </div>
        <div class="beer-info">
          <h3>{{ beer.name }}</h3>
          <ul>
            <li>{{ beer.description }}</li>
            <li>Type: {{ beer.type }}</li>
            <li>ABV: {{ beer.abv }}</li>
            <li>Average Rating: {{ displayAverageRating(beer.beer_Id) }}</li>
            <li v-if="beer.status">** OUT OF STOCK **</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import brewService from '../services/BreweriesService'; // Import your API service

export default {
  props: ['beers'],

  data() {
    return {
      review: {
        user_id: '',      // You can set this later when you have user data
        brew_id: '',      // Will be populated with the brewery ID
        beer_id: '',      // Will be populated with the selected beer ID
        beerName: '',          // The user's name (if needed)
        rating: '',
        review: '',
        image: '',
      },
      reviews: [],
      filteredReviews: [],
    };
  },

  created() {
    brewService
      .getReviews()
      .then(response => {
        if (response.status == 200) {
          this.reviews = response.data;
          this.$store.commit('SET_REVIEWS', response.data);
        }
      })
      .catch(error => {
        const response = error.response;
        if (response.status === 401) {
          this.invalidCredentials = true;
        }
      });
  },

  methods: {
    displayAverageRating(beerId) {
      this.filteredReviews = this.reviews.filter(review => review.beer_id == beerId);
      if (this.filteredReviews.length == 0) return 'No ratings yet';

      const totalRating = this.filteredReviews.reduce((acc, review) => acc + parseInt(review.rating), 0);
      const averageRating = totalRating / this.filteredReviews.length;
      return this.generateStarRating(averageRating);
    },

    generateStarRating(rating) {
      const maxStars = 5;
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 !== 0;
      const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

      let stars = '⭐'.repeat(fullStars);
      if (halfStar) {
        stars += '½';
      }
      stars += '☆'.repeat(emptyStars);

      return stars;
    },
  },
};
</script>
<style scoped>
.beers-list {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.beer-card {
  font-family: Arial, Helvetica, sans-serif;
  border: 1px solid #080808;
  padding: 10px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1),
    /* Existing shadow */
    0px 0px 10px gold;
  /* Additional gold shadow */
}

.beer-image-container {
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 10px;
  width: 100%;
}

.beer-image {
  font-family: Arial, Helvetica, sans-serif;
  max-width: 100%;
  height: auto;
  width: 100%;
}

.beer-info {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  font-size: x-large;
}

h3 {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 5px 0;
  color: gold;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 5px;
  color: white;
}
</style>
