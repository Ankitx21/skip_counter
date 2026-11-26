// Audio worklet: sends the RMS energy of the filtered mic signal every ~10 ms.
class P extends AudioWorkletProcessor {
  constructor() { super(); this.a = 0; this.n = 0; this.b = 0; }
  process(i) {
    const c = i[0] && i[0][0];
    if (c) {
      for (let k = 0; k < c.length; k++) this.a += c[k] * c[k];
      this.n += c.length;
      if (++this.b >= 4) {
        this.port.postMessage([currentTime, Math.sqrt(this.a / this.n)]);
        this.a = 0; this.n = 0; this.b = 0;
      }
    }
    return true;
  }
}
registerProcessor('rms-proc', P);
