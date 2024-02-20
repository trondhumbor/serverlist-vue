import { defineStore } from 'pinia'
import { ServerInfo } from '@/composables/serverInfo';
import { is_bot } from '@/composables/isBot';

const LOCALSTORAGE_LIST = "list";
const LOCALSTORAGE_VISITED_SERVERS = "visited_servers";

export const useServerlistStore = defineStore({
  id: 'serverlist',
  state: () => ({
    list: JSON.parse(localStorage.getItem(LOCALSTORAGE_LIST))?.map(e => new ServerInfo(e, e.ip)) || [],
    visited_servers: JSON.parse(localStorage.getItem(LOCALSTORAGE_VISITED_SERVERS)) || []
  }),
  getters: {
    getServerList() {
      return this.list;
    },
    getVisitedServers() {
      return this.visited_servers;
    },
    getPlayerAmount() {
      return this.list.reduce((partialSum, a) => partialSum + a.players.length, 0);
    },
    getBotAmount() {
      return this.list.reduce((partialSum, a) => partialSum + a.players.filter(is_bot).length, 0);
    },
  },
  actions: {
    addServer(server) {
      this.list.push(server);
      localStorage.setItem(LOCALSTORAGE_LIST, JSON.stringify(this.list));
    },
    addVisitedServer(server) {
      this.visited_servers.push(server);
      localStorage.setItem(LOCALSTORAGE_VISITED_SERVERS, JSON.stringify(this.visited_servers));
    },
    reset() {
      this.list = [];
      localStorage.setItem(LOCALSTORAGE_LIST, JSON.stringify(this.list));

      this.visited_servers = [];
      localStorage.setItem(LOCALSTORAGE_VISITED_SERVERS, JSON.stringify(this.visited_servers));
    },
    hasVisitedServer(server) {
      return this.visited_servers.includes(server);
    }
  }
})
