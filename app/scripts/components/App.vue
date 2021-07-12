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
          <fieldset>
            <label for="switch">
              <input type="checkbox" id="switch" name="switch" role="switch" v-model="asEmoji">
              Post as emoji
            </label>
            <input type="text" placeholder="comment" v-model="inputComment" @keydown.enter="writeComment">
          </fieldset>
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
      asEmoji: false,
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
      if (this.asEmoji) {
        await CommentScreen.writeEmoji(text);
      } else {
        this.inputComment = "";
        await CommentScreen.writeComment(text);
      }
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
  height: calc(100vh - 140px);
  overflow-wrap: break-word;
}
</style>
