import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ cacheDir: '/app/applet/tina/__generated__/.cache/1783893106826', url: 'http://localhost:4001/graphql', token: 'undefined', queries,  });
export default client;
  