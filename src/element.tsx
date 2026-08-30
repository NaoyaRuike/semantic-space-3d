import { createRoot, type Root } from 'react-dom/client'
import type { Card3DStyle, CardData, SceneTheme, VisualizationNode } from './types'
import { VisualizationScene } from './VisualizationScene'
import { VisualizationScene3D } from './VisualizationScene3D'

export interface SemanticSpaceElementProps {
  data?: VisualizationNode[]
  xAxisLabel?: string
  yAxisLabel?: string
  zAxisLabel?: string
  cardScale?: number
  isDark?: boolean
  cardStyle?: Card3DStyle
  theme?: SceneTheme
}

const BaseElement: typeof HTMLElement =
  typeof HTMLElement !== 'undefined'
    ? HTMLElement
    : (class {} as unknown as typeof HTMLElement)

/**
 * Base custom element wrapper for Semantic Space visualizations
 */
abstract class BaseSemanticSpaceElement extends BaseElement {
  protected _root: Root | null = null
  protected _container: HTMLDivElement | null = null
  protected _data: VisualizationNode[] = []
  protected _cardScale = 1
  protected _isDark = false
  protected _cardStyle?: Card3DStyle
  protected _theme?: SceneTheme

  static get observedAttributes() {
    return ['data', 'card-scale', 'is-dark', 'card-style', 'theme']
  }

  connectedCallback() {
    if (!this._container) {
      this._container = document.createElement('div')
      this._container.style.width = '100%'
      this._container.style.height = '100%'
      this._container.style.position = 'relative'
      this.appendChild(this._container)
    }

    if (!this._root && this._container) {
      this._root = createRoot(this._container)
    }

    this.render()
  }

  disconnectedCallback() {
    if (this._root) {
      this._root.unmount()
      this._root = null
    }
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return

    switch (name) {
      case 'data':
        try {
          this._data = newValue ? JSON.parse(newValue) : []
        } catch (e) {
          console.error('[semantic-space] Failed to parse "data" attribute as JSON:', e)
        }
        break
      case 'card-scale':
        this._cardScale = newValue ? parseFloat(newValue) || 1 : 1
        break
      case 'is-dark':
        this._isDark = newValue !== null && newValue !== 'false'
        break
      case 'card-style':
        try {
          this._cardStyle = newValue ? JSON.parse(newValue) : undefined
        } catch (e) {
          console.error('[semantic-space] Failed to parse "card-style" attribute as JSON:', e)
        }
        break
      case 'theme':
        try {
          this._theme = newValue ? JSON.parse(newValue) : undefined
        } catch (e) {
          console.error('[semantic-space] Failed to parse "theme" attribute as JSON:', e)
        }
        break
    }

    this.render()
  }

  // Getters and Setters for JS property access
  get data(): VisualizationNode[] {
    return this._data
  }
  set data(val: VisualizationNode[]) {
    this._data = Array.isArray(val) ? val : []
    this.render()
  }

  get cardScale(): number {
    return this._cardScale
  }
  set cardScale(val: number) {
    this._cardScale = typeof val === 'number' ? val : 1
    this.render()
  }

  get isDark(): boolean {
    return this._isDark
  }
  set isDark(val: boolean) {
    this._isDark = Boolean(val)
    this.render()
  }

  get cardStyle(): Card3DStyle | undefined {
    return this._cardStyle
  }
  set cardStyle(val: Card3DStyle | undefined) {
    this._cardStyle = val
    this.render()
  }

  get theme(): SceneTheme | undefined {
    return this._theme
  }
  set theme(val: SceneTheme | undefined) {
    this._theme = val
    this.render()
  }

  protected handleNodeClick = (node: VisualizationNode) => {
    this.dispatchEvent(
      new CustomEvent('node-click', {
        detail: node,
        bubbles: true,
        composed: true,
      })
    )
  }

  protected getPosition = (node: VisualizationNode): [number, number, number] => {
    return node.position || [0, 0, 0]
  }

  protected getCardData = (node: VisualizationNode): CardData => {
    return {
      id: node.id,
      title: node.title,
      imageUrl: node.imageUrl,
    }
  }

  abstract render(): void
}

/**
 * <semantic-space-3d> Custom Element
 */
export class SemanticSpace3DElement extends BaseSemanticSpaceElement {
  private _xAxisLabel = 'X'
  private _yAxisLabel = 'Y'
  private _zAxisLabel = 'Z'

  static get observedAttributes() {
    return [
      ...BaseSemanticSpaceElement.observedAttributes,
      'x-axis-label',
      'y-axis-label',
      'z-axis-label',
    ]
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return

    switch (name) {
      case 'x-axis-label':
        this._xAxisLabel = newValue || 'X'
        break
      case 'y-axis-label':
        this._yAxisLabel = newValue || 'Y'
        break
      case 'z-axis-label':
        this._zAxisLabel = newValue || 'Z'
        break
      default:
        super.attributeChangedCallback(name, oldValue, newValue)
        return
    }

    this.render()
  }

  get xAxisLabel(): string {
    return this._xAxisLabel
  }
  set xAxisLabel(val: string) {
    this._xAxisLabel = val || 'X'
    this.render()
  }

  get yAxisLabel(): string {
    return this._yAxisLabel
  }
  set yAxisLabel(val: string) {
    this._yAxisLabel = val || 'Y'
    this.render()
  }

  get zAxisLabel(): string {
    return this._zAxisLabel
  }
  set zAxisLabel(val: string) {
    this._zAxisLabel = val || 'Z'
    this.render()
  }

  render() {
    if (!this._root) return

    this._root.render(
      <VisualizationScene3D
        data={this._data}
        getPosition={this.getPosition}
        getCardData={this.getCardData}
        xAxisLabel={this._xAxisLabel}
        yAxisLabel={this._yAxisLabel}
        zAxisLabel={this._zAxisLabel}
        cardScale={this._cardScale}
        isDark={this._isDark}
        cardStyle={this._cardStyle}
        theme={this._theme}
        onNodeClick={this.handleNodeClick}
      />
    )
  }
}

/**
 * <semantic-space-2d> Custom Element
 */
export class SemanticSpace2DElement extends BaseSemanticSpaceElement {
  render() {
    if (!this._root) return

    this._root.render(
      <VisualizationScene
        data={this._data}
        getPosition={this.getPosition}
        getCardData={this.getCardData}
        cardScale={this._cardScale}
        isDark={this._isDark}
        cardStyle={this._cardStyle}
        theme={this._theme}
        onNodeClick={this.handleNodeClick}
      />
    )
  }
}

// Auto-register Custom Elements if running in browser
export function registerCustomElements() {
  if (typeof window !== 'undefined' && 'customElements' in window) {
    if (!customElements.get('semantic-space-3d')) {
      customElements.define('semantic-space-3d', SemanticSpace3DElement)
    }
    if (!customElements.get('semantic-space-2d')) {
      customElements.define('semantic-space-2d', SemanticSpace2DElement)
    }
  }
}

registerCustomElements()
