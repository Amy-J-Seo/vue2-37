<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Http</h1>
        <div class="form-group">
          <label>UserName</label>
          <input class="form-control" type="text" v-model="user.username" />
        </div>
        <div class="form-group">
          <label>Mail</label>
          <input class="form-control" type="text" v-model="user.email" />
        </div>
        <button class="btn btn-primary" @click="submit">Submit</button>
        <hr />
        <input type="text" class="form-control" v-model="node" />
        <button class="btn btn-primary" @click="fetchData">Get Data</button>
        <ul class="list-group-item">
          <li class="list-group-item" v-for="u in users" :key="u.email">
            {{ u.username }} || {{ u.email }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      user: {
        username: "",
        email: "",
      },
      resource: {},
      node: "data",
    };
  },
  methods: {
    submit() {
      //   this.$http
      //     .post("data.json", this.user)
      //     .then((res) => {
      //       console.log(res);
      //     })
      //     .catch((err) => console.error(err));

      //this.resource.save({}, this.user);

      this.resource.saveAlt(this.user);
    },
    fetchData() {
      //   this.$http
      //     .get("data.json")
      //     .then((res) => {
      //       console.log(res);
      //       return res.json();
      //     })
      //     .then((data) => {
      //       console.log(data);
      //       const resultArray = [];
      //       for (let key in data) {
      //         resultArray.push(data[key]);
      //       }
      //       this.users = resultArray;
      //       console.log(this.users);
      //     })
      //     .catch((err) => console.error(err));
      this.resource
        .getData({ node: this.node })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          console.log(data);
          const resultArray = [];
          for (let key in data) {
            resultArray.push(data[key]);
          }
          this.users = resultArray;
          console.log(this.users);
        })
        .catch((err) => console.error(err));
    },
  },
  created() {
    const customActions = {
      saveAlt: { method: "POST", url: "alternative.json" },
      getData: { method: "GET" },
    };
    this.resource = this.$resource("{node}.json", {}, customActions);
  },
};
</script>

<style></style>
