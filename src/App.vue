<template class="body">
  <MdContent>
    <div class="page-container">
      <div id="todo-items-list">
        <h1 class="md-title">My todos</h1>
      </div>

      <!-- Add ToDo -->
      <md-card-content class="add-item-form">
        <md-field>
          <md-input
            v-model="currentTodo"
            @keydown.enter="addTodo()"
            placeholder="Add a todo"
          ></md-input>
          <p data-v-6de59b62="" contenteditable="true" class="title"></p>
          <MdButton class="md-primary md-raised" @click.prevent="addTodo()">
            ADD
          </MdButton>
        </md-field>
      </md-card-content>

      <!-- Display list of added ToDos -->
      <md-card-content class="add-item-form">
        <ul
          list-style="none"
          display="inline-block"
          class="todos"
          list-style-type="none"
        >
          <li
            v-for="todo in filteredTodos"
            :key="todo.id"
            :class="{
              todo: true,
              editing: editedTodo === todo,
              completed: todo.completed,
            }"
            @dblclick="editTodo(todo)"
          >
            <!-- class="md-layout md-gutter md-alignment-center" -->
            <div class="display">{{ todo.label }}</div>
            <md-checkbox type="checkbox" v-model="todo.completed"></md-checkbox>
            <input type="checkbox" v-model="todo.completed" />
            <span
              v-on:click.stop.prevent="updateTodo(todo)"
              v-show="editedTodoID !== todo.id"
              :class="{ completed: todo.completed }"
            >
            </span>

            <input
              class="edit"
              v-model="todo.label"
              v-todo-html-focus="todo == editedTodo"
              @blur="cancelEdit(todo)"
              @keyup.esc="cancelEdit(todo)"
              @keyup.enter="doneEdit(todo)"
            />
            <!-- CTAs to edit or remove a ToDo -->
            <MdButton class="md-secondary" @click="editToDo(todo)">
              EDIT
            </MdButton>

            <MdButton class="md-primary" @click="removeTodo(todo)"
              ><!-- &times -->
              X
            </MdButton>
          </li>
        </ul>

        <md-field>
          <div class="items-left">{{ completed }} items left</div>
          <div class="static">
            <div
              @click="visibility = 'show all'"
              :class="{ 'items-all': true, selected: visibility === 'all' }"
            >
              All
            </div>
            <div
              @click="visibility = 'active'"
              :class="{
                'items-active': true,
                selected: visibility === 'active',
              }"
            >
              Active
            </div>
            <div
              @click="visibility = 'completed'"
              :class="{
                'items-completed': true,
                selected: visibility === 'completed',
              }"
            >
              Completed
            </div>
          </div>
          <div
            class="items-clear-completed"
            v-if="completed !== todos.length"
            @click="removeCompleted"
          >
            Clear completed
          </div>
        </md-field>
      </md-card-content>
    </div>
  </MdContent>
</template>



<script>
import Vue from "vue";

const filters = {
  all: function (todos) {
    return todos;
  },
  active: function (todos) {
    return todos.filter((todo) => !todo.completed);
  },
  completed: function (todos) {
    return todos.filter((todo) => todo.completed);
  },
};

export default Vue.extend({
  data() {
    return {
      todos: [],
      currentTodo: "",
      editedTodo: null,
      initialTodo: "",
      visibility: "all",
    };
  },
  methods: {
    addTodo() {
      if (this.currentTodo !== "") {
        this.todos.push({
          id: this.todos.length,
          label: this.currentTodo,
          completed: false,
        });
        //localStorage.setItem("todos", JSON.stringify(this.todos));
        this.currentTodo = "";
      }
    },

    removeTodo(todo) {
      var index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
      //localStorage.setItem("todos", JSON.stringify(this.todos));
    },

    removeCompleted() {
      // hide completed todos by filter
      this.todos = this.todos.filter((todo) => !todo.completed);
    },

    editTodo(todo) {
      console.log("editTodo");
      this.editedTodo = todo;
      this.initialTodo = todo.label;
    },

    doneEdit(todo) {
      // ends the editing mode when keyup.enter => how to support mobile ???
      this.editedTodo = null;
      if (!todo.label) {
        this.removeTodo(todo);
      }
    },

    cancelEdit(todo) {
      // aborts the editing mode when keyup.esc => how to support mobile ???
      console.log("cancelEdit");
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.label = this.originalEditedTodoValue;
    },

    completed() {
      // calculate completed todos for filtering
      let remaining = 0;
      this.todos.forEach((todo) => {
        if (!todo.completed) {
          remaining++;
        }
      });
      return remaining;
    },

    filteredTodos() {
      return filters[this.visibility](this.todos);
    },

    /*updateTodo(todo) {
      this.editedTodoID = todo.id;
    },*/

    /*saveUpdate() {
      this.editedTodoID = null;
    },*/
  },
  directives: {
    "todo-html-focus": function (element, binding) {
      if (binding.value) {
        element.focus();
      }
    },
  },
});
</script>

<style scoped>
.body {
  background-color: #f5f5f5;
  text-decoration: none;
  list-style-type: "none";
}
.display {
  display: inline-flex;
  text-align: left;
  justify-content: left;
  align-items: center;
}
.todo-item {
  margin-left: 20px;
}
.md-secondary {
  border: 1px;
  border-color: #448aff;
  text-emphasis-color: #448aff;
}
</style>
