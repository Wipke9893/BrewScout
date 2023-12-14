<template>
    <section>
        <div class="leaveReview">
            <h1>Leave a Review</h1>
            <form @submit.prevent="submitReview">
                <div class="beers">
                    <label for="beerList">Beers => </label>
                    <select id="beerList" v-model="oneBeer">
                        <option v-for="beer in filteredBeers" :key="beer.beerId" :value="beer">
                            {{ beer.name }}</option>
                    </select>
                </div>
                <div class="rating">
                    <label for="rating">Rating => </label>
                    <select id="rating" v-model="review.rating" required>
                        <option value="">Select a rating</option>
                        <option value="1">1 star</option>
                        <option value="2">2 stars</option>
                        <option value="3">3 stars</option>
                        <option value="4">4 stars</option>
                        <option value="5">5 stars</option>
                    </select>
                </div>
                <div class="comment">
                    <label for="comment">Comment => </label>
                    <input type="src" id="comment" v-model="review.review" maxlength="500" required>
                </div>
                <div>
                    <label for="image">Image URL => </label>
                    <input type="src" id="image" v-model="photoUrl">
                </div>
                <div class="submit">
                    <button type="submit">Submit Review</button>
                </div>
            </form>
        </div>
        <div class="allReviews">
            <h2>Reviews</h2>
            <ul class="review">
                <li v-for="(review, index) in filteredReviews" :key="index">
                    <div>
                        <h1>{{ review.name }}</h1>
                        <h3>{{ review.beerName }}</h3>
                        <span v-for="star in parseInt(review.rating)" :key="star">⭐</span>
                        <p>{{ review.review }}</p>
                        <div class="reviewImage">
                            <img :src="review.image" alt="">
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>
  
<script>
import brewService from '../services/BreweriesService'; // Import your API service

export default {
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
            beer: {
                beerId: '',
                brewId: '',
                name: '',
                type: '',
                abv: '',
                description: '',
                image: '',
                status: ''
            },
            beersList: [],
            oneBeer: {
                beerId: '',
                brewId: '',
                name: '',
                type: '',
                abv: '',
                description: '',
                image: '',
                status: ''
            },
            photoUrl: '',
        };
    },
    props: {
        user_id: {
            type: Number,
            required: true
        },
        brew_id: {
            type: Number,
            required: false
        },
        beer_id: {
            type: Number,
            required: false
        },
    },

    computed: {
        filteredReviews() {
            return this.reviews.filter(review => review.brew_id == this.brew_id);
        },
        filteredBeers() {
            return this.beersList.filter(beer => beer.brewId == this.brew_id);
        },
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
        this.beersList = this.$store.state.beers;
    },

    methods: {
        submitReview() {
            this.review.user_id = this.user_id; // Set the user ID
            this.review.brew_id = this.brew_id; // Set the brewery ID
            this.review.beer_id = this.oneBeer.beerId; // Set the beer ID
            this.review.beerName = this.oneBeer.name; // Set the beer name
            this.review.image = this.photoUrl; // Set the beer image
            brewService
                .insertReview(this.review)
                .then(response => {
                    if (response.status === 201) {
                        // Handle successful creation (e.g., update this.reviews)
                        this.reviews.push(response.data); // Add the new review to the local reviews array
                        // console.log('Review submitted successfully:', response.data);
                    }
                })
                .catch(error => {
                    console.error('Error submitting review:', error);
                });

        },
    }
};
</script>
  

<style scoped>
form {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    width: 35rem;
    height: 18rem;
    margin: auto;
    border-radius: 1rem;
    background-color: white;
    border: black solid 1px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1), /* Existing shadow */
              0px 0px 10px gold; /* Additional gold shadow */
    padding: 20px;
}

h1 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 3rem;
    text-align: center;
    margin: 10px 0;
}

.leaveReview {
    font-family: Arial, Helvetica, sans-serif;
}

.allReviews {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
}

.beers {
    margin-bottom: 20px;
}

.review {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* margin: 0 0 3rem 34rem; */
    border-radius: 1rem;
    border: black solid 1px;
    box-shadow: gray 5px 5px 5px 10px;
    background-color: white;
    padding: 20px;

}

img {
    width: 15rem;
    height: 15rem;
    align-items: center;
    justify-content: center;
}

li {
    font-family: Arial, Helvetica, sans-serif;
    margin-bottom: 20px;
    width: 32rem;
    /* Add space between each review */
    padding: 2px;
    /* Add padding to create individual areas for comments */
    border: 2px solid #0A0A0A;
    text-align: center;
    background-color: rgb(214, 213, 213);
    /* Add a border to separate each comment area */
}

ul {
    list-style-type: none;
    /* Remove the bullets */
}

.name {
    font-family: Arial, Helvetica, sans-serif;
    margin-bottom: 20px;
    text-align: center;
}

.rating {
    font-family: Arial, Helvetica, sans-serif;
    margin-bottom: 20px;
    text-align: center;
}

.comment {
    font-family: Arial, Helvetica, sans-serif;
    margin-bottom: 20px;
    text-align: center;
}

.submit {
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    margin-top: 30px;
}

button {
    font-family: Arial, Helvetica, sans-serif;
    background-color: rgba(199, 170, 3, 0.836);
    border: 1 solid black;
    color: white;
    padding: 9px 12px;
    display: inline-block;
    font-size: 1rem;
    border-radius: 2rem;
}

h2 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 2rem;
    text-align: center;
}

/* Update label and input width and padding */
label {
    font-family: Arial, Helvetica, sans-serif;
    display: inline-block;
    text-align: left;
    padding-left: 5px;
    width: 180px;
    font-size: 1rem;

}

input {
    font-family: Arial, Helvetica, sans-serif;
    padding-left: 5px;
    width: 400px;
}

input,
select {
    width: 250px;
    /* Adjust width of input boxes */
}
</style>
