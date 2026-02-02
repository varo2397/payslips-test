import { Asset } from 'expo-asset';

export const loadAsset = async (assetModule: number): Promise<string> => {
  const asset = Asset.fromModule(assetModule);
  await asset.downloadAsync();

  if (!asset.localUri) {
    throw new Error('Failed to load asset');
  }

  return asset.localUri;
};

export const assetService = {
  loadAsset,
};
