import { useEffect, useRef, useState } from 'react'
import usStatesTopoData from './us-states.json'
import * as topojson from 'topojson-client'
import { Filter } from '@/types/filter'
import * as d3 from 'd3'

interface UsMapProps {
  setFilter: (newFilter: Filter) => void
  filter: Filter
  width: number
  height: number
}

const UsMap: React.FC<UsMapProps> = ({ filter, width, height, setFilter }) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [tooltip, setTooltip] = useState({
    opacity: 0,
    x: 0,
    y: 0,
    content: '',
  })

  useEffect(() => {
    if (!svgRef.current) return
    const svg = d3.select(svgRef.current).attr('width', width).attr('height', height)
    const map = svg.append('g').attr('id', 'map')
    const lines = svg.append('g').attr('id', 'lines')
    const geojson: any = topojson.feature(
      usStatesTopoData as any,
      usStatesTopoData.objects['states'] as any
    )
    const bbox = topojson.bbox(usStatesTopoData as any)
    const topoWidth = bbox[2] - bbox[0]
    const topoHeight = bbox[3] - bbox[1]
    const scaleBy = Math.min(width, height)
    const center = d3.geoCentroid(geojson as any)
    const projection = d3
      .geoMercator()
      .center(center)
      .scale(scaleBy)
      .translate([width / 2, height / 2])
    const path = d3.geoPath().projection(projection)
    const bounds = path.bounds(geojson)
    const widthScale = (bounds[1][0] - bounds[0][0]) / width
    const heightScale = (bounds[1][1] - bounds[0][1]) / height

    map
      .selectAll('path')
      .data(geojson.features)
      .enter()
      .append('path')
      .attr('class', (d: any) => `province c${d.properties.code}`)
      .attr('fill', (d: any) => {
        const name = d.properties.name
        if (filter.state && filter.state !== name) {
          return 'rgba(255,255,255,0.1)'
        }
        return 'rgba(255,255,255,0.5)'
      })
      .attr('stroke', 'rgba(0,0,0,0.2)')
      .attr('d', path as any)
      .on('click', (e, d: any) => {
        setFilter({
          ...filter,
          state: d.properties.name,
        })
      })
      .on('mousemove', (e, d: any) => {
        if (!d.properties.name) {
          setTooltip((prev) => ({ ...prev, opacity: 0 }))
          return
        }
        const [x, y] = d3.pointer(e)
        const proj = projection(d3.geoCentroid(d))!
        setTooltip({
          opacity: 1,
          x: proj[0],
          y: proj[1],
          content: `${d.properties.name}`,
        })
      })

    svg.on('mouseleave', () => {
      setTooltip((prev) => ({ ...prev, opacity: 0 }))
    })
    return () => {
      svg.selectAll('path').remove()
    }
  }, [width, height, filter.state])
  return (
    <div id="chart" className="relative">
      {!filter && (
        <div className="absolute text-body-small mt-8 opacity-50 text-center w-full">
          Blood Donation Heatmap
        </div>
      )}
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

      <svg ref={svgRef}></svg>
    </div>
  )
}

export default UsMap
