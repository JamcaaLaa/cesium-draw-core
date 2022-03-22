import { Viewer, Cartesian2, Color } from 'cesium'

export enum DrawMode {
  Point = 'Point',
  Line = 'Line',
  Polygon = 'Polygon',
  None = 'None'
}

export interface PointSetupOption {
  color?: Color
  size?: number
}
export interface LineSetupOption {}
export interface PolygonSetupOption {}

export type CesiumLeftClickCallBack = (params: {
  position: Cartesian2
  viewer: Viewer
}) => void
