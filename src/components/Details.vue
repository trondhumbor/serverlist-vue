<script>
import { useServerlistStore } from '@/stores/serverlist'
import { is_bot } from '@/composables/isBot';

export default {
  name: 'Details',
  components: {},
  setup() {
    const serverlistStore = useServerlistStore();
    return { serverlistStore, is_bot }
  },
  data() {
    return {
        server: this.serverlistStore.list.find(server => server.ip === this.$route.query.server_ip)
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<template>
  <main v-if="this.server == null">Server not in cache</main>
  <main v-if="this.server != null">
    <h4>Details for {{ this.server.ip }}</h4>

    <b>Host</b>
    <table class="table table-hover">
      <thead>
        <tr>
          <td>Key</td>
          <td>Value</td>
        </tr>
      </thead>
      <tbody v-for="value, key in this.server.host">
        <td>{{ key }}</td>
        <td>{{ value }}</td>
      </tbody>
    </table>

    <b>Status</b>
    <table class="table table-hover">
      <thead>
        <tr>
          <td>Key</td>
          <td>Value</td>
        </tr>
      </thead>
      <tbody v-for="value, key in this.server.status">
        <td>{{ key }}</td>
        <td>{{ value }}</td>
      </tbody>
    </table>

    <div v-if="this.server.map_rotation != null">
      <b>Map rotation</b>
      <table class="table table-hover">
        <thead>
          <tr>
            <td>Key</td>
            <td>Value</td>
          </tr>
        </thead>
        <tbody v-for="value, key in this.server.map_rotation">
          <td>{{ key }}</td>
          <td>{{ value }}</td>
        </tbody>
      </table>
    </div>

    <b>Players</b>
    <table class="table table-hover">
      <thead>
        <tr>
          <td>Name</td>
          <td>Ping</td>
          <td>Score</td>
          <td>Bot?</td>
        </tr>
      </thead>
      <tbody v-for="player in this.server.players">
        <td>{{ player.name }}</td>
        <td>{{ player.ping }}</td>
        <td>{{ player.score }}</td>
        <td>{{ is_bot(player) ? "🤖" : "🧑"}}</td>
      </tbody>
    </table>

  </main>
</template>

<style scoped>
main {
  padding: 1.5em;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}
</style>