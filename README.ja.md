# semantic-space-3d

[English](README.md) | [日本語](README.ja.md)

インタラクティブな3D空間で多次元データを可視化・探索するための React Three Fiber (R3F) コンポーネントライブラリです。

## 特徴

- **2D / 3D シーン対応**: 俯瞰表示用の `VisualizationScene`（Orthographic）と、3次元空間探索用の `VisualizationScene3D`（Perspective）を提供。
- **柔軟なスタイリング**: カード本体（色・サイズ・発光エフェクト）やシーン全体（背景色・ライト・グリッド・軸・星空）のデザインをPropsで自由にカスタマイズ可能。
- **フルカスタムレンダラー**: 必要に応じて `renderCard` を利用し、独自の3Dコンポーネントへ完全差し替えが可能。
- **追加オブジェクトの挿入**: `children` を通じて独自の3DメッシュやカスタムライトをCanvas内に直接配置可能。

---

## インストール

```bash
pnpm add semantic-space-3d @react-three/fiber @react-three/drei three
# または
npm install semantic-space-3d @react-three/fiber @react-three/drei three
```

---

## 基本的な使い方

### 1. 3D可視化シーン (`VisualizationScene3D`)

```tsx
import { VisualizationScene3D } from 'semantic-space-3d'

interface MyData {
  id: string
  title: string
  imageUrl: string
  x: number
  y: number
  z: number
}

const data: MyData[] = [
  { id: '1', title: 'Node 1', imageUrl: 'https://example.com/1.jpg', x: 0, y: 0, z: 0 },
  { id: '2', title: 'Node 2', imageUrl: 'https://example.com/2.jpg', x: 5, y: 3, z: -2 },
]

export function MySpace() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <VisualizationScene3D
        data={data}
        getPosition={(item) => [item.x, item.y, item.z]}
        getCardData={(item) => ({
          id: item.id,
          title: item.title,
          imageUrl: item.imageUrl,
        })}
        xAxisLabel="ジャンル"
        yAxisLabel="人気度"
        zAxisLabel="年代"
        cardScale={1}
        onNodeClick={(item) => console.log('Clicked:', item)}
      />
    </div>
  )
}
```

---

## デザインのカスタマイズ方法

### 1. カードデザインのカスタマイズ (`cardStyle`)

`cardStyle` プロパティを渡すことで、カードの寸法、カラー、ホバーエフェクト等を設定できます。

```tsx
<VisualizationScene3D
  data={data}
  getPosition={(item) => [item.x, item.y, item.z]}
  getCardData={(item) => item}
  xAxisLabel="X"
  yAxisLabel="Y"
  zAxisLabel="Z"
  cardScale={1}
  cardStyle={{
    // 寸法設定
    width: 1.8,                  // カードの幅 (デフォルト: 1.5)
    height: 2.4,                 // カードの高さ (デフォルト: 2.1)
    hoverScaleMultiplier: 1.4,   // ホバー時の拡大倍率 (デフォルト: 1.5)

    // カラー設定
    bgColor: '#1e293b',          // カード背景色
    bgHoverColor: '#334155',     // ホバー時背景色
    textColor: '#f8fafc',        // タイトルの文字色
    borderColor: '#475569',      // 枠線色
    borderHoverColor: '#38bdf8', // ホバー時枠線色

    // 発光・テキスト設定
    glowColor: '#0ea5e9',        // ホバー時の発光色
    glowOpacity: 0.3,            // 発光の強さ (0.0〜1.0)
    showGlow: true,              // グロー効果の有無
    showTitle: true,             // タイトルの表示有無
    fontSize: 0.1,               // タイトル文字サイズ
  }}
/>
```

---

### 2. 空間・軸・背景デザインのカスタマイズ (`theme`)

`theme` プロパティを渡すことで、背景色、環境光、グリッド、軸ラベル、星空などのシーン設定を変更できます。

```tsx
<VisualizationScene3D
  data={data}
  getPosition={(item) => [item.x, item.y, item.z]}
  getCardData={(item) => item}
  xAxisLabel="X"
  yAxisLabel="Y"
  zAxisLabel="Z"
  cardScale={1}
  theme={{
    // 背景・環境
    backgroundColor: '#090d16',   // 空間の背景色
    environmentPreset: 'sunset',  // 環境光プリセット ('night' | 'city' | 'sunset' など)
    ambientLightIntensity: 0.4,   // 環境光の強さ
    pointLightIntensity: 1.0,     // ポイントライトの強さ

    // 星空エフェクト
    showStars: true,
    starsConfig: {
      count: 3000,
      factor: 5,
      speed: 0.5,
    },

    // 軸とラベル
    showAxes: true,
    axisLength: 15,
    axisColor: '#93c5fd',         // 軸ラベルの文字色

    // グリッド
    showGrid: true,
    gridSize: 30,                 // グリッドの大きさ
    gridColorCenter: '#334155',   // グリッド中心線の色
    gridColorGrid: '#1e293b',     // グリッド線の色
  }}
/>
```

---

### 3. カードの完全カスタムレンダリング (`renderCard`)

独自に構築した R3F メッシュやコンポーネントを使用したい場合は、`renderCard` 関数を渡します。

```tsx
<VisualizationScene3D
  data={data}
  getPosition={(item) => [item.x, item.y, item.z]}
  getCardData={(item) => item}
  xAxisLabel="X"
  yAxisLabel="Y"
  zAxisLabel="Z"
  cardScale={1}
  renderCard={({ node, position, isHovered, onHover, onClick }) => (
    <group
      position={position}
      onPointerOver={() => onHover(true)}
      onPointerOut={() => onHover(false)}
      onClick={onClick}
    >
      <mesh scale={isHovered ? 1.2 : 1}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={isHovered ? 'hotpink' : 'orange'} />
      </mesh>
    </group>
  )}
/>
```

---

## API リファレンス

### `Card3DStyle`

| プロパティ | 型 | デフォルト | 説明 |
| :--- | :--- | :--- | :--- |
| `width` | `number` | `1.5` | カードメッシュの幅 |
| `height` | `number` | `2.1` | カードメッシュの高さ |
| `hoverScaleMultiplier` | `number` | `1.5` | ホバー時の拡大倍率 |
| `bgColor` | `string` | テーマ依存 | カード背景色 |
| `bgHoverColor` | `string` | テーマ依存 | ホバー時のカード背景色 |
| `textColor` | `string` | テーマ依存 | タイトルテキストの色 |
| `borderColor` | `string` | テーマ依存 | 枠線の色 |
| `borderHoverColor` | `string` | `'#3b82f6'` | ホバー時の枠線色 |
| `glowColor` | `string` | `'#3b82f6'` | ホバー時のグロー（発光）色 |
| `glowOpacity` | `number` | `0.2` | グローの不透明度 |
| `fontSize` | `number` | `0.08` | タイトルのフォントサイズ |
| `showTitle` | `boolean` | `true` | タイトルオーバーレイの表示有無 |
| `showGlow` | `boolean` | `true` | ホバー時のグローエフェクトの有無 |
| `titleBgColor` | `string` | `'#333333'` | タイトル背面の帯色 |
| `titleBgOpacity` | `number` | `0.5` | タイトル背面の帯の不透明度 |

### `SceneTheme`

| プロパティ | 型 | デフォルト | 説明 |
| :--- | :--- | :--- | :--- |
| `backgroundColor` | `string` | `undefined` | シーンの背景色（CSSカラー） |
| `environmentPreset` | `string` | `isDark ? 'night' : 'city'` | 環境光プリセット |
| `ambientLightIntensity` | `number` | `0.2`〜`0.5` | アンビエントライトの強度 |
| `pointLightIntensity` | `number` | `0.8`〜`1.2` | ポイントライトの強度 |
| `spotLightIntensity` | `number` | `1.0` | スポットライトの強度（3Dのみ） |
| `showStars` | `boolean` | `isDark` | 星空エフェクトの表示有無（3Dのみ） |
| `starsConfig` | `object` | - | 星空の詳細設定（`count`, `factor`, `speed` 等） |
| `showAxes` | `boolean` | `true` | 座標軸とラベルの表示有無（3Dのみ） |
| `axisLength` | `number` | `12` | 軸の長さ（3Dのみ） |
| `axisColor` | `string` | テーマ依存 | 軸ラベル文字色（3Dのみ） |
| `showGrid` | `boolean` | `true` | グリッドの表示有無 |
| `gridSize` | `number` | `20` (2D) / `24` (3D) | グリッドの大きさ |
| `gridDivisions` | `number` | `20` (2D) / `12` (3D) | グリッドの分割数 |
| `gridColorCenter` | `string \| number` | テーマ依存 | グリッドの中心線色 |
| `gridColorGrid` | `string \| number` | テーマ依存 | グリッドの線の色 |

---

## 開発とコントリビューション

開発方法やコントリビューションガイドについては [CONTRIBUTING.md](CONTRIBUTING.md) をご覧ください。

## ライセンス

[MIT](LICENSE) © [Naoya Ruike](https://github.com/NaoyaRuike)
