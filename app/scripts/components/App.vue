<template>
  <div>
    <div class="grid" v-if="!authed">
      <input type="text" placeholder="room id" v-model="room">
      <input type="password" placeholder="password" v-model="password">
      <button type="submit" v-on:click="login">Enter</button>
    </div>
    <div v-else>
      <div class="comment-list">
        <p v-for="comment in comments" :key="comment.id">{{ comment.text }}</p>
      </div>
      <footer>
        <div class="grid">
          <input type="text" placeholder="comment" v-model="inputComment" @keydown.enter="writeComment">
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import CommentScreen from "../services/comment-screen";
import { scrollBottom, isScrollBottom } from "../util/dom";
import { sleep } from "../util/util";

export default {
  name: "App",
  data: () => {
    return {
      authed: false,
      room: "",
      password: "",
      comments: [],
      inputComment: "",
    };
  },
  methods: {
    login: async function () {
      try {
        await CommentScreen.login(this.room, this.password);
        this.authed = true;
        CommentScreen.listen(async comments => {
          this.comments.push(...comments);
          await sleep(100);
          scrollBottom('.comment-list');
        });
      } catch (e) {
        console.error(e);
      }
    },
    writeComment: async function (event) {
      if (event.keyCode !== 13) {
        // ignore conversion enter event.
        return;
      }
      const text = this.inputComment;
      this.inputComment = "";
      await CommentScreen.writeComment(text);
    },
  },
}
</script>

<style scoped>
footer {
  width: calc(100vw - 20px);
  position: absolute;
  bottom: 0;
}
.comment-list {
  overflow: scroll;
  height: calc(100vh - 100px);
}
</style>
