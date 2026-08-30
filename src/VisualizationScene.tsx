import { Environment, OrbitControls, OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useState } from 'react'
import { Card3D } from './Card3D'
import type { Card3DStyle, CardData, CardRenderProps, SceneTheme } from './types'

export interface VisualizationSceneProps<T> {
  data: T[]
  getPosition: (item: T) => [number, number, number]
  getCardData: (item: T) => CardData
  cardScale: number
  onNodeClick?: (item: T) => void
  isDark?: boolean
  /** Styling options for standard 3D cards */
  cardStyle?: Card3DStyle
  /** Theme options for 3D scene & environment */
  theme?: SceneTheme
  /** Custom render function for cards */
  renderCard?: (props: CardRenderProps<T>) => React.ReactNode
  /** Additional 3D children to render into the Canvas */
  children?: React.ReactNode
}

export function VisualizationScene<T>({
  data,
  getPosition,
  getCardData,
  cardScale,
  onNodeClick,
  isDark = false,
  cardStyle,
  theme,
  renderCard,
  children,
}: VisualizationSceneProps<T>) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)

  // Theme values
  const envPreset = theme?.environmentPreset ?? (isDark ? 'night' : 'city')
  const ambientIntensity = theme?.ambientLightIntensity ?? (isDark ? 0.3 : 0.5)
  const pointIntensity = theme?.pointLightIntensity ?? (isDark ? 0.8 : 1)
  const showGrid = theme?.showGrid ?? true
  const gridSize = theme?.gridSize ?? 20
  const gridDivisions = theme?.gridDivisions ?? 20
  const gridColorCenter = theme?.gridColorCenter ?? (isDark ? 0x333333 : 0xcccccc)
  const gridColorGrid = theme?.gridColorGrid ?? (isDark ? 0x222222 : 0xeeeeee)

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      style={theme?.backgroundColor ? { backgroundColor: theme.backgroundColor } : undefined}
    >
      <OrthographicCamera makeDefault position={[0, 0, 20]} zoom={60} near={0.1} far={1000} />
      <OrbitControls
        enableRotate={false}
        enablePan={true}
        enableZoom={true}
        minZoom={20}
        maxZoom={200}
        screenSpacePanning={true}
      />

      <ambientLight intensity={ambientIntensity} />
      <pointLight position={[10, 10, 10]} intensity={pointIntensity} />
      <Environment preset={envPreset} />

      {/* Grid Helper for 2D feel */}
      {showGrid && (
        <gridHelper
          args={[gridSize, gridDivisions, gridColorCenter, gridColorGrid]}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, -0.1]}
        />
      )}

      {data.map((item, index) => {
        const position = getPosition(item)
        const cardData = getCardData(item)
        const isHovered = hoveredNodeId === cardData.id

        const cardProps: CardRenderProps<T> = {
          item,
          node: cardData,
          position,
          scale: cardScale,
          isHovered,
          onHover: (hovered) => setHoveredNodeId(hovered ? cardData.id : null),
          onClick: () => onNodeClick?.(item),
          isDark,
          style: cardStyle,
        }

        if (renderCard) {
          return <React.Fragment key={cardData.id || index}>{renderCard(cardProps)}</React.Fragment>
        }

        return (
          <Card3D
            key={cardData.id || index}
            node={cardData}
            position={position}
            scale={cardScale}
            isHovered={isHovered}
            onHover={(hovered) => setHoveredNodeId(hovered ? cardData.id : null)}
            onClick={() => onNodeClick?.(item)}
            isDark={isDark}
            style={cardStyle}
          />
        )
      })}

      {children}
    </Canvas>
  )
}
