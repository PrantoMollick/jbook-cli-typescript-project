import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

esbuild.initialize({
  worker: true,
  wasmURL: "/esbuild.wasm"
});

const Bundle = async (rawCode: string) => {
  try {
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        global: "window"
      }
    });
    return {
      code: result.outputFiles[0].text,
      err: ""
    };
  } catch (error: any) {
    return {
      code: "",
      err: error.message
    };
  }
};

export default Bundle;
