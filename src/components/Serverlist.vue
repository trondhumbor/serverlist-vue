<script>
import Server from '@/components/Server.vue'
import { useServerlistStore } from '@/stores/serverlist'
import { remove_color_codes } from '@/composables/removeColorCodes';
import { is_bot } from '@/composables/isBot';
import { ServerFetcher } from '@/composables/serverFetcher';

export default {
  name: 'Serverlist',
  components: { Server },
  props: {},
  setup() {
    const serverlistStore = useServerlistStore();
    const toggles = {
      hostname: true,
      map: true,
      gamemode: true,
      mod: true,
      clients: true,
      ip: true,
      version: true
    };
    return { serverlistStore, toggles, is_bot }
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    hostname_comparator(a, b) {
      const nameA = remove_color_codes(a.status.sv_hostname)?.toUpperCase() || "";
      const nameB = remove_color_codes(b.status.sv_hostname)?.toUpperCase() || "";
      return this.comparator(nameA, nameB, this.toggles["hostname"]);
    },
    map_comparator(a, b) {
      const mapA = a.status.mapname?.toUpperCase() || "";
      const mapB = b.status.mapname?.toUpperCase() || "";
      return this.comparator(mapA, mapB, this.toggles["map"]);
    },
    gamemode_comparator(a, b) {
      const modeA = a.status.g_gametype?.toUpperCase() || "";
      const modeB = b.status.g_gametype?.toUpperCase() || "";
      return this.comparator(modeA, modeB, this.toggles["gamemode"]);
    },
    mod_comparator(a, b) {
      const modA = a.status.fs_game?.toUpperCase() || "";
      const modB = b.status.fs_game?.toUpperCase() || "";
      return this.comparator(modA, modB, this.toggles["mod"]);
    },
    clients_comparator(a, b) {
      const clientsA = a.players.length - a.players.filter(this.is_bot).length;
      const clientsB = b.players.length - b.players.filter(this.is_bot).length;
      return this.comparator(clientsA, clientsB, this.toggles["clients"]);
    },
    ip_comparator(a, b) {
      const ipA = a.ip;
      const ipB = b.ip;
      return this.comparator(ipA, ipB, this.toggles["ip"]);
    },
    version_comparator(a, b) {
      const versionA = a.status.shortversion || "";
      const versionB = b.status.shortversion || "";
      return this.comparator(versionA, versionB, this.toggles["version"]);
    },
    comparator(a, b, toggle=false) {
      if (a < b) {
        return toggle ? -1 : 1;
      }
      
      if (a > b) {
        return toggle ? 1: -1;
      }

      // equal
      return 0;
    }
  },
  mounted() {
    this.serverlistStore.list.forEach(s => s.show = true);
    new ServerFetcher(this.serverlistStore).update_servers();
  },
}

</script>

<template>
  <header>
    <div>Servers: {{ this.serverlistStore.list.length }} Visited servers: {{ this.serverlistStore.visited_servers.length }} Players: {{
      this.serverlistStore.list.reduce((partialSum, a) => partialSum + a.players.length, 0)
    }} <div title="Number of bots">({{
      this.serverlistStore.list.reduce((partialSum, a) => partialSum + a.players.filter(this.is_bot).length, 0)
    }} bots)</div>
    </div>
    
    <input type="text" placeholder="Search for hostname" @input="event => {
      this.serverlistStore.list
        .forEach(server => server.show = server.status.sv_hostname.toUpperCase().includes(event.target.value.toUpperCase()));
    } ">
    
    <input type="text" placeholder="Search for player" @input="event => {
      this.serverlistStore.list
        .forEach(server => server.show = server.players.some(element =>
          element.name.toUpperCase().includes(event.target.value.toUpperCase())
        ));
    } ">
  </header>
  <table class="table table-hover">
    <thead>
      <tr>
        <td @click="this.serverlistStore.list.sort(this.hostname_comparator); this.toggles['hostname'] = !this.toggles['hostname']" class="hostname">Hostname</td>
        <td @click="this.serverlistStore.list.sort(this.map_comparator); this.toggles['map'] = !this.toggles['map']" class="map">Map</td>
        <td @click="this.serverlistStore.list.sort(this.gamemode_comparator); this.toggles['gamemode'] = !this.toggles['gamemode']" class="gamemode">Gamemode</td>
        <td @click="this.serverlistStore.list.sort(this.mod_comparator); this.toggles['mod'] = !this.toggles['mod']" class="mod">Mod</td>
        <td @click="this.serverlistStore.list.sort(this.clients_comparator); this.toggles['clients'] = !this.toggles['clients']" class="clients">Clients</td>
        <td @click="this.serverlistStore.list.sort(this.ip_comparator); this.toggles['ip'] = !this.toggles['ip']" class="ip">IP:Port</td>
        <td @click="this.serverlistStore.list.sort(this.version_comparator); this.toggles['version'] = !this.toggles['version']" class="version">Version</td>
        <td class="details">Details</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="server in this.serverlistStore.list.filter(e => e.show)">
        <Server :server_info="server"></Server>
      </tr>
    </tbody>
  </table>
</template>

<style>
@import '@/assets/bootstrap.min.css';
main {
  margin-left: auto;
  margin-right: auto;
  margin-top: 3em;
  margin-bottom: 3em;
  min-width: 1240px;
  width: 90%;
  border: solid 1px;
  border-radius: 10px;
}

header {
  margin: 0.5em;
}

header div {
  display: inline-block;
}

header input {
  margin: 0.5em;
}

table {
  table-layout: fixed;
}

td {
  overflow-wrap: anywhere;
}

.hostname {
  width: 30%;
}

.map {
  width: 10%;
}

.gamemode {
  width: 10%;
}

.mod {
  width: 12%;
}

.clients {
  width: 10%;
}

.ip {
  width: 15%;
}

.version {
  width: 8%;
}

.details {
  width: 10%;
}
</style>
