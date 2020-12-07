<template>
  <div>
    <b-list-group>
      <h2 class="pb-3 mt-4 mb-3 border-bottom">Your Notes</h2>
      <router-link to="/notes">
        <b-list-group-item action class="py-3 text-nowrap text-truncate">
          <span class="ml-2 font-weight-bold">Create a new note</span>
        </b-list-group-item>
      </router-link>
      <router-link
        v-for="(note, idx) in this.notes"
        :key="idx"
        :to="`/notes/${note.noteid}`"
      >
        <b-list-group-item action>
          <span class="ml-2 font-weight-bold">{{ note.content.trim().split("\n") [0] }} </span>
          <br />
          <span> Created on: {{new Date(note.createdAt).toLocaleString()}} </span>
        </b-list-group-item>
      </router-link>
    </b-list-group>
  </div>
</template>

<script>
export default {
  props: ["notes"],
};
</script>

<style scoped></style>
