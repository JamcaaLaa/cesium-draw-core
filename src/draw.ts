import { Viewer, ScreenSpaceEventHandler, ScreenSpaceEventType } from 'cesium'
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

const leftClickCallback: CesiumLeftClickCallBack = ({ position }) => {
  console.log(position)
}

export class Draw {
  private viewer: Viewer
  private handlerMap: Map<string, ScreenSpaceEventHandler> = new Map()
  private ui: Node
  private drawMode: DrawMode
  private supportDepthPick: boolean
  private supportTransparentPick: boolean

  constructor(
    viewer: Viewer,
    drawMode: DrawMode,
    options?: PointSetupOption | LineSetupOption | PolygonSetupOption
  ) {
    this.viewer = viewer
    this.supportDepthPick = viewer.scene.useDepthPicking
    this.supportTransparentPick = viewer.scene.pickTranslucentDepth
    this.drawMode = drawMode

    if (!options) {
      // TODO
    }

    // init UI
    const containerDiv = this.viewer.cesiumWidget.container as HTMLDivElement
    const ul = createUI(this)
    this.ui = ul
    containerDiv.appendChild(this.ui)

    // init event
    // TODO 要判断深度拾取支持情况，拾取的功能要分支出去，优先顺序大致为 ScenePick > GlobePick > ...
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

    switch (this.drawMode) {
      case DrawMode.Point:
        clickHandler.setInputAction(
          leftClickCallback,
          ScreenSpaceEventType.LEFT_CLICK
        )
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
}
