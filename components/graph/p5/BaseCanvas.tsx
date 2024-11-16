import p5 from 'p5'

export abstract class P5Canvas {
  p5: p5

  constructor(p5: p5) {
    this.p5 = p5
  }

  abstract render(): void

  abstract mouseClick(): void

  abstract mouseMove(): void
}
