import { classes } from "./";
const trip_schema = require("../template/trip_schema.json");
const LineString_schema = require("../template/LineString_schema.json");

const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
const trip_validator = ajv.compile(trip_schema);
const LineString_validator = ajv.compile(LineString_schema);

const parseGeofenceMarker = marker => {
  const { arrival, geofence } = marker;
  const arrivalPoint = new classes.Point(arrival.location.geometry);
  const geofencePoint = new classes.Point(geofence.geometry);
  const arrivalTime = arrival.location.recorded_at;
  const geofenceId = geofence.geofence_id;
  const geofenceMetadata = JSON.stringify(geofence.metadata, null, 2);
  const radius = Number(geofence.radius);
  return {
    arrival: {
      arrivalPoint,
      arrivalTime
    },
    geofence: {
      geofencePoint,
      geofenceId,
      geofenceMetadata,
      radius
    }
  };
};

const getStartEndData = ({ recorded_at, location }) => {
  let acc = {};
  if (recorded_at) acc.timestamp = recorded_at;
  if (location && location.geometry)
    acc.location = new classes.Point(location.geometry);
  return acc;
};

const parseDeviceStatusMarker = marker => {
  const { activity, duration } = marker;
  const deviceStatus = marker.value;
  const end = getStartEndData(marker.end);
  const start = getStartEndData(marker.start);
  let extra = {};
  if (activity) extra.activity = activity;
  if (duration) extra.duration = duration;
  return { start, end, deviceStatus, ...extra };
};

const markerTypeMap = {
  geofence: parseGeofenceMarker,
  device_status: parseDeviceStatusMarker
};

const parseMarker = ({ type, data }) =>
  markerTypeMap[type] ? markerTypeMap[type](data) : data;

const valid_device_status_states = [
  "disconnected",
  "inactive",
  "unknown",
  "stop",
  "walk",
  "run",
  "drive"
];

const getImageSource = variant =>
  `${process.env.PUBLIC_URL}/assets/${variant}.png`;

const getIcon = (deviceStatus, activity) =>
  valid_device_status_states.includes(activity)
    ? activity
    : valid_device_status_states.includes(deviceStatus)
    ? deviceStatus
    : "unknown";

const markersByType = markers => type => {
  const allMarkers = markers.reduce(
    (markers, currentMarker) => ({
      ...markers,
      [currentMarker.type]: markers[currentMarker.type]
        ? [parseMarker(currentMarker), ...markers[currentMarker.type]]
        : [parseMarker(currentMarker)]
    }),
    {}
  );
  return type && allMarkers[type] ? allMarkers[type] : allMarkers;
};

const secondsToHms = d => {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hDisplay = h > 0 ? h + " h " : "";
  const mDisplay = m > 0 ? m + " m " : "";
  const sDisplay = s > 0 ? s + " s" : "";
  return hDisplay + mDisplay + sDisplay;
};

const validatorMap = {
  trip: trip_validator,
  LineString: LineString_validator
};

const validateInputJSON = json => {
  const validate = validatorMap[json.type || "trip"];
  const valid = validate ? validate(json) : true;
  return !valid ? validate.errors : false;
};

const updateJson = "UPDATE_JSON";
const addNewJson = "ADD_NEW_JSON";
const changeJsonIndex = "UPDATE_JSON_INDEX";

const actions = {
  updateJson,
  addNewJson,
  changeJsonIndex
};

const actionMap = {
  [actions.updateJson]: (state, payload) => {
    let newState = { ...state };
    const { index, json } = payload;
    newState.jsons[index] = json;
    return newState;
  },
  [actions.addNewJson]: (state, payload) => {
    let newState = { ...state };
    const { json, noPageChange } = payload;
    newState.jsons[state.currentJson] = json;
    const newPosition = noPageChange ? state.currentJson : 1;
    newState.currentJson = newPosition;
    return newState;
  },
  [actions.changeJsonIndex]: (state, { index }) => {
    let newState = { ...state };
    newState.currentJson = index;
    return newState;
  }
};

const baseReducer = (state, { type, ...payload }) =>
  actionMap[type] ? actionMap[type](state, payload) : state;

export default {
  parseMarker,
  getIcon,
  secondsToHms,
  markersByType,
  validateInputJSON,
  valid_device_status_states,
  getImageSource,
  baseReducer,
  reducerActions: actions
};
