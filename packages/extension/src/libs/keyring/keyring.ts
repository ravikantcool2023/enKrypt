import KeyRing from "@enkryptcom/keyring";
import { InternalStorageNamespace } from "@/types/provider";
import BrowserStorage from "../common/browser-storage";
import { KeyRecord, SignOptions } from "@enkryptcom/types";
export class KeyRingBase {
  #keyring: KeyRing;
  constructor() {
    const browserStorage = new BrowserStorage(InternalStorageNamespace.keyring);
    this.#keyring = new KeyRing(browserStorage);
  }
  sign(
    hexMessage: `0x${string}`,
    options: SignOptions
  ): Promise<`0x${string}`> {
    return this.#keyring
      .sign(hexMessage, options)
      .then((hex) => hex as `0x${string}`);
  }
  getKeysArray(): Promise<KeyRecord[]> {
    return this.#keyring.getKeysArray();
  }
  getKeysObject(): Promise<{ [key: string]: KeyRecord }> {
    return this.#keyring.getKeysObject();
  }
  isLocked(): boolean {
    return this.#keyring.isLocked();
  }
  unlock(password: string): Promise<void> {
    return this.#keyring.unlockMnemonic(password);
  }
}
export default KeyRingBase;