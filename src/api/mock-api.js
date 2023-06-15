import { MockPlane } from "./mock-plane.js";
import { airport, airports } from "./mock-cyyj.js";

export class MOCK_API {
  constructor() {
    console.log(`
      ==========================================
      =                                        =
      =        !!! USING MOCKED API !!!        =
      =                                        =
      ==========================================
    `);
    this.connected = true;
    this.plane = new MockPlane();
  }

  async setAutopilot(autopilot) {
    setTimeout(() => {
      autopilot.setParameters({
        MASTER: true,
        LVL: true,
        ALT: true,
        TER: true,
      });
    }, 10000);
  }

  async connect(options) {
    options.onConnect();
  }

  async get(...props) {
    // airports
    const first = props[0];
    if (props.length === 1 && first === `NEARBY_AIRPORTS`)
      return { NEARBY_AIRPORTS: airports };
    if (props.length === 1 && first.startsWith(`AIRPORT:`))
      return { [first]: airport };
    // everything else
    return this.plane.get(props);
  }

  async set(name, value) {
    this.plane.set(name.replace(/:.*/, ``), value);
  }

  async trigger(name, value) {
    this.plane.trigger(name, value);
  }

  async on({ name }, handler) {
    if (name === `Sim`) {
      setTimeout(() => handler(1), 1000);
    }
  }
}
