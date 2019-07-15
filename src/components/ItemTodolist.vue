<template>
  <div class="cont-item">
    <div class="item">
      <div class="cont_change-item">
        <button class="change_task" @click.prevent="changeTask('isActiveDrawer')">
          <svg aria-hidden="true" focusable="false" class="item-svg-pen" viewBox="0 0 512 512">
            <path
              d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"
            />
          </svg>
        </button>
        <button class="delete_task" @click.prevent="changeTask('isActivePopupDelTask')">
          <svg aria-hidden="true" focusable="false" class="item-svg-trash" viewBox="0 0 448 512">
            <path
              d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
            />
          </svg>
        </button>
      </div>
      <div class="title">
        <span>Title:</span>
        <p class="text">{{task.title}}</p>
      </div>
      <div class="description">
        <p class="text">{{task.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    isActiveDrawer: {
      type: Boolean
    },
    isActivePopupDelTask: {
      type: Boolean
    },
    index: {
      type: Number
    }
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["changeFlagDrawer", "setChangeTask"]),
    changeTask(param) {
      if (param === "isActiveDrawer") {
        this.changeFlagDrawer("change");
      }
      this.$emit("update:" + param, true);
      this.setChangeTask(this.index);
    }
  }
};
</script>

<style scoped lang="scss">
.cont-item {
  width: 32%;
  min-height: 100px;
  position: relative;
  margin-bottom: 2%;
  border-radius: 3px;
  background-color: #ccf7cc;
  box-shadow: 0 2px 2px rgba(0, 90, 250, 0.05), 0 4px 4px rgba(0, 90, 250, 0.05),
    0 8px 8px rgba(0, 90, 250, 0.05), 0 16px 16px rgba(0, 90, 250, 0.05);
  color: forestgreen;
  padding: 5px;
  box-sizing: border-box;
  overflow: hidden;
}

.cont-item::before {
  counter-increment: items;
  content: counter(items);
}
.cont-item:nth-child(3n + 1) {
  order: 1;
  margin-right: 16px;
}
.cont-item:nth-child(3n + 2) {
  order: 2;
  margin-right: 16px;
}
.cont-item:nth-child(3n) {
  order: 3;
}
.item {
  display: flex;
  flex-direction: column;
}
.item-svg-pen,
.item-svg-trash {
  width: 16px;
  fill: forestgreen;
  &:hover {
    fill: rgb(126, 194, 240);
  }
}
.item-svg-pen {
  width: 18px;
}
.change_task,
.delete_task {
  background: transparent;
  border: none;
  cursor: pointer;
}
.cont_change-item {
  text-align: end;
  border-bottom: 1px solid forestgreen;
}
.title {
  padding-top: 5px;
  border-bottom: 1px solid forestgreen;
}
.description {
  padding-top: 5px;
}
.text {
  white-space: normal;
  color: rgb(15, 65, 129);
}
@media (max-width: 712px) {
  .cont-item:nth-child(2n + 1) {
    order: 1;
    margin-right: 16px;
  }
  .cont-item:nth-child(2n) {
    order: 2;
    margin-right: 0;
  }
  .cont-item {
    width: 49%;
  }
}
@media (max-width: 460px) {
  .cont-item:nth-child(n) {
    order: 1;
    margin-right: 0;
  }
  .cont-item {
    width: 100%;
  }
}
</style>