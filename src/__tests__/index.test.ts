import { describe, expect, it } from 'vitest'
import * as SemanticSpace from '../index'

describe('semantic-space-3d package exports', () => {
  it('should export VisualizationScene', () => {
    expect(SemanticSpace.VisualizationScene).toBeDefined()
    expect(typeof SemanticSpace.VisualizationScene).toBe('function')
  })

  it('should export VisualizationScene3D', () => {
    expect(SemanticSpace.VisualizationScene3D).toBeDefined()
    expect(typeof SemanticSpace.VisualizationScene3D).toBe('function')
  })

  it('should export Card3D', () => {
    expect(SemanticSpace.Card3D).toBeDefined()
    expect(typeof SemanticSpace.Card3D).toBe('function')
  })
})
