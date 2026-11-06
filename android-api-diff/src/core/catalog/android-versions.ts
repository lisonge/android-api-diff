import type { AndroidVersionInfo } from '../model/types.ts';

export const emptyArray: any[] = [];
Object.freeze(emptyArray);

export const androidVersionInfos: AndroidVersionInfo[] = [
  {
    version: '8',
    alias: 'O',
    apiVersion: 26,
  },
  {
    version: '8.1',
    alias: 'O_MR1',
    apiVersion: 27,
  },
  {
    version: '9',
    alias: 'P',
    apiVersion: 28,
  },
  {
    version: '10',
    alias: 'Q',
    apiVersion: 29,
  },
  {
    version: '11',
    alias: 'R',
    apiVersion: 30,
  },
  {
    version: '12',
    alias: 'S',
    apiVersion: 31,
  },
  {
    version: '12.1',
    alias: 'S_V2',
    apiVersion: 32,
  },
  {
    version: '13',
    alias: 'TIRAMISU',
    apiVersion: 33,
  },
  {
    version: '14',
    alias: 'UPSIDE_DOWN_CAKE',
    apiVersion: 34,
  },
  {
    version: '15',
    alias: 'VANILLA_ICE_CREAM',
    apiVersion: 35,
  },
  {
    version: '16',
    alias: 'BAKLAVA',
    apiVersion: 36,
  },
  {
    version: '17',
    alias: 'CINNAMON_BUN',
    apiVersion: 37,
  },
];

export const DEFAULT_MIN_SDK = androidVersionInfos[0].apiVersion;

export const androidApiVersionList = androidVersionInfos.map(
  ({ apiVersion }) => apiVersion,
);
