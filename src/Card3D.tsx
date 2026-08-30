import { Billboard, Image as DreiImage, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import type { Card3DStyle, CardData } from './types'

export interface Card3DProps {
  node: CardData
  position: [number, number, number]
  scale: number
  isHovered: boolean
  onHover: (hovered: boolean) => void
  onClick: () => void
  isDark?: boolean
  style?: Card3DStyle
}

export function Card3D({
  node,
  position,
  scale,
  isHovered,
  onHover,
  onClick,
  isDark,
  style,
}: Card3DProps) {
  const meshRef = useRef<THREE.Group>(null)

  // Set initial position and scale on mount to prevent fly-in
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.set(position[0], position[1], position[2])
      meshRef.current.scale.set(scale, scale, 1)
    }
  }, [position, scale])

  // Smoothly animate scale and position
  const [currentScale, setCurrentScale] = useState(scale)

  const hoverMultiplier = style?.hoverScaleMultiplier ?? 1.5

  useFrame((_state, delta) => {
    if (!meshRef.current) return

    const lerpSpeed = 10 * delta

    // Position animation: maintain constant position
    const targetPos = new THREE.Vector3(position[0], position[1], position[2])
    meshRef.current.position.lerp(targetPos, lerpSpeed)

    // Update internal scale state for the Billboard content
    const targetScale = 2 * (isHovered ? scale * hoverMultiplier : scale)
    setCurrentScale((prev) => THREE.MathUtils.lerp(prev, targetScale, lerpSpeed))
  })

  // Dimensions
  const cardWidth = style?.width ?? 1.5
  const cardHeight = style?.height ?? 2.1
  const borderWidth = cardWidth + 0.05
  const borderHeight = cardHeight + 0.05
  const imgWidth = cardWidth - 0.1
  const imgHeight = cardHeight - 0.1
  const titleY = -(cardHeight / 2) + 0.15

  // Colors
  const bgColor = isHovered
    ? (style?.bgHoverColor ?? (isDark ? '#1f2937' : '#ffffff'))
    : (style?.bgColor ?? (isDark ? '#111827' : '#f8f9fa'))

  const textColor = style?.textColor ?? (isDark ? '#f3f4f6' : '#111827')
  const borderColor = isHovered
    ? (style?.borderHoverColor ?? '#3b82f6')
    : (style?.borderColor ?? (isDark ? '#374151' : '#e5e7eb'))

  const glowColor = style?.glowColor ?? '#3b82f6'
  const glowOpacity = style?.glowOpacity ?? 0.2
  const showGlow = style?.showGlow ?? true
  const showTitle = style?.showTitle ?? true
  const fontSize = style?.fontSize ?? 0.08
  const titleBgColor = style?.titleBgColor ?? '#333333'
  const titleBgOpacity = style?.titleBgOpacity ?? 0.5

  return (
    <group
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover(true)
      }}
      onPointerOut={() => {
        onHover(false)
      }}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <group scale={[currentScale, currentScale, 1]}>
          {/* Card Background */}
          <mesh>
            <planeGeometry args={[cardWidth, cardHeight]} />
            <meshStandardMaterial color={bgColor} roughness={0.3} metalness={0.1} />
          </mesh>

          {/* Card Border */}
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[borderWidth, borderHeight]} />
            <meshBasicMaterial color={borderColor} />
          </mesh>

          {/* Image */}
          {node.imageUrl && (
            <DreiImage
              url={node.imageUrl}
              position={[0, 0, 0.01]}
              scale={[imgWidth, imgHeight]}
              transparent
              opacity={1}
            />
          )}

          {/* Title Overlay */}
          {showTitle && node.title && (
            <>
              <mesh position={[0, titleY, 0.02]}>
                <planeGeometry args={[cardWidth, 0.2]} />
                <meshBasicMaterial
                  color={titleBgColor}
                  transparent={true}
                  opacity={titleBgOpacity}
                  depthWrite={false}
                />
              </mesh>

              {/* Title Text */}
              <Text
                position={[0, titleY, 0.04]}
                fontSize={fontSize}
                color={textColor}
                anchorX="center"
                anchorY="middle"
                maxWidth={cardWidth * 0.8}
              >
                {node.title}
              </Text>
            </>
          )}

          {/* Hover Glow */}
          {isHovered && showGlow && (
            <mesh position={[0, 0, -0.05]}>
              <planeGeometry args={[cardWidth * 0.8, cardHeight * 0.8]} />
              <meshBasicMaterial
                color={glowColor}
                transparent
                opacity={glowOpacity}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          )}
        </group>
      </Billboard>
    </group>
  )
}
