import {
  IClutchPlugin,
  TClutchPluginMeta,
  TClutchPluginRickAndMortyOptions,
  TDataType,
} from "./types.js";
import packageJson from "../package.json" assert { type: "json" };
import DataConnector from "./data-connector/index.js";

class ClutchPluginRickAndMorty implements IClutchPlugin {
  private options: TClutchPluginRickAndMortyOptions;
  private meta = packageJson;
  public readonly dataConnector = new DataConnector(this);

  constructor(options: TClutchPluginRickAndMortyOptions) {
    if (!options.endpoint) throw new Error("Endpoint is required");

    this.init(options);
  }

  public init = async (options: TClutchPluginRickAndMortyOptions) => {
    this.options = options;
    console.debug(`${this.meta.name} v${this.meta.version} initialized`);
  };

  public getMeta = () => {
    return this.meta;
  };

  public getOptions = () => {
    return this.options;
  };
}

export default ClutchPluginRickAndMorty;

const instance = new ClutchPluginRickAndMorty({
  endpoint: "https://rickandmortyapi.com/api",
  cache: "default",
});

const item = await instance.dataConnector.getItem({
  dataTypeId: "character",
  itemId: "1",
});

console.log(item);
