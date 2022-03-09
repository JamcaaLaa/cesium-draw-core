import { Cartesian2, Color } from 'cesium'

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

export type CesiumLeftClickCallBack = (evt: { position: Cartesian2 }) => void
