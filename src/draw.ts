import { Viewer, ScreenSpaceEventHandler, ScreenSpaceEventType } from 'cesium'
import { worldToDeg } from './utils'
import { DrawMode } from './types'
import type {
  LineSetupOption,
  PointSetupOption,
  PolygonSetupOption,
  CesiumLeftClickCallBack
} from './types'

import 'milligram/dist/milligram.min.css'
import './index.css'

const createUI = (drawInstance: Draw) => {
  const ul = document.createElement('ul')
  ul.className = 'testul'

  const button = document.createElement('button')
  button.className = 'button'
  button.innerHTML = `画点`
  button.onclick = () => {
    if (button.className === 'button') {
      button.className = 'button button-outline'
      drawInstance.mode = DrawMode.Point
    } else {
      button.className = 'button'
      drawInstance.mode = DrawMode.None
    }
  }
  ul.appendChild(button)

  return ul
}

const leftClickCallback: CesiumLeftClickCallBack = ({ position, viewer }) => {
  const scene = viewer.scene
  const globe = scene.globe
  const pickPositionSupported = scene.pickPositionSupported

  let scenePickPosition
  let globePickPosition
  let pickPoint
  let useScenePickHeight = false

  if (!pickPositionSupported) {
    return
  }
  scenePickPosition = scene.pickPosition(position) // may be undefined
  const pickObject = scene.pick(position) // may be undefined
  const ray = scene.camera.getPickRay(position)
  if (pickObject) {
    useScenePickHeight = true
  }
  if (ray) {
    globePickPosition = globe.pick(ray, scene)
  }

  if (scenePickPosition) {
    pickPoint = worldToDeg(scenePickPosition)
    if (!useScenePickHeight && globePickPosition) {
      pickPoint[2] = worldToDeg(globePickPosition)[2]
    }
  }
  console.log(pickPoint)
}

export class Draw {
  private viewer: Viewer
  private handlerMap: Map<string, ScreenSpaceEventHandler> = new Map()
  private ui: Node
  private drawMode: DrawMode
  private cacheDepthTest: boolean

  public drawData: any

  constructor(
    viewer: Viewer,
    drawMode: DrawMode,
    options?: PointSetupOption | LineSetupOption | PolygonSetupOption
  ) {
    this.viewer = viewer
    this.drawMode = drawMode
    this.cacheDepthTest = viewer.scene.globe.depthTestAgainstTerrain

    // force enable depth test for terrain
    viewer.scene.globe.depthTestAgainstTerrain = true

    if (!options) {
      // TODO
    }

    // init UI
    const containerDiv = this.viewer.cesiumWidget.container as HTMLDivElement
    const ul = createUI(this)
    this.ui = ul
    containerDiv.appendChild(this.ui)

    // init event
    this.initEventHandler()
  }

  private initEventHandler() {
    const canvasDiv = this.viewer.canvas
    const clickHandler = new ScreenSpaceEventHandler(canvasDiv)
    this.handlerMap.set('default', clickHandler)
  }

  private onModeChange() {
    const clickHandler = this.handlerMap.get('default')
    if (!clickHandler) {
      this.initEventHandler()
      return
    }

    const viewer = this.viewer

    switch (this.drawMode) {
      case DrawMode.Point:
        clickHandler.setInputAction(({ position }) => {
          leftClickCallback({
            position,
            viewer
          })
        }, ScreenSpaceEventType.LEFT_CLICK)
        break
      case DrawMode.Line:
        break
      case DrawMode.Polygon:
        break
      default:
        clickHandler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK)
        break
    }
  }

  get mode() {
    return this.drawMode
  }

  set mode(value: DrawMode) {
    this.drawMode = value
    this.onModeChange()
  }

  destory() {
    if (this.viewer) {
      this.viewer.scene.globe.depthTestAgainstTerrain = this.cacheDepthTest
    }
  }
}
