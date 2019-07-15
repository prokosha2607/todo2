<template>
      <form class="аuthorization" @submit.prevent="onSubmit">
        <svg aria-hidden="true" class="svg-user" viewBox="0 0 496 512">
          <path
            d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385
        8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"
          />
        </svg>
        <input
          type="email"
          class="input-email"
          v-model="inputValue"
          placeholder="Write your mail adress..."
          :class="{ error : err.isActive}"
        />
        <div class="err-msg" v-if="err.isActive">{{err.msg}}</div>
        <button type="submit" class="btn-login" @keyup.enter="submit" @click.prevent="submit">Login</button>
      </form>
</template>

<script>
export default {
  data() {
    return {
      err: {
        msg: "Please, write correct email: example@gmail.com",
        isActive: false
      },
      inputValue: ""
    };
  },
  methods: {
    submit() {
      const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (pattern.test(this.inputValue)) {
        localStorage.setItem("mail", this.inputValue);
        this.$store.dispatch("updateMail", this.inputValue);
        this.$router.push("/");
      } else {
        this.err.isActive = true;
        return;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.аuthorization {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  max-width: 350px;
  margin: 10% auto;
}
.icon-user {
  text-align: center;
}
.svg-user {
  fill: rgb(217, 247, 228);
  width: 180px;
  margin-bottom: 20px;
}
.input-email {
  width: 100%;
  height: 30px;
  border: none;
  padding: 20px 10px;
  background: rgb(199, 241, 214);
  color: rgb(24, 129, 64);
  margin: 5px 0 30px 0;
  &::placeholder {
    color: rgb(24, 129, 64);
    font-size: 15px;
  }
}
.btn-login {
  color: rgb(20, 153, 76);
  line-height: 35px;
  border: 0px;
  text-align: center;
  width: 65%;
  width: 35%;
  border-radius: 32px;
  background: transparent;
  background-image: -moz-radial-gradient(
    center bottom,
    circle cover,
    rgb(187, 240, 218) 20%,
    rgb(136, 204, 160) 80%
  );
  background-image: -webkit-radial-gradient(
    center bottom,
    circle cover,
    rgb(187, 240, 218) 20%,
    rgb(136, 204, 160) 80%
  );
  -moz-box-shadow: inset 0 0 7px rgba(1, 107, 86, 0.5);
  -webkit-box-shadow: inset 0 0 7px rgba(1, 107, 86, 0.5);
  -o-box-shadow: inset 0 0 7px rgba(1, 107, 86, 0.5);
  box-shadow: inset 0 0 7px rgba(1, 107, 86, 0.5);
  display: block;
  text-decoration: none;
  font-size: 14px;
  padding: 0px;
  cursor: pointer;
  margin: 10px 0;
}

.btn-login:before {
  content: ".";
  color: transparent;
  line-height: 15px;
  width: 85%;
  width: 95%;
  margin-top: 0px;
  margin-bottom: -17px;
  margin-left: 5px;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.1)
  );
  border-radius: 16px;
  display: block;
}
.btn-login:hover {
  background-image: -moz-radial-gradient(
    center,
    circle cover,
    rgba(161, 203, 236, 0.5) 0.5%,
    rgb(35, 167, 207) 80%
  );
  background-image: -webkit-radial-gradient(
    center,
    circle cover,
    rgba(161, 203, 236, 0.5) 0.5%,
    rgb(35, 167, 207) 80%
  );
  color: blue;
  font-weight: bold;
}
.err-msg {
  color: brown;
  font-size: 14px;
  margin: 5px 0 10px 0;
}
.error {
  border: 2px solid crimson;
}
@media (max-width: 573px) {
  .svg-user{
    width: 160px;
  }
}
</style>