<script>
import { RouterLink } from 'vue-router';
import { remove_color_codes } from '@/composables/removeColorCodes';
import { is_bot } from '@/composables/isBot';
import { ServerInfo } from '@/composables/serverInfo'

export default {
  name: 'Server',
  components: {},
  props: {
      server_info: ServerInfo
  },
  setup() {
    return {is_bot, remove_color_codes}
  },
  data() {
    return {}
  },
  created() {},
  methods: {
  },
  computed: {
    clientAmount() {
      return this.server_info.players.length;
    },
    botAmount() {
      return this.server_info.players.filter(this.is_bot).length;
    },
    playerAmount() {
      return this.clientAmount - this.botAmount;
    }
  },
  mounted() {
  },
}
</script>

<template>
  <td>{{ remove_color_codes(server_info.status.sv_hostname) }}</td>
  <td>{{ server_info.status.mapname }}</td>
  <td>{{ server_info.status.g_gametype }}</td>
  <td>{{ server_info.status.fs_game }}</td>
  <td>{{ playerAmount }} / {{ server_info.status.sv_maxclients }} (<span title="Number of bots">{{
    botAmount }}</span>)</td>
  <td>{{ server_info.ip }}</td>
  <td>{{ server_info.status.shortversion }}</td>
  <td><RouterLink :to="{ name: 'details', query: { server_ip: server_info.ip} }">Details</RouterLink></td>
</template>
