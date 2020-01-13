import React from "react";

import TripInfoModal from "./components/TripInfoModal";
import DeviceStatusTable from "./components/DeviceStatusTable";

import { mapUtils, hooks, classes, utils } from "./common";

import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "./App.css";

const mapContainerId = "map-container";

const getStatusTable = props => <DeviceStatusTable {...props} />;

const params = new URLSearchParams(window.location.search);

const gistURL = params.get("gist");

const locationArrays = params.get("locations");

const shed_animation = params.get("shed_animation") === "true";

const urlAccessToken = params.get("accessToken");

const hash =
  params.get("hash") && params.get("hash") === "false" ? false : true;

const coordinates = JSON.parse(locationArrays);

function App() {
  const [showTripModal, updateShowTripModal] = React.useState(true);

  const [json, updateJson] = React.useState(undefined);
  const [error, updateError] = React.useState(undefined);

  const [state, dispatch] = React.useReducer(utils.baseReducer, {
    jsons: [],
    currentJson: 0
  });
  const { jsons, currentJson } = state || {};

  const accessToken = hooks.useAccessToken(urlAccessToken, updateError);
  const fitBoundsOptions = { linear: shed_animation };

  const mapRef = hooks.useMap(mapContainerId, {
    accessToken,
    hash,
    fitBoundsOptions
  });
  const markersRef = React.useRef([]);

  const locationPopupRef = hooks.usePopup(mapRef);
  const deviceStatusPopupRef = hooks.usePopup(mapRef, { offset: 10 });

  React.useEffect(() => {
    if (accessToken) {
      if (gistURL) {
        const gistId = gistURL.split("/").pop();
        fetch(`https://api.github.com/gists/${gistId}`)
          .then(response => response.json())
          .then(data => {
            if (data.message) {
              console.error(data.message);
              updateError(data.message);
            } else {
              const json = JSON.parse(
                data.files["default.json"]
                  ? data.files["default.json"].content
                  : Object.values(data.files)[0].content
              );
              updateJson(json);
            }
          })
          .catch(error => {
            console.error(error);
            updateError(error);
          });
      } else if (coordinates && coordinates.length) {
        const line = new classes.Line({ coordinates, type: "LineString" });
        mapRef.current.on("load", () =>
          handleJsonUpdate({
            json: line,
            fromLocalStorage: true,
            showModal: false
          })
        );
      } else {
        const previousJSON = localStorage.getItem("previousJSON");
        const tripJSON = JSON.parse(previousJSON);
        if (tripJSON)
          mapRef.current.on("load", () =>
            handleJsonUpdate({ json: tripJSON, fromLocalStorage: true })
          );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  React.useEffect(() => {
    if (jsons) updateJson(jsons[currentJson]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentJson]);

  React.useEffect(() => {
    const indexNameMap = {
      0: "_zero_",
      1: "_one_"
    };
    jsons.forEach((json, index) => {
      if (json.type === "LineString") {
        const line = new classes.Line(json);
        mapUtils.plotLine({
          mapRef,
          popupRef: locationPopupRef,
          line,
          getStatusTable,
          fitBoundsOptions,
          index: indexNameMap[index]
        });
      } else {
        try {
          const { locations, markers } = json.summary;
          const line = new classes.Line(locations);
          const deviceStatusMarkers = utils.markersByType(markers)(
            "device_status"
          );
          mapUtils.plotLine({
            mapRef,
            popupRef: locationPopupRef,
            line,
            getStatusTable,
            fitBoundsOptions,
            index: indexNameMap[index]
          });
          mapUtils.useMarkers({
            mapRef,
            popupRef: deviceStatusPopupRef,
            markersRef,
            deviceStatusMarkers,
            getStatusTable,
            index: indexNameMap[index]
          });
        } catch (error) {
          console.error(error);
          updateError(error);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jsons.length]);

  const handleJsonUpdate = ({
    json,
    fromLocalstorage,
    showModal,
    noPageChange
  }) => {
    updateJson(json);
    dispatch({ type: utils.reducerActions.addNewJson, json, noPageChange });
    if (!fromLocalstorage)
      localStorage.setItem("previousJSON", JSON.stringify(json, null, "\t"));
    updateShowTripModal(!showModal);
  };

  const goToPageZero = () =>
    dispatch({ type: utils.reducerActions.changeJsonIndex, index: 0 });

  return (
    <div className="app-container">
      {accessToken && <div id={mapContainerId} />}
      <TripInfoModal
        fetchError={error}
        trip={json}
        showTripModal={showTripModal}
        showModal={() => updateShowTripModal(true)}
        hideModal={() => updateShowTripModal(false)}
        updateJson={handleJsonUpdate}
        currentJsonIndex={currentJson}
        goToPageZero={goToPageZero}
      />
    </div>
  );
}

export default App;
