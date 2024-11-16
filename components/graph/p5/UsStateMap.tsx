import { useEffect, useRef, useState } from 'react'
import * as topojson from 'topojson-client'
import { Filter } from '@/types/filter'
import { P5Canvas } from './BaseCanvas'
import * as d3 from 'd3'
import p5 from 'p5'

export class UsStateP5Map extends P5Canvas {
  constructor(
    p5: p5,
    private width: number,
    private height: number
  ) {
    super(p5)
  }

  render(): void {}

  mouseClick(): void {
    console.log('mouseClick')
  }

  mouseMove(): void {
    console.log('mouseMove')
  }
}
