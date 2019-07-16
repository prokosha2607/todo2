import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        mail: "",
        list: [],
        currentTask: {},
        indexChangedTask: "",
        flagDrawer: ""
    },
    getters: {
        getMail: state => {
            return state.mail;
        },
        getlist: state => {
            return state.list;
        }
    },
    actions: {
        loadTasks: async({ commit }, mail) => {
            try {
                const { data } = await axios.get('https://raysael.herokuapp.com/todo?author=' + mail);
                commit('loadTasks', data);
            } catch (e) {
                console.log(e);
            }
        },
        updateMail({ commit }, payload) {
            commit('updateMail', payload);
        },
        addTask: async({ commit }, newTask) => {
            try {
                const { data } = await axios.post("https://raysael.herokuapp.com/todo", newTask);
                commit('addTask', data);
            } catch (e) {
                console.log(e);
            }
        },
        setChangeTask({ commit }, index) {
            commit('setChangeTask', index);
        },
        changeTask: async({ commit }, payload) => {
            try {
                const { data } = await axios.patch("https://raysael.herokuapp.com/todo/" + payload.id, payload.data);
                commit('changeTask', data);
            } catch (e) {
                console.log(e);
            }
        },
        changeFlagDrawer({ commit }, payload) {
            commit('changeFlagDrawer', payload);
        },
        deleteTask: async(context) => {
            try {
                const id = context.state.currentTask['_id'];
                await axios.delete("https://raysael.herokuapp.com/todo/" + id, id);
                context.commit('deleteTask');
            } catch (e) {
                console.log(e);
            }
        },
        clearState({ commit }) {
            commit('clearState');
        },
        removeCurrentTask({ commit }) {
            commit('removeCurrentTask');
        }
    },
    mutations: {
        updateMail(state, payload) {
            state.mail = payload;
        },
        loadTasks(state, data) {
            state.list = data;
        },
        changeFlagDrawer(state, payload) {
            state.flagDrawer = payload;
        },
        addTask({ list }, data) {
            list.push(data);
        },
        setChangeTask(state, index) {
            state.currentTask = state.list[index];
            state.indexChangedTask = index;
        },
        changeTask(state, data) {
            state.list[state.indexChangedTask].title = data.title;
            state.list[state.indexChangedTask].description = data.description;
        },
        deleteTask(state) {
            state.list.splice(state.indexChangedTask, 1);
        },
        clearState(state) {
            state = {};
        },
        removeCurrentTask(state) {
            state.currentTask = {};
        }
    }
})