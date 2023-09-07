import ClutchPluginRickAndMorty from "..";
import { TDataType, TGetItemProps, TGetItemsProps } from "../types.js";
import getQueryParams from "../helpers/get-query-params.js";
import firstUpper from "../helpers/first-upper.js";

class DataConnector {
  private plugin = undefined; // points to the plugin instance that created this data connector

  constructor(pluginInstance: ClutchPluginRickAndMorty) {
    this.plugin = pluginInstance;
  }

  public getItem = async ({ itemId, dataTypeId }: TGetItemProps) => {
    const res = await fetch(
      `${this.plugin.options.endpoint}/${dataTypeId}/${itemId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: this.plugin.options.cache,
      }
    );

    const json = await res.json();

    return json;
  };

  public getItems = async ({ dataTypeId, limit, page }: TGetItemsProps) => {
    const queryString = getQueryParams({
      pages: page,
      count: limit,
    });

    const res = await fetch(
      `${this.plugin.options.endpoint}/${dataTypeId}${queryString}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: this.plugin.options.cache,
      }
    );

    const json = await res.json();

    return json;
  };

  public getDataTypes = async () => {
    const res = await fetch(this.plugin.options.endpoint, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: this.plugin.options.cache,
    });

    const json = await res.json();

    const dataTypes: TDataType[] = Object.keys(json).map((key) => {
      return {
        slug: key,
        name: firstUpper(key),
      };
    });

    return dataTypes;
  };
}

export default DataConnector;
