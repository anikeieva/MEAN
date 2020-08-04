declare const M: {
  toast: Function
};

export class MaterializeService {
  static toast(message: string) {
    M.toast({ html: message });
  }
}
