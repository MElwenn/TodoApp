<template>
  <div class="app-container">
    <md-toolbar style="background-color: #448aff">
      <h1 style="color: #f5f5f5">{{ title }}</h1>
    </md-toolbar>

    <!-- Add ToDo -->
    <md-field class="addTodo">
      <md-input
        v-model="currentTodo"
        @submit.prevent="addTodo"
        @keydown.enter.prevent="addTodo()"
        placeholder="Add a todo"
      >
      </md-input>
      <md-button
        style="background-color: #448aff"
        class="md-icon-button md-raised"
        v-on:click.prevent="addTodo"
      >
        <md-icon style="color: #f5f5f5">add</md-icon>
      </md-button>
    </md-field>

    <!-- Display list of added ToDos -->
    <md-list class="todos" v-if="showTodos()">
      <md-list-item class="todo-title">To edit click and type</md-list-item>
      <md-list-item class="list-item" v-for="todo in todos" :key="todo.id">
        <input type="checkbox" v-model="todo.completed" />
        <span
          v-on:click.stop.prevent="clickToEdit(todo)"
          v-show="editTodoId !== todo.id"
          :class="{ completed: todo.completed }"
        >
          {{ todo.label }}
        </span>

        <input
          v-on:click.stop.prevent
          v-model="todo.label"
          v-show="editTodoId == todo.id"
          v-on:keyup.enter="saveEdit"
        />

        <!-- CTAs to remove a ToDo -->
        <md-button
          class="md-icon-button md-raised"
          v-on:click.prevent="removeTodo(todo)"
        >
          X
        </md-button>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  name: "RegularToolbar",
  data() {
    let todos = localStorage.getItem("todos");
    if (todos) {
      todos = JSON.parse(todos);
    } else {
      todos = [];
    }
    return {
      title: "My ToDos",
      todos,
      currentTodo: "",
      editTodoId: null,
    };
  },
  methods: {
    showTodos() {
      return this.todos.length > 0;
    },
    addTodo() {
      if (this.currentTodo !== "") {
        this.todos.push({
          id: this.todos.length,
          label: this.currentTodo,
          completed: false,
        });
        localStorage.setItem("todos", JSON.stringify(this.todos));
        this.currentTodo = "";
      }
    },
    removeTodo(todo) {
      const index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    clickToEdit(todo) {
      this.editTodoId = todo.id;
    },
    saveEdit() {
      this.editTodoId = null;
    },
  },
};
</script>
 
<style scoped>
.header {
  background-color: #448aff;
  color: #f5f5f5;
}
.addTodo {
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 80%;
  height: 80px;
}
.todos {
  width: 60%;
  margin: 0 auto;
  padding-top: 0px;
  padding-bottom: 0px;
  border: 0.5px solid dark-grey;
}
.todo-title {
  background: #f5f5f5;
}
.list-item {
  border-top: 0.5px solid white;
}
.md-button {
  border: 1.5px solid white !important;
}
.md-icon-button {
  background-color: #448aff;
  color: #f5f5f5;
}
.completed {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>