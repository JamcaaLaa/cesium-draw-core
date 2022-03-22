import * as Cesium from 'cesium'
import {
  Viewer,
  Camera,
  Rectangle,
  ArcGisMapServerImageryProvider
} from 'cesium'
import './main.css'
// import 'cesium/Source/Widgets/widgets.css'
import { Draw, DrawMode } from '@/index'

type DemoDebugging = {
  namespace: any
  viewer: Viewer | null
}

const container = document.getElementById('cesium-container')
const DEMO: DemoDebugging = {
  namespace: Cesium,
  viewer: null
}

const onContentLoaded = () => {
  const credits = document.createElement('div')
  credits.style.display = 'none'
  DEMO.viewer = new Viewer(container as Element, {
    animation: false,
    timeline: false,
    geocoder: false,
    homeButton: false,
    scene3DOnly: true,
    baseLayerPicker: false,
    navigationHelpButton: false,
    fullscreenButton: false,
    infoBox: false,
    creditContainer: credits,
    imageryProvider: new ArcGisMapServerImageryProvider({
      url: `https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer`
    }),
    msaaSamples: 2,
    selectionIndicator: false,
    // terrainProvider: Cesium.createWorldTerrain(),
    contextOptions: {
      requestWebgl2: true
    }
  })

  DEMO.viewer.scene.globe.depthTestAgainstTerrain = true

  return DEMO.viewer
}

document.addEventListener('DOMContentLoaded', () => {
  // 默认定位到中国上空
  Camera.DEFAULT_VIEW_RECTANGLE = Rectangle.fromDegrees(
    75.0, // 东
    0.0, // 南
    140.0, // 西
    60.0 // 北
  )
  Object.defineProperties(window, {
    DEMO: {
      value: DEMO
    },
    CESIUM_BASE_URL: {
      value: import.meta.env.VITE_CESIUM_BASE_URL
    }
  })

  const draw = new Draw(onContentLoaded(), DrawMode.None)
  Object.defineProperty(window, 'TEST_DRAW', {
    value: draw
  })
})
