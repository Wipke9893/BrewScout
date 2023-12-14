<template>
    <div class="page">
        <!-- <div class="makeBeer">
        <div class="forms-container">
        <div class="makeBeer">
            <h1>Add Beer</h1>
            <form @submit.prevent="submitBeer">
                <label for="name">/ Beer name \</label>
                <input type="text" id="name" v-model="beer.name" maxlength="30" required>
                <label for="type">/ Beer type \</label>
                <input type="text" id="beerType" v-model="beer.type" maxlength="25" required>
                <label for="Description">/ Description \</label>
                <input type="text" id="Description" v-model="beer.description" maxlength="500" required>
                <label for="ABV">/ Beer abv \</label>
                <input type="text" id="beerAbv" v-model="beer.abv" maxlength="5" required>
                <label for="image">/ Beer image \</label>
                <input type="url" id="beerImage" v-model="beer.image" maxlength="500" required>
                <button type="submit">Submit Add Beer</button>
            </form>
        </div> -->
        <div class="updateBrewery">
            <h1>Update Brewery</h1>
            <form @submit.prevent="updateBrewery">
                <div class="breweryName">
                    <label for="updateBreweryName">Brewery name</label>
                    <input id="updateBreweryName" v-model="updateBrew.name" type="text" required>
                </div>
                <div class="breweryaddress">
                    <label for="updateBreweryAddress">Brewery address</label>
                    <input id="updateBreweryAddress" v-model="updateBrew.address" type="text" required>
                </div>
                <div class="breweryaddress2">
                    <label for="updateBreweryAddress2">Brewery address2</label>
                    <input id="updateBreweryAddress2" v-model="updateBrew.address2" type="text">
                </div>
                <div class="brewerycity">
                    <label for="updateBreweryCity">Brewery city</label>
                    <input id="updateBreweryCity" v-model="updateBrew.city" type="text" required>
                </div>
                <div class="breweryStateAbbr">
                    <label for="updateBreweryStateAbbr">Brewery StateAbbr</label>
                    <input id="updateBreweryStateAbbr" v-model="updateBrew.state_abbr" type="text" required>
                </div>
                <div class="zipCode">
                    <label for="updateBreweryZipCode">Brewery zipCode</label>
                    <input id="updateBreweryZipCode" v-model="updateBrew.zip_code" type="text" required>
                </div>
                <div class="Phone">
                    <label for="updateBreweryPhone">Phone</label>
                    <input id="updateBreweryPhone" v-model="updateBrew.phone" type="text">
                </div>
                <div class="website">
                    <label for="updateBreweryWebsite">Website</label>
                    <input id="updateBreweryWebsite" v-model="updateBrew.website" type="text">
                </div>
                <div class="history">
                    <label for="updateBreweryHistory">History</label>
                    <input id="updateBreweryHistory" v-model="updateBrew.history" type="text">
                </div>
                <div class="operationhours">
                    <label for="updateBreweryOperationHours">Operation Hours</label>
                    <input id="updateBreweryOperationHours" v-model="updateBrew.operation_hours" type="text">
                </div>
                <div class="breweryImg">
                    <label for="updateBreweryImage">Brewery Image</label>
                    <input id="updateBreweryImage" v-model="updateBrew.image" type="url">
                </div>
                <button type="submit">Submit Brewery</button>
            </form>
        </div>
        <div class="updateBeer">
            <h1>Add or Update Beer</h1>
            <form @submit.prevent="updateBeer">
                <div class="beers">
                    <label for="beerList">Select a Beer if updating => </label>
                    <select id="beerList" v-model="upBeers">
                        <option v-for="beer in filteredBeers" :key="beer.beerId" :value="beer">
                            {{ beer.name }}</option>
                    </select>
                </div>
                <label for="name">Beer name </label>
                <input type="text" id="name" v-model="upBeers.name" maxlength="30" required>
                <label for="type">Beer type</label>
                <input type="text" id="beerType" v-model="upBeers.type" maxlength="25" required>
                <label for="Description">Description</label>
                <input type="text" id="Description" v-model="upBeers.description" maxlength="500" required>
                <label for="ABV">Beer abv</label>
                <input type="text" id="beerAbv" v-model="upBeers.abv" maxlength="5" required>
                <label for="image">Beer image</label>
                <input type="url" id="beerImage" v-model="upBeers.image" maxlength="500">
                <label for="status">Out of stock => </label>
                <select id="status" v-model="upBeers">
                    <option :key="true" :value="true">True</option>
                    <option :key="false" :value="false">False</option>
                </select>
                <button type="submit">Submit Beer</button>
            </form>
        </div>
    </div>
</template>

<script>
import BreweriesService from "../services/BreweriesService"
export default {
    props: ['brewery'],

    data() {
        return {
            updateBrew: {
                brew_id: 0,
                user_id: 0,
                name: '',
                address: '',
                address2: '',
                city: '',
                state_abbr: '',
                zip_code: '',
                phone: '',
                website: '',
                history: '',
                operation_hours: '',
                image: ''
            },

            beer: {
                beer_Id: 0,
                brewId: 0,
                name: '',
                type: '',
                abv: '',
                description: '',
                image: '',
                status: ''
            },
            upBeers: {
                beer_Id: 0,
                brewId: 0,
                name: '',
                type: '',
                abv: '',
                description: '',
                image: '',
                status: ''
            },
            beersList: [],
        }
    },

    created() {
        this.updateBrew = { ...this.brewery };
        this.beersList = this.$store.state.beers;
    },

    computed: {
        filteredBeers() {
            return this.beersList.filter(beer => beer.brewId == this.brewery.brew_id);
        },
    },

    methods: {
        submitBeer() {
            BreweriesService
                .insertBeer(this.beer)
                .then(response => {
                    if (response.status === 201) {
                        // Handle successful creation (e.g., update this.beer)
                        this.beers.push(response.data); // Add the new ber to the local beers array
                    }
                })
                .catch(error => {
                    console.error('Error submitting beer:', error);
                });
        },

        updateBrewery() {
            this.updateBrew.brew_id = this.brewery.brew_id;
            BreweriesService
                .updateBrewery(this.updateBrew)
                .then(response => {
                    if (response.status === 201) {
                        // Handle successful creation (e.g., update this.beer)
                        this.updateBrew.push(response.data); // Add the new ber to the local beers array
                    }
                })
                .catch(error => {
                    console.error('Error updating brewery:', error);
                });
        }, updateBeer() {
            if (this.upBeers.brewId > 0) {
                this.upBeers.brewId = this.brewery.brew_id;
                BreweriesService
                    .updateBeer(this.upBeers)
                    .then(response => {
                        if (response.status === 201) {
                            this.upBeers.brewId = 0;
                            this.upBeers.name = '';
                            this.upBeers.type = '';
                            this.upBeers.description = '';
                            this.upBeers.abv = '';
                            this.upBeers.image = '';
                            this.upBeers.status = false;
                        }
                    })
                    .catch(error => {
                        console.error('Error updating brewery:', error);
                    });
            } else {
                BreweriesService
                    .insertBeer(this.upBeers)
                    .then(response => {
                        if (response.status === 201) {
                            this.beersList.push(response.data);
                        }
                    })
                    .catch(error => {
                        console.error('Error submitting beer:', error);
                    });
            }
        }

    }
}

</script>

<style scoped>
ul li {
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
    background-color: rgb(149, 147, 147);
    padding-right: 2rem;
    border: 2.5px solid rgb(199, 170, 2);
    margin: 15px 0px 15px 0px;
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
    text-align: center;
    font-size: 1.5rem;
    text-decoration: none;
    font-weight: bold;
    color: #050505;
    padding: 10px 20px;
    border-radius: 25px;
    transition: background-color 0.3s, color 0.3s;
    background-color: rgb(159, 159, 5);
    margin: 0.5rem 1rem 0.5rem 1rem;
    width: 70%;
    margin-top: 100px;
}

button:hover {
    background-color: #333;
    transform: scale(1.1);
}

button:active {
    transform: scale(0.9);
}

form {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    width: 100%;
    /* Adjusted width to occupy the entire space */
    margin: 1rem auto 2rem;
    /* Center the forms horizontally */
}

label {
    font-family: Arial, Helvetica, sans-serif;
    display: inline-block;
    text-align: left;
    padding-left: 5px;
    width: 40%;
    /* margin-bottom: 0.5rem; */
    border-style: solid;
    border-width: 1px;
    border-color: rgb(199, 170, 2);
    ;
    /* Reduced spacing between labels */
}

input {
    font-family: Arial, Helvetica, sans-serif;
    padding-left: 5px;
    width: 70%;
    /* Adjusted input width */
    height: 1.2rem;
    /* Reduced input height */
    margin-bottom: 1rem;
    /* Adjusted spacing between inputs */
}


.beers {
    margin-bottom: 20px;
}

select#status {
    font-family: Arial, Helvetica, sans-serif;
    padding-left: 5px;
    width: 70%;
    /* Adjusted input width */
    height: 1.2rem;
    /* Reduced input height */
    margin-bottom: 1rem;
}


.updateBrewery {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin: 1rem auto;
    /* Center the forms horizontally */
    border-radius: 1rem;
    border: rgb(190, 197, 5) solid 1px;
    box-shadow: rgb(137, 147, 3) 5px 5px 5px 10px;
    background-color: rgb(201, 199, 186);
    padding: 20px;
    height: auto;
    width: 50%;
    /* Adjusted width for better spacing */
}

.updateBeer {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin: 1rem auto;
    border-radius: 1rem;
    border: rgb(190, 197, 5) solid 1px;
    box-shadow: rgb(137, 147, 3) 5px 5px 5px 10px;
    background-color: rgb(201, 199, 186);
    padding: 20px;
    width: 50%;
    font-family: Arial, Helvetica, sans-serif;
    padding-left: 5px;
    width: 40%;
    /* Adjusted input width to make the boxes the same size */
    height: 1.2rem;
    /* Reduced input height */
    margin-bottom: 1rem;
    /* Adjusted spacing between inputs */
}

/* Set forms to be flex containers */
.page {
    font-family: Arial, Helvetica, sans-serif;
    background-image: url('../assets/img/homePage2.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    margin: 0;
    /* Remove margin */
    padding: 0;
    /* Remove padding */
    height: 1000px;
    display: flex;
    justify-content: center;
    /* Center horizontally */
    justify-content: space-around;
    align-items: center;
    /* Center vertically */

}

.forms-container {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 20px;
}

/* Style for individual forms */
.makeBeer,
.updateBeer,
.updateBrewery {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin: 1rem auto;
    border-radius: 1rem;
    border: rgb(190, 197, 5) solid 1px;
    box-shadow: rgb(137, 147, 3) 5px 5px 5px 10px;
    background-color: rgb(201, 199, 186);
    padding: 20px;
    width: 350px;
    /* Set a fixed width for each form */
    height: 700px;
    /* Set a fixed height for each form */
}</style>