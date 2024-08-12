import React, { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import Graphic from "@arcgis/core/Graphic";

import "./App.css";
import {
  hanbatUniversitypolygon,
  oneKilometerpolygon,
  subwayStationToSchool,
} from "./utils/constants";
import {
  getPolygon,
  getPolyline,
  getSchoolBuildingGraphic,
} from "./utils/func";

function App() {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      const map = new Map({
        basemap: "topo-vector",
      });

      const view = new MapView({
        container: "mapDiv", // Reference to the DOM node that will contain the view
        map: map, // References the map object created in step 3
        center: [127.30140056674452, 36.351068322405965],
        zoom: 15,
      });

      const {
        symbol: n1Symbol,
        popup: n1Popup,
        attr: n1Attr,
        point: n1Point,
      } = getSchoolBuildingGraphic(
        "N1",
        "The headquarters of a university",
        127.29961161816578,
        36.35143165755672,
        "/images/university_3833679.png"
      );
      const n1PointGraphic = new Graphic({
        geometry: n1Point,
        symbol: n1Symbol,
        popupTemplate: n1Popup,
        attributes: n1Attr,
      });

      const {
        symbol: s1Symbol,
        popup: s1Popup,
        attr: s1Attr,
        point: s1Point,
      } = getSchoolBuildingGraphic(
        "S1",
        "Library",
        127.3016986604523,
        36.350939865286435,
        "/images/library_8074813.png"
      );
      const s1PointGraphic = new Graphic({
        geometry: s1Point,
        symbol: s1Symbol,
        popupTemplate: s1Popup,
        attributes: s1Attr,
      });

      const { symbol: hanbatUnivAreaSymbol, geometry: hanbatUnivAreaGeomerty } =
        getPolygon([218, 230, 109, 0.5], hanbatUniversitypolygon);
      const polygonGraphic = new Graphic({
        geometry: hanbatUnivAreaGeomerty,
        symbol: hanbatUnivAreaSymbol,
      });
      const { symbol: circleSymbol, geometry: circleGeomerty } = getPolygon(
        [51, 199, 199, 0.5],
        oneKilometerpolygon
      );
      const circlePolygonGrapic = new Graphic({
        geometry: circleGeomerty,
        symbol: circleSymbol,
      });
      const {
        symbol: subwayStationToSchoolSymbol,
        geometry: subwayStationToSchoolGeometry,
      } = getPolyline([242, 64, 115], subwayStationToSchool);
      const subwayStationToSchoolLine = new Graphic({
        symbol: subwayStationToSchoolSymbol,
        geometry: subwayStationToSchoolGeometry,
      });
      view.graphics.addMany([
        circlePolygonGrapic,
        polygonGraphic,
        subwayStationToSchoolLine,
        n1PointGraphic,
        s1PointGraphic,
      ]);
    }
  }, [mapDiv]);

  return <div id="mapDiv" ref={mapDiv}></div>;
}

export default App;
