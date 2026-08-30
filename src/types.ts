export interface CardData {
  id: string
  title: string
  imageUrl: string
}

export interface VisualizationNode extends CardData {
  position: [number, number, number]
}

export interface Card3DStyle {
  /** Width of the card mesh (default: 1.5) */
  width?: number
  /** Height of the card mesh (default: 2.1) */
  height?: number
  /** Scale multiplier when hovered (default: 1.5) */
  hoverScaleMultiplier?: number
  /** Card background color */
  bgColor?: string
  /** Card background color on hover */
  bgHoverColor?: string
  /** Text color of the title */
  textColor?: string
  /** Border color */
  borderColor?: string
  /** Border color on hover */
  borderHoverColor?: string
  /** Hover glow color (default: '#3b82f6') */
  glowColor?: string
  /** Hover glow opacity (default: 0.2) */
  glowOpacity?: number
  /** Font size of the title (default: 0.08) */
  fontSize?: number
  /** Whether to show title overlay (default: true) */
  showTitle?: boolean
  /** Whether to show glow effect on hover (default: true) */
  showGlow?: boolean
  /** Title overlay background color (default: '#333333') */
  titleBgColor?: string
  /** Title overlay opacity (default: 0.5) */
  titleBgOpacity?: number
}

export interface SceneTheme {
  /** Scene background color (e.g. '#0b0f19' or 'transparent') */
  backgroundColor?: string
  /** Environment preset from @react-three/drei (default: 'night' | 'city') */
  environmentPreset?:
    | 'night'
    | 'city'
    | 'sunset'
    | 'dawn'
    | 'forest'
    | 'studio'
    | 'apartment'
    | 'park'
    | 'lobby'
    | 'warehouse'
  /** Ambient light intensity */
  ambientLightIntensity?: number
  /** Point light intensity */
  pointLightIntensity?: number
  /** Spot light intensity (3D scene only) */
  spotLightIntensity?: number
  /** Show stars in background (3D scene only) */
  showStars?: boolean
  /** Stars configuration */
  starsConfig?: {
    radius?: number
    depth?: number
    count?: number
    factor?: number
    saturation?: number
    speed?: number
  }
  /** Axis text color (3D scene only) */
  axisColor?: string
  /** Axis length (default: 12) */
  axisLength?: number
  /** Show coordinate axes (default: true) */
  showAxes?: boolean
  /** Show grid helpers (default: true) */
  showGrid?: boolean
  /** Grid center line color */
  gridColorCenter?: string | number
  /** Grid line color */
  gridColorGrid?: string | number
  /** Grid size (default: 20 in 2D, 24 in 3D) */
  gridSize?: number
  /** Grid divisions (default: 20 in 2D, 12 in 3D) */
  gridDivisions?: number
}

export interface CardRenderProps<T> {
  item: T
  node: CardData
  position: [number, number, number]
  scale: number
  isHovered: boolean
  onHover: (hovered: boolean) => void
  onClick: () => void
  isDark?: boolean
  style?: Card3DStyle
}
