class ServerInfo {

    host;
    players;
    status;

    ip;
    show;

    constructor(jsonServer, ip) {
        this.ip = ip;
        this.show = true;

        this.setServerResponse(jsonServer);
    }

    setServerResponse(jsonServer) {
        if (!this.#isKeysPresent(["host", "players", "status"], jsonServer)) {
            throw "Mandatory keys absent from json object";
        }

        /*
        When changing the JSON library used, there was unfortunately introduced a breaking
        change where the 'host' and 'status' object would be wrapped in an array of one element.
        It was quickly fixed, but due to the fact that this change was released, we need
        to handle both types of /info responses.
        */

        this.players = jsonServer.players;
        this.map_rotation = jsonServer.map_rotation;

        this.host = jsonServer.host;
        if (jsonServer.host instanceof Array) {
            if (jsonServer.host.length !== 1) {
                throw "Malformed 'host' object";
            }
            this.host = jsonServer.host[0];
        }

        this.status = jsonServer.status;
        if (jsonServer.status instanceof Array) {
            if (jsonServer.status.length !== 1) {
                throw "Malformed 'status' object";
            }
            this.status = jsonServer.status[0];
        }
    }

    #isKeysPresent(array, object) {
        for(let i = 0; i < array.length; i++) {
            if (!(array[i] in object)) {
                return false;
            }
        }
        return true;
    }
  }
  
  export { ServerInfo };