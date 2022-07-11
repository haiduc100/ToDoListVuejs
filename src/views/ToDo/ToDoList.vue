<template>
  <v-container style="margin: 100px auto">
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-toolbar elevation="0">
            <v-card-text class="text-h5"> Update To Do </v-card-text>
            <v-spacer></v-spacer>
            <v-btn icon @click="close">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-text-field v-model="updateItem" solo dense> </v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="close"> Close </v-btn>
            <v-btn color="green darken-1" text @click="save"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-card class="mx-auto" max-width="600">
      <v-row class="py-2 mx-auto">
        <v-col cols="12" sm="10">
          <v-text-field
            v-model.trim="todo"
            label="What are you working on?"
            outlined
            @keypress.enter="createTodo"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="1">
          <v-btn fab dark color="indigo" @click="createTodo">
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="mx-auto">
        <v-col cols="12" sm="4">
          <div class="text-h4 success--text pl-4">
            Tasks: <span>{{ task }}</span>
          </div>
        </v-col>
        <v-spacer></v-spacer>
        <v-progress-circular
          :value="progress"
          class="mr-10 mt-2"
        ></v-progress-circular>
      </v-row>
      <v-list>
        <v-list-item-group v-model="model" active-class="border" color="indigo">
          <v-list-item v-if="list.length <= 0"> Empty list </v-list-item>
          <v-list-item v-for="(item, i) in list" :key="i">
            <v-list-item-content>
              <v-list-item-title :class="{ doneClass: item.isComplete }">
                {{ i + 1 }}. {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon @click="done(i)" class="mr-4" color="green"
                >mdi-checkbox-marked-circle-outline</v-icon
              >
            </v-list-item-icon>
            <v-list-item-icon>
              <v-icon @click="update(i)" color="orange"
                >mdi-pencil-circle</v-icon
              >
            </v-list-item-icon>
            <v-list-item-icon>
              <v-icon @click="del(i)" color="red">mdi-close-circle</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <div class="text-center py-2">
        <!-- <span>You have {{ task }} task, </span> -->
        <span class="red--text"
          >You have {{ notDoneTask }} task need to do,
        </span>
        <span class="green--text">You have {{ doneTask }} task is done</span>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ToDoListVue",

  data() {
    return {
      task: 2,
      todo: "",
      list: [
        {
          isComplete: false,
          text: "Play video game",
        },
        {
          isComplete: false,

          text: "Netflix and chill",
        },
      ],
      model: 1,
      dialog: false,
      updateItem: "",
      updateId: null,
    };
  },
  computed: {
    progress() {
      return (this.doneTask / this.list.length) * 100;
    },
    doneTask() {
      return this.list.filter((t) => t.isComplete == true).length;
    },
    notDoneTask() {
      return this.list.filter((t) => t.isComplete == false).length;
    },
  },
  methods: {
    createTodo() {
      if (!this.todo) {
        return;
      }
      this.list.push({
        isComplete: false,

        text: this.todo,
      });
      this.task = this.list.length;
      this.todo = "";
    },

    del(i) {
      this.list.splice(i, 1);
      this.task = this.list.length;
    },
    update(i) {
      this.dialog = true;
      this.updateId = i;
      this.updateItem = this.list[i].text;
    },
    save() {
      this.list[this.updateId].text = this.updateItem;
      this.dialog = false;
    },
    close() {
      this.dialog = false;
    },
    done(i) {
      this.list[i].isComplete = !this.list[i].isComplete;
    },
  },
};
</script>

<style lang="scss" scoped>
.doneClass {
  text-decoration: line-through;
}
</style>
