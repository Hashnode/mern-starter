import Path from 'path';
import Inert from "inert";

const manifest = {
  server:{},
  connections: [{
    port: 8000,
    routes: {
      files: {
        relativeTo: Path.resolve(__dirname, "../static")
      }
    }
  }],
  registrations: [{
    plugin: {
      register: "Inert",
      options: {}
    }
  }]
}

export default manifest;
