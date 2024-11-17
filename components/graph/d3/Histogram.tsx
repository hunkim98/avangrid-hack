import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as d3 from 'd3'

interface LabelBarGraphInterface {
  data: Array<[string, number]>
  width: number
  height: number
  margin: {
    top: number
    right: number
    bottom: number
    left: number
  }
  graphId: string
}

const LabelBarGraph: React.FC<LabelBarGraphInterface> = ({
  data,
  width,
  height,
  margin,
  graphId,
}) => {
  const svgContainerRef = useRef<d3.Selection<SVGSVGElement, unknown, HTMLElement, any>>()
  const svgGRef = useRef<d3.Selection<SVGGElement, unknown, HTMLElement, any>>()
  const clipPathRectRef = useRef<d3.Selection<SVGRectElement, unknown, HTMLElement, any>>()
  const xAxisGroupRef = useRef<d3.Selection<SVGGElement, unknown, HTMLElement, any>>()
  const yAxisGroupRef = useRef<d3.Selection<SVGGElement, unknown, HTMLElement, any>>()
  const barGroupRef = useRef<d3.Selection<SVGGElement, unknown, HTMLElement, any>>()
  const behindGroupRef = useRef<d3.Selection<SVGGElement, unknown, HTMLElement, any>>()
  const staticBehindGroupRef = useRef<d3.Selection<SVGGElement, unknown, HTMLElement, any>>()
  const behindGroupRectRef = useRef<d3.Selection<SVGRectElement, unknown, HTMLElement, any>>()
  const staticBehindGroupRectRef = useRef<d3.Selection<SVGRectElement, unknown, HTMLElement, any>>()

  const isRendered = useRef(false)

  const [tooltip, setTooltip] = useState({
    opacity: 0,
    content: '',
    x: 0,
    y: 0,
  })
  const xRef = useRef<d3.ScaleBand<string>>()
  const yRef = useRef<d3.ScaleLinear<number, number>>()

  const renderGraph = useCallback(() => {
    let maxYValue = d3.max(data, (d) => d[1]) as number
    const minYValue = d3.min(data, (d) => d[1]) as number

    const digitCountInY = maxYValue.toString().length
    const fixedMargin = { ...margin }
    if (digitCountInY > 3) {
      fixedMargin.left += 5 * (digitCountInY - 4)
    }

    const svgWidth = width - fixedMargin.left - fixedMargin.right
    const svgHeight = height - fixedMargin.top - fixedMargin.bottom

    if (svgWidth <= 0 || svgHeight <= 0) return

    if (svgContainerRef.current) {
      svgContainerRef.current.attr('width', width).attr('height', height)
    } else {
      svgContainerRef.current = d3
        .select(`#${graphId}`)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
    }

    const svgContainer = svgContainerRef.current
    const svg = svgGRef.current
      ? svgGRef.current
      : (svgGRef.current = svgContainer
          .append('g')
          .attr('transform', `translate(${fixedMargin.left},${fixedMargin.top})`))

    if (clipPathRectRef.current) {
      clipPathRectRef.current.attr('width', svgWidth).attr('height', svgHeight) // update the clip size
    } else {
      clipPathRectRef.current = svg
        .append('clipPath')
        .attr('id', `clip-area-${graphId}`)
        .append('rect')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
    }

    const barGroup = barGroupRef.current
      ? barGroupRef.current
      : (barGroupRef.current = svg.append('g').attr('clip-path', `url(#clip-area-${graphId})`))
          .append('g')
          .attr('class', 'bar-group')

    const xAxisGroup = xAxisGroupRef.current
      ? xAxisGroupRef.current
      : (xAxisGroupRef.current = svg.append('g').attr('class', 'x-axis'))

    const yAxisGroup = yAxisGroupRef.current
      ? yAxisGroupRef.current
      : (yAxisGroupRef.current = svg.append('g').attr('class', 'y-axis'))

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d[0]))
      .range([0, svgWidth])
      .padding(0.3)
    xRef.current = xScale

    // let yScale: d3.ScaleLinear<number, number>;
    if (maxYValue < 0) {
      maxYValue = 100
    }
    const yScale = d3
      .scaleLinear()
      .domain([minYValue, maxYValue * 1.2])
      .range([svgHeight, 0])
    yRef.current = yScale

    const behindGroup = behindGroupRef.current
      ? behindGroupRef.current
      : (behindGroupRef.current = svg
          .append('g')
          .attr('clip-path', `url(#clip-area-${graphId})`)
          .append('g')
          .attr('class', 'behindGroup'))

    const staticBehindGroup = staticBehindGroupRef.current
      ? staticBehindGroupRef.current
      : (staticBehindGroupRef.current = svg
          .append('g')
          .attr('clip-path', `url(#clip-area-${graphId})`)
          .append('g')
          .attr('class', 'static-behindGroup'))

    // xAxisGroup
    //   .attr('transform', `translate(0,${svgHeight})`)
    //   .style('opacity', 0.5)
    //   .call(d3.axisBottom(xScale))

    yAxisGroup.attr('transform', `translate(0,0)`).style('opacity', 0.5).call(d3.axisLeft(yScale))

    // barGroup.selectAll("rect").remove();
    const bars = barGroup
      .selectAll(`rect.base`)
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d[0]) as number)
      // .attr('y', (d) => (d[1] >= 0 ? yScale(d[1]) : yScale(0))) // Top for positive, base for negative
      // .attr('height', (d) => Math.abs(yScale(d[1]) - yScale(0))) // Height based on value
      .attr('width', xScale.bandwidth())
      .attr('fill', (d) => (d[1] >= 0 ? 'steelblue' : 'crimson')) // Different colors
    // add horizontal line through 0 y
    const zeroLine = barGroup.selectAll('line.zero').data([0])
    zeroLine
      .enter()
      .append('line')
      .attr('class', 'zero')
      .merge(zeroLine as any)
      .attr('x1', 0)
      .attr('x2', svgWidth)
      .attr('y1', (d) => yScale(d) as number)
      .attr('y2', (d) => yScale(d) as number)
      .attr('stroke', 'rgba(0,0,0,0.2)')

    bars
      .enter()
      .append('rect')
      .attr('class', 'base')
      .merge(bars as any)
      .attr('x', (d) => xScale(d[0]) as number)
      .attr('width', xScale.bandwidth())
      .attr('fill', (d) => (d[1] >= 0 ? '#CEEAAE' : '#FFB6C1'))
      .attr('y', (d) => (d[1] >= 0 ? yScale(d[1]) : yScale(0)))
      .attr('height', (d) => Math.abs(yScale(d[1]) - yScale(0)))
      .transition()
      .duration(() => (!isRendered.current ? 0 : 500))
      .attr('y', (d) => (d[1] >= 0 ? yScale(d[1]) : yScale(0)))
      .attr('height', (d) => Math.abs(yScale(d[1]) - yScale(0)))
    const xTicks = xAxisGroup.selectAll('.tick text')
    // add new line to the text that has a space
    xTicks.each(function (d, i) {
      const text = d3.select(this)
      const words = text.text().split(' ')
      text.text('')
      words.forEach((word, i) => {
        text
          .append('tspan')
          .attr('x', 0)
          .attr('y', 15)
          .attr('dy', `${i * 1.2}em`)
          .text(word)
      })
    })

    const behindGroupRectWidth = xScale.bandwidth() + xScale.paddingInner() * xScale.step()

    const behindGroupRect = (behindGroupRectRef.current = behindGroup
      .append('rect')
      .attr('fill', 'none')
      .attr('width', behindGroupRectWidth)
      .attr('height', svgHeight))
      .attr('fill', 'rgba(0,0,0,0.1)')
      .style('opacity', 0)
      .style('transition', 'opacity 0.3s ease')

    ;(staticBehindGroupRectRef.current = staticBehindGroup
      .append('rect')
      .attr('fill', 'none')
      .attr('width', behindGroupRectWidth)
      .attr('height', svgHeight))
      .attr('fill', 'rgba(0,0,0,0.1)')
      .style('opacity', 0)
      .style('transition', 'opacity 0.3s ease')

    staticBehindGroup.selectAll('rect').attr('opacity', 0)

    behindGroup.selectAll('rect').style('opacity', 0)

    svgContainer
      .on('mouseover', function (event) {
        const coords = d3.pointer(event)
        const x = coords[0] - fixedMargin.left
        const y = coords[1]
        let absoluteX = x
        let absoluteY = y
        const eachBand = xScale.step()
        const index = Math.floor(x / eachBand)
        if (index >= 0 && index < data.length) {
          setTooltip((prev) => ({
            ...prev,
            content: `${data[index][0]}: ${data[index][1]}`,
            opacity: 0.5,
          }))
          const x = xScale(data[index][0]) as number
          const y = yScale(data[index][1]) as number
          absoluteX = x + fixedMargin.left
          absoluteY = y + fixedMargin.top
          behindGroupRect.attr('x', x - (xScale.paddingInner() * xScale.step()) / 2).attr('y', 0)
          behindGroupRect.style('opacity', 1)
          setTooltip((prev) => ({
            ...prev,
            x: absoluteX,
            y: absoluteY,
          }))
        }
      })

      .on('mouseleave', function () {
        behindGroupRect.style('opacity', 0)
        setTooltip((prev) => ({
          ...prev,
          opacity: 0,
        }))
      })
  }, [data, width, height, margin, graphId])

  useEffect(() => {
    renderGraph()
  }, [renderGraph, graphId])

  return (
    <>
      <div
        id={graphId}
        style={{
          height: height,
        }}
      >
        <pre
          className="tooltip"
          style={{
            zIndex: 100,
            opacity: tooltip.opacity,
            position: 'absolute',
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translate(-50%,0%)',
            backgroundColor: 'white',
            border: '1px solid rgba(0,0,0,0.1)',
            padding: '8px',
            pointerEvents: 'none', // Makes the tooltip not block mouse events
            transition: 'opacity 0.3s ease, left 0.2s ease, top 0.2s ease', // Smooth transitions
          }}
        >
          {tooltip.content}
        </pre>
      </div>
    </>
  )
}

export default LabelBarGraph
