import { useServerlistStore } from '@/stores/serverlist'
import { ServerInfo } from '@/composables/serverInfo';

const base_servers = ["213.202.223.46:28960","46.8.158.151:28963","198.23.145.74:28960","149.255.1.29:30005","78.47.192.49:28960","78.47.192.49:28962","54.37.244.201:28966","147.135.1.102:28966","54.37.244.201:28965","191.252.219.207:28960","147.135.1.102:28967","104.194.10.34:28961","194.50.218.17:50907","149.202.89.208:28961","111.229.30.206:28960","213.225.76.61:28962","3.225.225.37:28963","129.213.20.177:28960","104.194.10.34:28963","2.83.17.76:28994","51.161.192.200:28974","209.145.60.48:28960","104.194.10.34:28960","149.255.1.29:28961","149.255.1.29:28962","149.255.1.29:28963","213.225.76.61:28964","138.201.60.54:28999","46.8.158.151:28962","162.55.5.105:7501","162.55.5.105:7502","162.55.5.105:7503","162.55.5.105:7504","82.99.60.20:28960","54.37.244.193:28981","54.37.244.193:28980","54.37.244.193:28982","46.4.26.120:28979","2.83.17.76:28995","92.244.248.82:28960","46.8.158.151:28961","152.208.9.24:28960","5.252.24.78:28960","110.41.188.184:28964","192.95.55.248:29966","192.95.55.248:29965","116.202.156.245:28960","92.244.248.82:28965","162.210.6.103:28964","162.210.6.103:28961","162.210.6.103:28965","162.210.6.103:28968","162.210.6.103:28967","162.210.6.103:28963","162.210.6.103:28962","162.210.6.103:28966","162.210.6.103:28970","45.88.231.136:28960","45.88.231.136:28962","45.88.231.136:28961","45.88.231.136:28963","46.8.158.151:25960","45.88.231.136:28964","194.50.218.17:50901","194.50.218.17:50900","194.50.218.17:50902","51.161.192.200:28964","194.50.218.17:50905","194.50.218.17:50906","146.59.235.200:28960","91.208.92.221:28963","91.208.92.221:28962","84.104.187.35:28960","150.158.9.203:28965","88.99.153.147:60212","2.91.176.89:28966","192.171.69.100:28960","194.50.218.17:50909","51.89.142.127:27990","149.202.89.208:28960","51.161.192.200:28991","82.65.129.166:38962","51.161.192.200:27961","47.207.27.89:28961","8.222.202.233:28960","109.49.138.195:28960","194.50.218.17:50910","2.91.176.89:28967","124.71.145.85:28961","46.8.158.151:28960","51.161.192.200:28962","5.161.140.164:28960","46.8.158.151:28965","82.65.129.166:38961","54.37.244.201:28964","147.135.1.102:28962","202.61.237.242:28965","213.225.76.61:28961","51.161.192.200:27962","194.50.218.17:50908","192.248.173.121:28960","124.71.145.85:28960","202.61.237.242:28970","86.95.156.223:28960","31.126.3.223:28960","147.135.1.102:28960","89.117.74.168:28965","147.135.1.102:28965","5.161.107.64:28961","54.37.244.201:28963","213.225.76.61:28963","150.158.78.237:28961","5.161.107.64:28962","147.135.1.102:28964","147.135.1.102:28963","150.158.78.237:28960","54.37.244.201:28967","54.37.244.201:28962","147.135.1.102:28961","154.38.167.124:28963","213.136.90.216:28960","5.161.107.64:28960","54.37.244.201:28961","54.37.244.201:28960","185.229.237.198:28964","51.89.142.126:26990","51.161.192.200:27960","51.161.192.200:27963","185.151.241.174:28961","74.91.124.245:28960","194.50.218.17:50904","194.50.218.17:50903","194.50.218.17:50913","194.50.218.17:50911","194.50.218.17:50912","200.133.133.66:28960","45.143.196.156:28960","85.197.59.128:27060","208.104.96.250:28962","208.104.96.250:28963","82.9.169.43:28201","82.9.169.43:28200","77.93.50.166:1212","77.93.50.166:1414","77.93.50.166:1515","94.241.227.190:28965","94.241.227.190:28961","94.241.227.190:28967","94.241.227.190:28963","94.241.227.190:28969","79.231.164.242:28960","88.99.153.147:28960","88.99.153.147:28990","176.185.144.201:28960","131.196.196.198:18028","46.4.26.120:28982","46.4.26.120:28983","46.4.26.120:28986","46.4.26.120:28988","46.4.26.120:28989","158.140.235.56:23095","158.140.235.56:23093","158.140.235.56:23096","154.38.167.124:28962","185.229.237.198:28963","185.151.241.174:28960","109.254.30.178:28971","91.184.169.134:28960","192.223.26.211:28960","131.221.66.85:28961","185.229.237.188:28962","185.229.237.188:28961","185.229.237.188:28964","185.229.237.188:28963","131.221.66.85:28963","185.229.237.188:28960","45.177.8.103:28960","131.221.66.85:28964","99.64.120.254:28963","86.122.65.49:28960","131.221.66.85:28962"];

class ServerFetcher {
    serverlistStore;

    constructor() {
        this.serverlistStore = useServerlistStore();
    }

    fetch_server_list(servers) {
        servers.forEach(element => {
          if (this.serverlistStore.hasVisitedServer(element)) {
            return;
          }

          if (!this.isValidIpAddress(element.split(":")[0])) {
            return;
          }
  
          this.fetch_server_info(element);
          this.serverlistStore.addVisitedServer(element);
  
          fetch(`http://${element}/serverlist`)
            .then(response => response.json())
            .then(list => this.fetch_server_list(list.filter(item => !this.serverlistStore.hasVisitedServer(item))));
        });
    }
    
    fetch_server_info(server) {
        fetch(`http://${server}/info`)
            .then(response => response.json())
            .then(json => new ServerInfo(json, server))
            .then(data => this.serverlistStore.addServer(data));
    }

    update_servers() {
        const base = base_servers.concat(this.serverlistStore.getServerList.map(server => server.ip));
        this.serverlistStore.reset();

        this.fetch_server_list(base);
    }

    isValidIpAddress(address) {
        // check valid IP
        if (!/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/g.test(address)) {
            return false;
        }

        // if local subnet, we count it as invalid
        return this.#isAllowedSubnet(address);
    }

    #isAllowedSubnet(address) {
        let components = address.split(".").map(Number);

        if (components.length != 4) {
            return false;
        }

        // 10.x.x.x
        if (components[0] == 10) {
            return false;
        }

        // 172.16.x.x - 172.31.x.x
        if (components[0] == 172 && (components[1] >= 16 && components[1] <= 31)) {
            return false;
        }

        // 192.168.x.x
        if (components[0] == 192 && components[1] == 168) {
            return false;
        }

        // localhost
        if (address.toLowerCase() === "127.0.0.1" || address.toLowerCase() === "localhost") {
            return false;
        }

        return true;
    }
}

export { ServerFetcher }