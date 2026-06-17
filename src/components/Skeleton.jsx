import React from 'react'
import '../styles/Skeleton.css'

export default function Skeleton({ 
  width = '100%', 
  height = '20px', 
  borderRadius = 'var(--r)', 
  className = '',
  style = {}
}) {
  return (
    <div 
      className={`skeleton-loader ${className}`}
      style={{ width, height, borderRadius, ...style }}
      aria-hidden="true"
    />
  )
}
