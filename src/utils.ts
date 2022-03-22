import { Cartesian3, Cartographic, Math as CesiumMath } from 'cesium'

export const worldToDeg = (p: Cartesian3) => {
  const radPt = Cartographic.fromCartesian(p)
  return [
    CesiumMath.DEGREES_PER_RADIAN * radPt.longitude,
    CesiumMath.DEGREES_PER_RADIAN * radPt.latitude,
    radPt.height
  ]
}
