export const StorageKey = {
  hasPasscode: 'hasPasscode',
  isLocalAuthentication: 'isLocalAuthentication',
} as const;

export type StorageKeyType = {
  [key: string]: any;
};

export const SecureStorageKey = {
  passcode: 'passcode',
} as const;

export type SecureStorageKeyType = {
  [key: string]: any;
};
