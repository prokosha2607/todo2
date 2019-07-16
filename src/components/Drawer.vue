<template>
  <div class="cnt-drawer" :class="{ active : isActiveDrawer}" @click.self="closeDrawer">
    <div class="drawer">
      <form class="create_task" @submit.prevent="onSubmit">
        <div class="title-create_task">Title:</div>
        <input type="text" class="task-title" v-model="task.title" :class="{ error : err.isActive}" />
        <div class="descr">Description:</div>
        <textarea class="task-descr" v-model="task.description" :class="{ error : err.isActive}"></textarea>
        <div class="err-msg" v-if="err.isActive">{{err.msg}}</div>
        <button type="submit" class="btn-create_task" @click.prevent="submit">save</button>
        <button class="btn-close_drawer" @click.prevent="closeDrawer">
          <svg aria-hidden="true" focusable="false" class="svg-close_drawer" viewBox="0 0 352 512">
            <path
              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
            />
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "",
  data() {
    return {
      err: {
        msg: "Please, fill in all the fields",
        isActive: false
      }
    };
  },
  props: ["isActiveDrawer"],
  computed: {
    ...mapState(["currentTask", "flagDrawer"]),
    ...mapGetters({
      mail: "getMail"
    }),
    task() {
      return this.flagDrawer === "add" ? {} : Object.assign({}, this.currentTask);
    }
  },
  methods: {
    ...mapActions(["changeTask", "addTask",'removeCurrentTask']),
    closeDrawer() {
      this.$emit("update:isActiveDrawer", false);
      this.err.isActive = false;
      this.removeCurrentTask();
    },
    submit() {
      const data = {
        title: this.task.title,
        description: this.task.description
      };
      const author = { author: this.mail || localStorage.getItem("mail") };
      if (!(data.title && data.description)) {
        this.err.isActive = true;
        return;
      }
      if (this.flagDrawer === "change") {
        this.changeTask({ id: this.task["_id"], data });
      } else {
        this.addTask({ ...author, ...data });
      }
      this.task.title = this.task.description = "";
      this.closeDrawer();
    }
  }
};
</script>

<style scoped lang="scss">
.cnt-drawer {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.6s cubic-bezier(0.55, 0, 0.1, 1),
    visibility 0.6s cubic-bezier(0.55, 0, 0.1, 1);
  &.active {
    opacity: 1;
    visibility: visible;
    .drawer {
      visibility: visible;
      opacity: 1;
      transform: scale(1);
      .btn-close_drawer {
        transform: translateY(10px);
        opacity: 1;
        visibility: visible;
      }
    }
  }
}
.drawer {
  position: relative;
  background-color: #ccf7cc;
  width: 25%;
  height: 100%;
  padding: 1rem;
  padding-top: 40px;
  opacity: 0;
  z-index: 99999;
  visibility: hidden;
  overflow-y: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transform: scale(1.2);
  transition: all 0.6s cubic-bezier(0.55, 0, 0.1, 1);
}
.create_task {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}
.btn-create_task {
  display: block;
  padding: 10px 50px;
  margin: 30px auto;
  background: forestgreen;
  color: #fff;
  font-size: 14px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  &:hover {
    background: rgba(75, 138, 75, 0.74);
  }
}
.title-create_task,
.descr {
  color: rgb(18, 88, 18);
  margin-bottom: 10px;
  width: 100%;
  max-width: 300px;
}
.btn-close_drawer {
  display: block;
  margin: 30px auto 5px auto;
  border: none;
  background: transparent;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.6s cubic-bezier(0.55, 0, 0.1, 1),
    transform 0.6s cubic-bezier(0.55, 0, 0.1, 1);
  transition-delay: 0.3s;
}
.svg-close_drawer {
  width: 25px;
  fill: rgb(40, 187, 197);
  &:hover {
    fill: maroon;
  }
}
.task-title,
.task-descr {
  color: forestgreen;
  border: none;
  width: 100%;
  margin-bottom: 20px;
  padding: 5px;
  max-width: 300px;
}
.task-title::placeholder {
  background-color: #ccf7cc;
}
.err-msg {
  color: brown;
  font-size: 14px;
  margin: 5px 0 10px 0;
}
.error {
  border: 2px solid crimson;
}
@media (max-width: 930px) {
  .drawer {
    width: 35%;
  }
}
@media (max-width: 600px) {
  .drawer {
    width: 50%;
  }
}
@media (max-width: 400px) {
  .drawer {
    width: 100%;
  }
}
</style>