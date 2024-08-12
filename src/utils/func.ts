import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import Polyline from "@arcgis/core/geometry/Polyline";
export function getSchoolBuildingGraphic(
  name: string,
  description: string,
  longitude: number,
  latitude: number,
  url: string
) {
  return {
    symbol: new PictureMarkerSymbol({
      url,
      width: "32px",
      height: "32px",
    }),
    popup: {
      title: "{Name}",
      content: "{Description}",
    },
    attr: {
      Name: name,
      Description: description,
    },
    point: new Point({
      longitude,
      latitude,
    }),
  };
}

export function getPolygon(color: number[], rings: number[][][]) {
  return {
    geometry: new Polygon({
      rings,
    }),
    symbol: {
      type: "simple-fill",
      color,
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: [255, 255, 255],
        width: 1,
      },
    },
  };
}

export function getPolyline(color: number[], paths: number[][][]) {
  return {
    geometry: new Polyline({
      paths,
    }),
    symbol: {
      type: "simple-line",
      color,
      width: 4,
    },
  };
}
