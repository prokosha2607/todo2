<template>
  <div>
    <div class="container">
      <div class="header">
        <div class="mail-user">{{mail}}</div>
        <button class="logout" @click.prevent="logout">logout</button>
      </div>
      <div class="container-items">
        <item-todolist
          v-for="(task, index) in list"
          :key="index"
          :index="index"
          :task="task"
          :isActivePopupDelTask.sync="isActivePopupDelTask"
          :isActiveDrawer.sync="isActiveDrawer"
        ></item-todolist>
      </div>
      <div class="cont_btn-show_drawer">
        <div class="btn-show_drawer" @click.prevent="showDrawer">
          <svg aria-hidden="true" focusable="false" class="svg-plus" viewBox="0 0 448 512">
            <path
              d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
            />
          </svg>
        </div>
      </div>
      <drawer :isActiveDrawer.sync="isActiveDrawer"></drawer>
      <div class="cont_pop_up-delete_task">
        <div class="pop_up-delete_task" :class="{ active : isActivePopupDelTask}">
          <div class="close-pop_up" @click.prevent="delTask('no')">
            <svg viewBox="0 0 20 20">
              <path
                d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,
              0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"
              />
            </svg>
          </div>
          <div class="pop_up-content">
            <p>Do you really want to delete the task?</p>
            <button class="btn-confirmDeteteTask-yes" @click.prevent="delTask('yes')">Yes</button>
            <button class="btn-confirmDeteteTask-no" @click.prevent="delTask('no')">No</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemTodolist from "@/components/ItemTodolist.vue";
import Drawer from "@/components/Drawer.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      name: "home",
      isActiveDrawer: false,
      isActivePopupDelTask: false
    };
  },
  created() {
    if (!this.getMail()) {
      this.$router.push("login");
    }
  },
  mounted() {
    this.loadTasks(this.mail);
  },
  computed: {
    ...mapGetters({
      list: "getlist"
    }),
    mail() {
      return this.getMail();
    }
  },
  components: {
    ItemTodolist,
    Drawer
  },
  methods: {
    ...mapActions([
      "changeFlagDrawer",
      "deleteTask",
      "loadTasks",
      "clearState"
    ]),
    getMail() {
      return localStorage.getItem("mail");
    },
    showDrawer() {
      this.changeFlagDrawer("add");
      this.isActiveDrawer = true;
    },
    delTask(ans) {
      if (ans === "yes") {
        this.deleteTask();
      }
      this.isActivePopupDelTask = false;
    },
    logout() {
      localStorage.clear();
      this.clearState();
      this.$router.push("login");
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(207, 248, 222);
  padding: 10px;
  border-radius: 20px;
}
.logout {
  padding: 10px 20px;
  background-color: rgb(178, 243, 178);
  color: rgb(20, 104, 56);
  border: none;
  border-radius: 20px;
  box-shadow: inset 0 0 7px rgb(5, 95, 77);
  cursor: pointer;
  &:hover {
    background-color: rgb(127, 211, 155);
    color: rgb(232, 248, 239);
  }
}
.mail-user {
  color: rgb(15, 78, 42);
}
.container-items {
  display: flex;
  flex-flow: column wrap;
  align-content: flex-start;
  height: 26843500px;
  background-color: #f7f7f7;
  border-radius: 3px;
  padding: 20px;
  width: 90%;
  margin: 20px auto;
  counter-reset: items;
}
.container-items {
  &::before,
  &::after {
    content: "";
    flex-basis: 100%;
    width: 0;
    order: 2;
  }
}
.svg-plus {
  width: 20px;
  fill: forestgreen;
}
.cont_btn-show_drawer {
  position: absolute;
  right: 0;
  width: 38px;
  height: 100%;
}
.cont_pop_up-delete_task {
  position: absolute;
  width: calc((100% - 300px) / 2 + 300px);
  right: 0;
  height: 100%;
}
.btn-show_drawer {
  display: block;
  border-radius: 50%;
  padding: 5px 7px 1px 7px;
  width: 38px;
  position: fixed;
  bottom: 10%;
  cursor: pointer;
  text-align: center;
  background: #fff;
  box-shadow: 0 0 15px rgb(5, 95, 77);
  border: none;
  &:hover {
    box-shadow: 0 0 15px rgb(206, 36, 36);
    .svg-plus {
      fill: rgb(212, 25, 25);
    }
  }
}
.pop_up-delete_task {
  background: rgba(56, 183, 221, 0.842);
  width: 300px;
  box-shadow: 0 0 5px rgba(77, 10, 49, 0.5);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 35%;
  color: #fff;
  max-width: 300px;
  min-height: 11rem;
  padding: 1rem;
  opacity: 0;
  z-index: 99999;
  overflow-y: auto;
  visibility: hidden;
  transform: scale(1.2);
  transition: all 0.6s cubic-bezier(0.55, 0, 0.1, 1);
  .close-pop_up {
    position: absolute;
    cursor: pointer;
    top: 5px;
    right: 15px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.6s cubic-bezier(0.55, 0, 0.1, 1),
      transform 0.6s cubic-bezier(0.55, 0, 0.1, 1);
    transition-delay: 0.3s;
  }
  .close-pop_up svg {
    width: 1.75em;
    height: 1.75em;
    fill: #fff;
  }
  .pop_up-content {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.6s cubic-bezier(0.55, 0, 0.1, 1);
    transition-delay: 0.3s;
  }
  &.active {
    visibility: visible;
    opacity: 1;
    transform: scale(1);
    .pop_up-content {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      opacity: 1;
      visibility: visible;
    }
    .close-pop_up {
      transform: translateY(10px);
      opacity: 1;
      visibility: visible;
    }
  }
  .btn-confirmDeteteTask-yes,
  .btn-confirmDeteteTask-no {
    cursor: pointer;
    border: none;
    background: #fff;
    color: rgb(43, 135, 163);
    width: 20%;
    padding: 5px;
    margin-top: 10px;
    box-shadow: 0 0 25px rgba(200, 227, 238, 0.952);
    &:hover {
      color: rgb(22, 167, 99);
      background: rgb(210, 252, 217);
    }
  }
  .btn-confirmDeteteTask-yes {
    margin-right: 20px;
  }
}
@media (max-width: 712px) {
  .container {
    max-width: 712px;
  }
  .container-items {
    padding: 20px;
    max-width: 100%;
    margin: 10px 40px 0 0;
  }
}
@media (max-width: 320px) {
  .container {
    max-width: 320px;
    height: 100vh;
    padding-bottom: 40px;
    background-color: #fff;
  }
  .container-items {
    padding: 5px;
    width: 100%;
    margin: 5px;
  }
  .btn-show_drawer {
    bottom: 5%;
  }
}
</style>
