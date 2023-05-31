<template>
  <div id="app">
    <nav>
      <router-link to="/routes">Routes</router-link>
      <router-link to="/transports">Transports</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

#app {
  text-align: center;
  padding: 20px;
}

nav {
  margin-bottom: 20px;
}

nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

nav ul li {
  display: inline;
  margin-right: 10px;
}

nav ul li:not(:last-child) {
  margin-right: 20px;
}

nav ul li a {
  text-decoration: none;
  color: #333;
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border-radius: 4px;
}

nav ul li a:hover {
  background-color: #0069d9;
}

.router-link-active {
  font-weight: bold;
}
</style>

