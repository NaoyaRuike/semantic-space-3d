import { useState } from 'react'
import { VisualizationScene3D, VisualizationScene, VisualizationNode } from 'semantic-space-3d'

// Generate sample nodes with random position data for demo
const SAMPLE_NODES: VisualizationNode[] = [
  {
    id: '1',
    title: 'Interstellar',
    imageUrl: 'https://picsum.photos/id/10/300/450',
    position: [-2, 1, 3]
  },
  {
    id: '2',
    title: 'Inception',
    imageUrl: 'https://picsum.photos/id/20/300/450',
    position: [3, -2, -1]
  },
  {
    id: '3',
    title: 'The Dark Knight',
    imageUrl: 'https://picsum.photos/id/30/300/450',
    position: [0, 4, -3]
  },
  {
    id: '4',
    title: 'Memento',
    imageUrl: 'https://picsum.photos/id/40/300/450',
    position: [-4, -3, 2]
  },
  {
    id: '5',
    title: 'Dunkirk',
    imageUrl: 'https://picsum.photos/id/50/300/450',
    position: [2, 2, 4]
  }
]

export default function App() {
  const [is3D, setIs3D] = useState(true)
  const [isDark, setIsDark] = useState(true)
  const [cardScale, setCardScale] = useState(1)
  const [selectedNode, setSelectedNode] = useState<VisualizationNode | null>(null)

  const handleNodeClick = (node: VisualizationNode) => {
    setSelectedNode(node)
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: isDark ? '#0b0f19' : '#f9fafb',
      color: isDark ? '#f3f4f6' : '#111827',
      position: 'relative'
    }}>
      {/* Top Header Bar */}
      <header style={{
        padding: '16px 24px',
        borderBottom: `1px solid ${isDark ? '#1e293b' : '#e5e7eb'}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: isDark ? '#111827' : '#ffffff',
        zIndex: 10
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Semantic Space 3D Playground</h1>
          <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: isDark ? '#9ca3af' : '#6b7280' }}>
            React 19 & Three.js powered card visualization
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <a
            href="/wc.html"
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: `1px solid ${isDark ? '#374151' : '#d1d5db'}`,
              background: isDark ? '#1f2937' : '#ffffff',
              color: isDark ? '#60a5fa' : '#2563eb',
              textDecoration: 'none',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            Web Components Demo ↗
          </a>
          <button
            onClick={() => setIs3D(!is3D)}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: `1px solid ${isDark ? '#374151' : '#d1d5db'}`,
              background: isDark ? '#1f2937' : '#ffffff',
              color: isDark ? '#f3f4f6' : '#111827',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            Switch to {is3D ? '2D View' : '3D View'}
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: `1px solid ${isDark ? '#374151' : '#d1d5db'}`,
              background: isDark ? '#1f2937' : '#ffffff',
              color: isDark ? '#f3f4f6' : '#111827',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            Toggle {isDark ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </header>

      {/* Main Canvas Area */}
      <div style={{ flex: 1, position: 'relative' }}>
        {is3D ? (
          <VisualizationScene3D
            data={SAMPLE_NODES}
            getPosition={(node) => node.position}
            getCardData={(node) => ({
              id: node.id,
              title: node.title,
              imageUrl: node.imageUrl,
            })}
            xAxisLabel="Complexity"
            yAxisLabel="Drama"
            zAxisLabel="Popularity"
            cardScale={cardScale}
            onNodeClick={handleNodeClick}
            isDark={isDark}
          />
        ) : (
          <VisualizationScene
            data={SAMPLE_NODES}
            getPosition={(node) => node.position}
            getCardData={(node) => ({
              id: node.id,
              title: node.title,
              imageUrl: node.imageUrl,
            })}
            cardScale={cardScale}
            onNodeClick={handleNodeClick}
            isDark={isDark}
          />
        )}

        {/* Right Info Panel */}
        {selectedNode && (
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '280px',
            background: isDark ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            zIndex: 5,
            backdropFilter: 'blur(8px)'
          }}>
            <h3 style={{ margin: '0 0 10px' }}>Selected Node</h3>
            <img 
              src={selectedNode.imageUrl} 
              alt={selectedNode.title} 
              style={{ width: '100%', borderRadius: '6px', marginBottom: '12px' }} 
            />
            <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{selectedNode.title}</div>
            <div style={{ marginTop: '8px', fontSize: '0.85rem', color: isDark ? '#9ca3af' : '#6b7280' }}>
              ID: {selectedNode.id}<br />
              Position: [{selectedNode.position.map(n => n.toFixed(1)).join(', ')}]
            </div>
            <button 
              onClick={() => setSelectedNode(null)}
              style={{
                marginTop: '16px',
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: 'none',
                background: '#3b82f6',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              Close
            </button>
          </div>
        )}

        {/* Floating Card Scale Slider */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          background: isDark ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
          borderRadius: '8px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 5,
          backdropFilter: 'blur(8px)'
        }}>
          <span style={{ fontSize: '0.9rem' }}>Card Scale:</span>
          <input 
            type="range" 
            min="0.5" 
            max="2" 
            step="0.1" 
            value={cardScale} 
            onChange={(e) => setCardScale(parseFloat(e.target.value))}
            style={{ cursor: 'pointer' }}
          />
          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{cardScale.toFixed(1)}x</span>
        </div>
      </div>
    </div>
  )
}
