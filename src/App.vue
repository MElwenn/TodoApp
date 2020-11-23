<template class="body">
  <MdContent>
    <div class="page-container">
      <div id="todo-items-list">
        <h1 class="md-title">Todays todos</h1>
      </div>

      <md-card-content class="add-item-form">
        <md-field>
          <md-input
            v-model="currentTodo"
            @keydown.enter="addTodo()"
            placeholder="Add a todo"
          ></md-input>
          <p data-v-6de59b62="" contenteditable="true" class="title"></p>
          <MdButton class="md-primary md-raised" @click="addTodo()">
            ADD
          </MdButton>
        </md-field>
      </md-card-content>

      <!-- LESS MdDesign but working -->
      <md-card-content class="add-item-form">
        <ul
          list-style="none"
          display="inline-block"
          class="todos"
          list-style-type="none"
        >
          <li
            v-for="todo in todos"
            :key="todo.id"
            class="md-layout md-gutter md-alignment-center"
          >
            <div class="display">
              <input type="checkbox" />
              <span
                id="currentTodo"
                style="white-space: pre-line"
                conenteditable
                @input="updateTodo"
                class="todo-item"
              >
                {{ todo.label }}</span
              >
              <MdButton class="md-secondary" @click="removeTodo(todo)">
                Retype
              </MdButton>
              <MdButton class="md-primary" @click="removeTodo(todo)">
                X
              </MdButton>
            </div>
          </li>
        </ul>
      </md-card-content>
    </div>
  </MdContent>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      currentTodo: "",
    };
  },
  methods: {
    addTodo() {
      this.todos.push({
        id: this.todos.length,
        label: this.currentTodo,
        completed: false,
      });
      this.currentTodo = "";
      //add a completed property to the ToDo model
    },

    /*updateTodo() {
      this.todos.push({
        id: this.todos.length,
        label: this.currentTodo,
        completed: false,
      });
      this.currentTodo = "";
      //add a completed property to the ToDo model
    },*/

    removeTodo(todo) {
      var index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },

    updateTodo(todo) {
      var updateTodo = this.todos.indexOf(todo);
      this.currentTodo = updateTodo.target.innerText;
    },

    /*updateTodo: function(e) {
      this.currentTodo = e.target.innerHTML;
    }*/

    /*updateTodo(todo) {
      this.todos.push({id: this.todos.length, label: this.currentTodo, completed: false});
      this.currentTodo = 'updateTodo';
    }*/
  },
};
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
