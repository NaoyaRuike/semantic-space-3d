import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, Stars, Text } from '@react-three/drei'
import { Card3D } from './Card3D'
import { CardData, Card3DStyle, SceneTheme, CardRenderProps } from './types'

export interface VisualizationScene3DProps<T> {
  data: T[]
  getPosition: (item: T) => [number, number, number]
  getCardData: (item: T) => CardData
  xAxisLabel: string
  yAxisLabel: string
  zAxisLabel: string
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

export function VisualizationScene3D<T>({
  data,
  getPosition,
  getCardData,
  xAxisLabel,
  yAxisLabel,
  zAxisLabel,
  cardScale,
  onNodeClick,
  isDark = false,
  cardStyle,
  theme,
  renderCard,
  children,
}: VisualizationScene3DProps<T>) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)

  // Theme values
  const labelColor = theme?.axisColor ?? (isDark ? '#9ca3af' : '#6b7280')
  const envPreset = theme?.environmentPreset ?? (isDark ? 'night' : 'city')
  const ambientIntensity = theme?.ambientLightIntensity ?? (isDark ? 0.2 : 0.4)
  const pointIntensity = theme?.pointLightIntensity ?? (isDark ? 0.8 : 1.2)
  const spotIntensity = theme?.spotLightIntensity ?? 1
  const showStars = theme?.showStars ?? isDark
  const starsConfig = theme?.starsConfig
  const showAxes = theme?.showAxes ?? true
  const axisLength = theme?.axisLength ?? 12
  const showGrid = theme?.showGrid ?? true
  const gridSize = theme?.gridSize ?? 24
  const gridDivisions = theme?.gridDivisions ?? 12
  const gridColorCenter = theme?.gridColorCenter ?? (isDark ? 0x444444 : 0xcccccc)
  const gridColorGrid = theme?.gridColorGrid ?? (isDark ? 0x222222 : 0xeeeeee)

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      style={theme?.backgroundColor ? { backgroundColor: theme.backgroundColor } : undefined}
    >
      <PerspectiveCamera makeDefault position={[15, 15, 15]} fov={50} />
      <OrbitControls
        enableRotate={true}
        enablePan={true}
        enableZoom={true}
        minDistance={5}
        maxDistance={50}
        makeDefault
      />

      <ambientLight intensity={ambientIntensity} />
      <pointLight position={[15, 15, 15]} intensity={pointIntensity} />
      <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={spotIntensity} castShadow />

      <Environment preset={envPreset} />

      {showStars && (
        <Stars
          radius={starsConfig?.radius ?? 100}
          depth={starsConfig?.depth ?? 50}
          count={starsConfig?.count ?? 5000}
          factor={starsConfig?.factor ?? 4}
          saturation={starsConfig?.saturation ?? 0}
          fade
          speed={starsConfig?.speed ?? 1}
        />
      )}

      {/* 3D Axis Helpers & Labels */}
      {showAxes && (
        <>
          <axesHelper args={[axisLength]} />
          <Text position={[axisLength + 1, 0, 0]} fontSize={0.8} color={labelColor} anchorX="center">
            X: {xAxisLabel}
          </Text>
          <Text
            position={[0, axisLength + 1, 0]}
            fontSize={0.8}
            color={labelColor}
            anchorX="center"
            rotation={[0, 0, Math.PI / 2]}
          >
            Y: {yAxisLabel}
          </Text>
          <Text
            position={[0, 0, axisLength + 1]}
            fontSize={0.8}
            color={labelColor}
            anchorX="center"
            rotation={[0, -Math.PI / 2, 0]}
          >
            Z: {zAxisLabel}
          </Text>
        </>
      )}

      {/* 3D Grid/Box Helper */}
      {showGrid && (
        <>
          <gridHelper
            args={[gridSize, gridDivisions, gridColorCenter, gridColorGrid]}
            position={[0, -(gridSize / 2 - 2), 0]}
          />
          <gridHelper
            args={[gridSize, gridDivisions, gridColorCenter, gridColorGrid]}
            position={[0, 0, -(gridSize / 2 - 2)]}
            rotation={[Math.PI / 2, 0, 0]}
          />
        </>
      )}

      <group>
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
            return (
              <React.Fragment key={cardData.id || index}>
                {renderCard(cardProps)}
              </React.Fragment>
            )
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
      </group>

      {children}
    </Canvas>
  )
}
