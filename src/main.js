import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";

Vue.use(VueResource);

Vue.http.options.root = "https://vuejs-http-855ee-default-rtdb.firebaseio.com/";
Vue.http.interceptors.push((request, next) => {
  console.log(request);
  if (request.method == "POST") {
    request.method = "PUT";
  }
  next((response) => {
    response.json = () => {
      return { message: response.body };
    };
  });
});

new Vue({
  el: "#app",
  render: (h) => h(App),
});
