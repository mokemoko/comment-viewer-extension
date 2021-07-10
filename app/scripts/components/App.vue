
<template>
  <div>
    <div class="grid">
      <input type="text" placeholder="room id" v-model="roomId">
      <input type="password" placeholder="password" v-model="password">
      <button type="submit" v-on:click="login">Enter</button>
    </div>
    <div class="comment-list">
      <p v-for="comment in comments" :key="comment.id">{{ comment.message }}</p>
    </div>
    <footer>
      footer
    </footer>
  </div>
</template>

<script>
import CommentScreen from "../services/comment-screen";

export default {
  name: "App",
  data: () => {
    return {
      roomId: "",
      password: "",
      comments: [
        ...(count => [...Array(count)].map((_, i) => ({ id: i, message: `Hello ${i} !` })))(20)
      ],
    };
  },
  methods: {
    login: async function () {
      try {
        await CommentScreen.login(this.roomId, this.password);
      } catch (e) {
        console.error(e);
      }
    }
  },
}
</script>

<style scoped>
footer {
  position: absolute;
  bottom: 0;
}
.comment-list {
  overflow: scroll;
  height: calc(100vh - 400px);
}
</style>
