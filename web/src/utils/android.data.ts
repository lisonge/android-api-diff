const androidAliasMap: Record<string, string> = {
  '8': 'O',
  '8.1': 'O_MR1',
  '9': 'P',
  '10': 'Q',
  '11': 'R',
  '12': 'S',
  '12.1': 'S_V2',
  '13': 'TIRAMISU',
  '14': 'UPSIDE_DOWN_CAKE',
  '15': 'VANILLA_ICE_CREAM',
  '16': 'BAKLAVA',
};

const r = await fetch(
  'https://android.googlesource.com/platform/frameworks/base/+refs/tags/?format=JSON',
);

const rawAllTags = Object.keys(JSON.parse((await r.text()).substring(4)));
const tagReg = /^android-\d+\.\d+\.\d+_r\d+$/;
const versionTags: Record<string, string[]> = {};
rawAllTags
  .filter((v) => tagReg.test(v))
  .forEach((v) => {
    const vserion = v
      .split('.')
      .slice(0, 2)
      .join('.')
      .replace('android-', '')
      .replace('.0', '');
    let tempList = versionTags[vserion];
    if (!tempList) {
      tempList = [];
      versionTags[vserion] = tempList;
    }
    tempList.push(v);
  });
const androidVersionList = Object.entries(versionTags)
  .map<AndroidVersionItem>(([version, tags]) => {
    tags.sort((a, b) => {
      const ra = Number(a.split('_r')[1]);
      const rb = Number(b.split('_r')[1]);
      return ra - rb;
    });
    return {
      version,
      tags,
      alias: androidAliasMap[version],
    };
  })
  .filter((v) => Number(v.version) >= 8.0)
  .sort((a, b) => Number(a.version) - Number(b.version));

export default androidVersionList;
