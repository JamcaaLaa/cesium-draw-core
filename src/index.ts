import {
  Viewer,
  ScreenSpaceEventHandler
  // ScreenSpaceEventType,
} from 'cesium'

import 'milligram/dist/milligram.min.css'
import './index.css'

const createUI = () => {
  const ul = document.createElement('ul')
  ul.className = 'testul'

  const button = document.createElement('button')
  button.className = 'button'
  button.innerHTML = `画画`
  ul.appendChild(button)

  return ul
}

export enum DrawMode {
  Point,
  Line,
  Polygon
}

export class Draw {
  private viewer: Viewer
  private handlerMap: Map<string, ScreenSpaceEventHandler> = new Map()
  private ui: Node

  public drawMode: DrawMode = DrawMode.Point

  constructor(viewer: Viewer) {
    this.viewer = viewer
    // init UI
    const containerDiv = this.viewer.cesiumWidget.container as HTMLDivElement
    const ul = createUI()
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
}
