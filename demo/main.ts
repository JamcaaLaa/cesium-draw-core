import * as Cesium from 'cesium'
import {
  Viewer,
  Camera,
  Rectangle,
  ArcGisMapServerImageryProvider
} from 'cesium'
import './main.css'
// import 'cesium/Source/Widgets/widgets.css'
import { Draw } from '@/index'

type DemoDebugging = {
  namespace: any
  viewer: Viewer | null
}

const container = document.getElementById('cesium-container')
const CESIUM: DemoDebugging = {
  namespace: Cesium,
  viewer: null
}

const onContentLoaded = () => {
  CESIUM.viewer = new Viewer(container as Element, {
    animation: false,
    timeline: false,
    geocoder: false,
    homeButton: false,
    scene3DOnly: true,
    baseLayerPicker: false,
    navigationHelpButton: false,
    fullscreenButton: false,
    infoBox: false,
    imageryProvider: new ArcGisMapServerImageryProvider({
      url: `https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer`
    })
  })

  return CESIUM.viewer
}

document.addEventListener('DOMContentLoaded', () => {
  Camera.DEFAULT_VIEW_RECTANGLE = Rectangle.fromDegrees(
    75.0, // 东
    0.0, // 南
    140.0, // 西
    60.0 // 北
  )
  Object.defineProperties(window, {
    CESIUM: {
      value: CESIUM
    },
    CESIUM_BASE_URL: {
      value: import.meta.env.VITE_CESIUM_BASE_URL
    }
  })

  new Draw(onContentLoaded())
})
