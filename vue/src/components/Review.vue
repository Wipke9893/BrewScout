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
                <div class="completion-message" :class="{ 'show-message': showMessage }">
                    {{ messageText }}
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
            showMessage: false,
            messageText: '',
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
            if (this.user_id == 0 || this.user_id == null) {
                this.showCompletionMessage("You must be logged in to submit a review!");
                return;
            }
            this.review.user_id = this.user_id; // Set the user ID
            this.review.brew_id = this.brew_id; // Set the brewery ID
            this.review.beer_id = this.oneBeer.beer_Id; // Set the beer ID
            this.review.beerName = this.oneBeer.name; // Set the beer name
            this.review.image = this.photoUrl; // Set the beer image
            brewService
                .insertReview(this.review)
                .then(response => {
                    if (response.status === 201) {

                        this.reviews.push(response.data); // Add the new review to the local reviews array
                        this.showCompletionMessage("Review added successfully!");

                    }
                })
                .catch(error => {
                    console.error('Error submitting review:', error);
                });

        },

        showCompletionMessage(message) {
            this.showMessage = true;
            this.messageText = message;

            // Hide the message after 3 seconds (adjust duration as needed)
            setTimeout(() => {
                this.showMessage = false;
            }, 3000);
        }
    },

};
</script>
  

<style scoped>
.completion-message {
    font-family: Arial, Helvetica, sans-serif;
    color: gold;
    margin-top: 10px;
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(17, 17, 17, 0.9);
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: none;
}

/* Show the completion message */
.show-message {
    display: block;
}

form {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    width: 30rem;
    height: 15rem;
    margin: auto;
    border-radius: 1rem;
    background-color: rgb(189, 185, 185);
    border: black solid 1px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1),
        /* Existing shadow */
        0px 0px 10px gold;
    /* Additional gold shadow */
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
}

.beers {
    margin-bottom: 20px;
}

.review {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1rem;
    border: black solid 1px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1),
        0px 0px 10px gold;
    padding: 20px;
    background-color: rgb(165, 161, 161);

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
    width: 30rem;
    /* Add padding to create individual areas for comments */
    border: 2px solid #0A0A0A;
    text-align: center;
    background-color: rgb(214, 213, 213);
    /* Add a border to separate each comment area */
}

.rating {
    font-family: Arial, Helvetica, sans-serif;
    margin-bottom: 20px;
    margin-right: 110px;
    text-align: center;
}

.comment {
    font-family: Arial, Helvetica, sans-serif;
    margin-bottom: 20px;
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
    width: 180px;
    font-size: 1rem;

}
</style>
