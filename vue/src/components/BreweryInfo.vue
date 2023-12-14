<template>
    <section>
        <div class="picture">
            <img :src="brewery.image" alt="image broken"> <!-- Use the brewery's image source -->
        </div>

        <div class="history">
            <div class="info">
                <h1>{{ brewery.name }}</h1>
            </div>
            <h2>{{ brewery.history }}</h2> <!-- Display the brewery's description -->
        </div>

        <div class="details">
            <h3>Details</h3>
            <ul>
                <li>Address : {{ brewery.address }}</li>
                <li>City : {{ brewery.city }}</li>
                <li>State : {{ brewery.state_abbr }}</li>
                <li>Zip Code : {{ brewery.zip_code }}</li>
                <li>Phone : {{ brewery.phone }}</li>
                <li>Hours : {{ brewery.operation_hours }}</li>
                <li>Website :<a v-bind:href="brewery.website" target="_blank"> {{ brewery.website }}</a></li>
            </ul>
            <div>
                <!-- <router-link v-if="this.showAdmin" :to="'/brewAdmin/' + breweries.brew_id" class="nav-link">Brewer Admin</router-link> -->
                <router-link v-if="this.showAdmin" :to="{ name: 'brewAdmin' }" class="nav-link">Brewer Admin</router-link>
            </div>
        </div>
    </section>
</template>
  
<script>
import BreweriesService from '../services/BreweriesService';
export default {
    props: {
        brew_id: {
            type: Number,
            required: true
        },
        brewery: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            // brewery: {},
            beer: {
                beer_Id: '',
                brew_id: '',
                name: '',
                type: '',
                abv: '',
                description: '',
                image: '',
                status: ''
            },
            beers: [],
            showAdmin: false,

        }
    },

    created() {
        if (this.$store.state.user.id == this.brewery.user_id) {
            this.showAdmin = true;
        }
        this.$store.commit('SET_BREWERSID', this.brewery.brew_id);
    },
}
</script>


<style scoped>
section {
    display: flex;
}

img {
    max-width: 400px;
    max-height: 400px;
    margin: 15px 0px 15px 0px;
}

.history {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    /* width: 180rem; */
    padding-left: 1.5rem;
    flex-grow: 2;
    padding-right: 1.5rem;
}

ul {
    font-family: Arial, Helvetica, sans-serif;
    list-style-type: none;
    font-size: 1.5rem;
    justify-content: center;
    margin: 1px 0px 0px 0px;
}

li {
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 10px;
    text-align: center;
}

.details {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: flex-end;
    background-color: whitesmoke;
    padding-right: 1rem;
    border: 2.5px solid rgb(199, 170, 2);
    margin: 15px 0px 15px 0px;
}

.info {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: xx-large;
}

.details>h3 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: xx-large;
    text-decoration: underline;
    justify-content: center;
    align-items: center;
    margin: 25px 0px 15px 15px;
}

.AddBeer {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    text-align: center;
}

button {
    font-family: Arial, Helvetica, sans-serif;
    justify-content: center;
    align-items: center;
}

form {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    margin: 1rem 0 2rem 0rem;
}


.makeBeer {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1rem;
    border: black solid 1px;
    box-shadow: gray 5px 5px 5px 10px;
    padding: 20px;

}

.nav {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    font-size: 2rem;
    padding-left: 4rem;
    justify-content: center;
    /* justify-content: flex-end; */
    flex-direction: column;
    text-decoration: none;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
}

/* Improved button styles and hover effect */
.nav-link {
    font-family: Arial, Helvetica, sans-serif;
    text-decoration: none;
    text-align: center;
    color: rgb(202, 200, 200);
    font-size: 1.5rem;
    transition: color 0.3s;
    border: 1px solid gray;
    padding: 0px 2px 0px 4px;
    border-radius: 5px;
    background-color: rgb(59, 59, 59);
    margin: 0px 0px 0px 0px;
}

.nav-link:hover {
    color: #FFCC00;
    background-color: gray;
    /* Change text color on hover */
    /* Add additional styling for the hover effect, e.g., background color change */
}
</style>