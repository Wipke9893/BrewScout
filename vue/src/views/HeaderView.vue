<template>
  <header class="header">
    <div class="content">
      <div class="brand">
        <h1>BrewScout</h1>
        <p>Your go-to companion for exploring and enjoying local breweries and their delightful array of beers.</p>
      </div>
      <div class="nav">
        <router-link v-bind:to="{ name: 'home' }" class="nav-link">Home</router-link>
        <router-link v-bind:to="{ name: 'breweries' }" class="nav-link">Breweries</router-link>
        <router-link v-bind:to="{ name: 'login' }" v-if="!$store.state.token" class="nav-link">Login</router-link>
        <router-link v-bind:to="{ name: 'register' }" v-if="!$store.state.token" class="nav-link">Register</router-link>
        <router-link v-bind:to="{ name: 'logout' }" v-if="$store.state.token" class="nav-link">Logout</router-link>
        <router-link v-bind:to="{ name: 'admin' }" v-if="showAdmin" class="nav-link">Admin</router-link>
      </div>
    </div>
    <router-link v-bind:to="{ name: 'home' }" class="logo">
      <img id="banner" src="../assets/img/BrewScout.png" alt="BrewScout Logo">
    </router-link>
  </header>
</template>
  
<script>
export default {
  data() {
    return {
      showAdmin: false,
    }
  },
  created() {
    if (this.$store.state.user.id == 3) {
      this.showAdmin = true;
    } else {
      this.showAdmin = false;
    }
  },
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: url('C:\Users\Student\workspace\team-brewery-capstone\vue\src\assets\img\header2.png');
  /* Replace 'your-image.jpg' with the actual image file name */
  background-size: cover;
  /* Adjust to your needs, 'cover' makes the image cover the entire element */
  background-repeat: no-repeat;
  /* Prevent repeating the image */
  background-position: center center;
  /* Center the background image */
  padding: 15px;
  height: 20rem;
}


.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  text-align: center;
}

.logo {
  max-width: 15rem;
}

#banner {
  width: 100%;
  height: auto;

}

.brand {
  /* font-family: Arial, Helvetica, sans-serif; */
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-align: center;
  margin-bottom: 20px;
  margin-left: 100px;
  color: rgb(255, 255, 255);
  text-shadow: black 2px 2px 2px;
}

h1 {
  margin-bottom: 5px;
  font-size: 6rem;
}

p {
  margin: 0;
  font-size: 3rem;
}

.nav {
  display: flex;
  gap: 10px;
  margin-left: 100px;
}

.nav-link {
  text-decoration: none;
  color: gold;
  padding: 10px 20px;
  border-radius: 25px;
  transition: background-color 0.3s, color 0.3s;
  background-color: rgb(59, 59, 59);
}

.nav-link:hover {
  background-color: #333;
  transform: scale(1.1);
}

.nav-link:active {
  transform: scale(0.9);
}
</style>
  