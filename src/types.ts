export type TClutchPluginMeta = {
  name: string;
  description: string;
  version: string;
  repo: string;
};

export interface IClutchPlugin {
  getMeta: () => any;
  getOptions: () => any;
}

export type TClutchPluginRickAndMortyOptions = {
  endpoint: string;
  cache?: RequestCache;
};

export type TDataType = {
  slug: string;
  name: string;
};

export type TGetItemProps = {
  itemId: string;
  dataTypeId: string;
};

export type TGetItemsProps = {
  dataTypeId: string;
  limit?: number;
  page?: number;
};

export type TGetPageProps = {
  pageId: string;
};

export interface IDataConnector {
  getItem: ({ itemId, dataTypeId }: TGetItemProps) => Promise<any>;
  getItems: ({ dataTypeId, limit, page }: TGetItemsProps) => Promise<any>;
  getPages: () => Promise<any>;
  getPage: ({ pageId }: TGetPageProps) => Promise<any>;
  getDataTypes: () => Promise<TDataType[]>;
}
