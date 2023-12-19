<template>
  <header class="header">
    <div class="content">
      <div class="brand">
        <h1>BrewScout</h1>
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
    if (this.$store.state.user.id == 3 || this.$store.state.user.id == 4) {
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
  background-image: url('C:..\assets\img\scoutImage.png');
  /* background-image: url(..\assets\img\header2.png); */
  /* Replace 'your-image.jpg' with the actual image file name */
  background-size: cover;
  /* Adjust to your needs, 'cover' makes the image cover the entire element */
  background-repeat: no-repeat;
  /* Prevent repeating the image */
  background-position: center center;
  /* Center the background image */
  padding: 1px;
  height: 20rem;
}


.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  text-align: center;
  margin-bottom: 100px;
  margin-left: 50px;
}

.logo {
  max-width: 10rem;
  margin-bottom: 158px;
  margin-left: 10px;
}

#banner {
  width: 100%;
  height: auto;

}

.brand {
  font-family: 'IM Fell English', serif;
  text-align: center;
  margin-bottom: 10px;
  margin-left: 100px;
  color: gold;
  text-shadow: rgb(66, 66, 66) 8px 5px 5px;
  display: inline-block; /* To allow padding and border */
  padding: 10px 20px; /* Add padding */
  font-size: 6rem; /* Increase font size */
}

h1 {
  padding: 10px 10px; /* Add padding */
  margin-bottom: 5px;
  font-size: 8rem;
}
.nav {
  font-family: 'IM Fell English', serif;
  display: flex;
  gap: 10px;
  margin-left: 100px;
}
.nav-link {
  font-family: 'IM Fell English', serif;
  text-decoration: none;
  color: gold;
  padding: 15px 30px; /* Increase padding for a bigger button */
  border-radius: 25px;
  transition: all 0.3s; /* Simplified transition property */
  background-color: rgb(59, 59, 59);
  margin-top: 30px;
  font-size: 1.2rem; /* Increase font size for larger text */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* Add box shadow for depth */
}

.nav-link:hover {
  background-color: #333;
  transform: translateY(-3px); /* Move the button slightly up */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5); /* Enhance box shadow on hover */
}

.nav-link:active {
  transform: translateY(1px); /* Slightly push the button down on click */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); /* Add shadow on active */
}

</style>
