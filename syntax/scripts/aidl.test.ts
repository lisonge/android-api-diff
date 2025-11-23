import { getAIDLStructList } from '../src';
import { getFileText } from './cache';

const baseUrl =
  'https://android.googlesource.com/platform/frameworks/base/+/main/core/java/';
const urls = [
  'android/app/IActivityTaskManager.aidl',
  'android/app/IActivityController.aidl',
  'android/app/IActivityManager.aidl',
  'android/os/IUserManager.aidl',
  'android/os/IPowerManager.aidl',
  'android/os/WorkSource.aidl',
  'android/os/VibrationEffect.aidl',
  'android/os/BluetoothBatteryStats.aidl',
  'android/os/CpuHeadroomParamsInternal.aidl',
  'android/os/DropBoxManager.aidl',
  'android/os/ExternalVibrationScale.aidl',
  'android/os/GpuHeadroomParamsInternal.aidl',
  'android/os/IBatteryPropertiesRegistrar.aidl',
  'android/os/IDeviceIdentifiersPolicyService.aidl',
  'android/os/IHintSession.aidl',
  'com/android/internal/app/IAppOpsStartedCallback.aidl',
  'com/android/internal/app/IBatteryStats.aidl',
  'com/android/internal/app/IHotwordRecognitionStatusCallback.aidl',
  'com/android/internal/app/IVoiceInteractor.aidl',
  'com/android/internal/telephony/ICarrierConfigChangeListener.aidl',
  'com/android/internal/telephony/ICarrierPrivilegesCallback.aidl',
  'com/android/internal/telephony/ITelephonyRegistry.aidl',
];

for (const name of urls) {
  console.log('Parsing', name);
  const input = await getFileText(baseUrl + name + '?format=TEXT');
  getAIDLStructList(input);
}
