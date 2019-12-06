(this.webpackJsonpatlas2=this.webpackJsonpatlas2||[]).push([[0],{105:function(e,t,r){},106:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),i=r(9),o=r.n(i),c=(r(55),r(8)),u=r(43),s=r(13),l=r(112),m=r(1),p=r(109),d=r(110),y=r(111),f=r(20),g=r(15),v=r.n(g),b=r(21),E=r.n(b),O=function(e,t){var r=t;if(e.current.getLayer(t)||e.current.getLayer("".concat(t,"1"))){r=e.current.getLayer(t)?"".concat(t,"1"):t;var a=e.current.getLayer(t)?t:"".concat(t,"1");e.current.removeLayer(a),e.current.removeSource(a)}return r},h=function(e,t,r){t.current.getCanvas().style.cursor="pointer";for(var a=e.features[0].geometry.coordinates.slice(),n=e.features[0].properties.description;Math.abs(e.lngLat.lng-a[0])>180;)a[0]+=e.lngLat.lng>a[0]?360:-360;r.current.setLngLat(a).setHTML(n).addTo(t.current)},S=function(e,t){e.current.getCanvas().style.cursor="",t.current.remove()},N={plotLine:function(e,t,r,a){var n=O(e,"route");e.current.addLayer({id:n,type:"line",source:{type:"geojson",data:{type:"Feature",properties:{},geometry:r}},layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"#6f4cff","line-width":8}}).fitBounds(function(e){var t=new v.a.LngLat(e[0][0],e[0][1]),r=new v.a.LngLatBounds(t,t);return e.reduce((function(e,t){var r=Object(c.a)(t,2),a=r[0],n=r[1];return e.extend(new v.a.LngLat(a,n))}),r)}(r.coordinates),{padding:{top:40,bottom:40,left:20,right:20}}),n=O(e,"locationMarkers"),e.current.addLayer({id:n,type:"symbol",source:{type:"geojson",data:{type:"FeatureCollection",features:r.coordinates.map((function(e){var t=Object(c.a)(e,4),r=t[0],n=t[1],i=t[2],o=t[3];return{type:"Feature",properties:{description:E.a.renderToString(a({type:"locationMarker",coordinates:[n,r],alt:i,recorded_at:o})),icon:"marker"},geometry:new w.Point({type:"Point",coordinates:[r,n]})}}))}},layout:{"icon-image":"{icon}-15","icon-allow-overlap":!1}}),e.current.on("mouseenter",n,(function(r){return h(r,e,t)})),e.current.on("mouseleave",n,(function(){return S(e,t)}))},plotMarkers:function(e,t,r,a){var n=O(e,"deviceStatusMarkers");e.current.addLayer({id:n,type:"symbol",source:{type:"geojson",data:{type:"FeatureCollection",features:r.reduce((function(e,t){var r=t.start,n=t.end,i=t.deviceStatus,o=t.activity,c=t.duration;return r.location&&n.location?[].concat(Object(f.a)(e),[{type:"Feature",properties:{description:E.a.renderToString(a({type:"deviceStatusMarker",start:r,end:n,deviceStatus:i})),icon:B.getIcon(i,o,"circle-stroked")},geometry:r.location},{type:"Feature",properties:{description:E.a.renderToString(a({type:"deviceStatusMarker",start:r,end:n,deviceStatus:i,activity:o,duration:c})),icon:B.getIcon(i,o,"circle")},geometry:n.location}]):[].concat(Object(f.a)(e),[{type:"Feature",properties:{description:E.a.renderToString(a({type:"deviceStatusMarker",start:r,end:n,deviceStatus:i,activity:o,duration:c})),icon:B.getIcon(i,o)},geometry:n.location||r.location}])}),[])}},layout:{"icon-image":"{icon}-15","icon-allow-overlap":!0}}),e.current.on("mouseenter",n,(function(r){return h(r,e,t)})),e.current.on("mouseleave",n,(function(){return S(e,t)}))}},j=r(27),w={Line:function e(t){var r=t.type,a=t.coordinates;Object(j.a)(this,e),this.type=r,this.coordinates=a},Point:function e(t){var r=t.type,a=t.coordinates;Object(j.a)(this,e),this.type=r,this.coordinates=a}},k={useMap:function(e){var t=n.a.useRef();return n.a.useEffect((function(){t&&t.current||(t.current=new v.a.Map({container:e,style:"mapbox://styles/mapbox/streets-v9",accessToken:"pk.eyJ1IjoiaHlwZXJ0cmFjay1kZXZvcHMiLCJhIjoiY2ptZzVndTduMWZ0YzNrbzFuNXR0cHUyOSJ9.Te8DokzaOXSVdh7ntUptyA",keyboard:!0,center:[0,0]}))}),[e]),t},usePopup:function(e,t){var r=n.a.useRef(new v.a.Popup({closeButton:!1,closeOnClick:!1}));return n.a.useEffect((function(){e.current.on("load",(function(){r.current.addTo(e.current)}))}),[e,r]),r}},_=r(28);function L(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function M(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?L(Object(r),!0).forEach((function(t){Object(_.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):L(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var J=r(57),I=r(58),T=new(r(59))({allErrors:!0}),x=T.compile(J),P=T.compile(I),C=function(e){var t=e.recorded_at,r=e.location,a={};return t&&(a.timestamp=t),r&&r.geometry&&(a.location=new w.Point(r.geometry)),a},D={geofence:function(e){var t=e.arrival,r=e.geofence,a=new w.Point(t.location.geometry),n=new w.Point(r.geometry);return{arrival:{arrivalPoint:a,arrivalTime:t.location.recorded_at},geofence:{geofencePoint:n,geofenceId:r.geofence_id,geofenceMetadata:JSON.stringify(r.metadata,null,2),radius:Number(r.radius)}}},device_status:function(e){var t=e.activity,r=e.duration,a=e.value,n=C(e.end),i=C(e.start),o={};return t&&(o.activity=t),r&&(o.duration=r),M({start:i,end:n,deviceStatus:a},o)}},F=function(e){var t=e.type,r=e.data;return D[t](r)},A={stop:"cafe",walk:"pitch",run:"skiing",drive:"car",cycle:"bicycle",disconnected:"cross",inactive:"roadblock",active:"rocket"},z={trip:x,LineString:P},B={parseMarker:F,getIcon:function(e,t,r){return A[t]||r||A[e]},secondsToHms:function(e){e=Number(e);var t=Math.floor(e/3600),r=Math.floor(e%3600/60),a=Math.floor(e%3600%60);return(t>0?t+" h ":"")+(r>0?r+" m ":"")+(a>0?a+" s":"")},markersByType:function(e){return function(t){var r=e.reduce((function(e,t){return M({},e,Object(_.a)({},t.type,e[t.type]?[F(t)].concat(Object(f.a)(e[t.type])):[F(t)]))}),{});return t&&r[t]?r[t]:r}},validateInputJSON:function(e){var t=z[e.type||"trip"];return!(!t||t(e))&&t.errors}},R=(r(37),function(e){var t=e.trip,r=e.showTripModal,a=e.updateJson,i=e.hideModal,o=e.showModal,f=e.fetchError,g=n.a.useState(JSON.stringify(t,null,"\t")),v=Object(c.a)(g,2),b=v[0],E=v[1],O=n.a.useState(void 0),h=Object(c.a)(O,2),S=h[0],N=h[1],j=n.a.useState(void 0),w=Object(c.a)(j,2),k=w[0],_=w[1];n.a.useEffect((function(){JSON.stringify(t)!==JSON.stringify(b)&&E(JSON.stringify(t,null,"\t"))}),[t]),n.a.useEffect((function(){f&&f!==k&&_({fetchError:f})}),[f]);var L=function(e){var t=B.validateInputJSON(e);return t&&t.length?_(t):_(null),Boolean(t)};return n.a.createElement(n.a.Fragment,null,n.a.createElement(u.a,{intent:s.a.SUCCESS,className:"show-trip-button",onClick:function(){return r?i():o()}},"Update JSON"),n.a.createElement(l.a,{isOpen:k||r,title:"Add your own JSON",onClose:i,className:"dialog"},n.a.createElement("div",{className:m.a.DIALOG_BODY},n.a.createElement("div",{className:"dialog-container"},n.a.createElement(p.a,{value:b,disabled:!1,onChange:function(e){return E(e.target.value)},className:"user-summary-input",placeholder:"Paste trip_summary here",onBlur:function(e){e&&e.preventDefault();var t=e.target.value;if(t)try{var r=JSON.parse(t);L(r)}catch(a){console.error(a),_(a)}}}),k?n.a.createElement("div",{className:"error-table-container"},Array.isArray(k)?n.a.createElement(d.a,{className:"error-table",bordered:!0},n.a.createElement("caption",null,"There ",k.length>1?"are":"is an"," ",k.length>1?k.length:""," issue",k.length>1?"s":""),n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Location"),n.a.createElement("th",null,"Issue"))),n.a.createElement("tbody",null,k.map((function(e){return n.a.createElement("tr",{key:e.dataPath},n.a.createElement("td",null,n.a.createElement("div",{className:"table-content"},e.dataPath)),n.a.createElement("td",null,n.a.createElement("div",{className:"table-content"},e.message)))})))):n.a.createElement("div",{className:"error-table error"},k.message?k.message:JSON.stringify(k))):null)),n.a.createElement("div",{className:m.a.DIALOG_FOOTER},n.a.createElement("div",{className:m.a.DIALOG_FOOTER_ACTIONS},n.a.createElement(y.a,{text:S,buttonText:"Browse",className:"file-input",onInputChange:function(e){e&&e.preventDefault();var t=new FileReader,r=e.target.files[0];N(r&&r.name?r.name:void 0),t.readAsText(r,"UTF-8"),t.onload=function(e){var t=e.target.result,r=JSON.parse(t);E(t),L(r)||(a(r),i())}},inputProps:{accept:".json"}}),n.a.createElement(u.a,{disabled:k&&k.length||!b,onClick:function(e){E(JSON.stringify(t,null,"\t")),i()}},"Close"),n.a.createElement(u.a,{intent:s.a.PRIMARY,disabled:k&&k.length||!b,onClick:function(e){try{var t=JSON.parse(b);a(t),i()}catch(r){console.error(r),_(r)}}},"Update")))))}),H=r(44),U=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],Y=function(e){return U[e.getMonth()]+" "+e.getDate()+", "+e.getFullYear()+" "+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()},Z={deviceStatusMarker:function(e){var t=e.start,r=e.end,a=(e.deviceStatus,e.activity),i=e.duration;return n.a.createElement("tbody",null,t?n.a.createElement("tr",{className:"capitalize"},n.a.createElement("td",null,"Start Time"),n.a.createElement("td",null,Y(new Date(t.timestamp)))):null,r?n.a.createElement("tr",{className:"capitalize"},n.a.createElement("td",null,"End Time"),n.a.createElement("td",null,Y(new Date(r.timestamp)))):null,i?n.a.createElement("tr",null,n.a.createElement("td",null,"Duration"),n.a.createElement("td",null,B.secondsToHms(i))):null,a?n.a.createElement("tr",null,n.a.createElement("td",null,"Activity"),n.a.createElement("td",{className:"capitalize"},a)):null)},locationMarker:function(e){var t=Object(c.a)(e.coordinates,2),r=t[0],a=t[1],i=e.alt,o=e.recorded_at;return n.a.createElement("tbody",null,n.a.createElement("tr",null,n.a.createElement("td",null,"Coordinates"),n.a.createElement("td",{className:"capitalize"},r," ",a)),i?n.a.createElement("tr",null,n.a.createElement("td",null,"Altitude"),n.a.createElement("td",{className:"capitalize"},i)):null,o?n.a.createElement("tr",null,n.a.createElement("td",null,"Recorded at"),n.a.createElement("td",{className:"capitalize"},Y(new Date(o)))):null)}},X={locationMarker:function(){return"location"},deviceStatusMarker:function(e){return e.deviceStatus}},G=function(e){var t=e.type,r=Object(H.a)(e,["type"]);return n.a.createElement("table",{className:"device-status-table"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",{colSpan:2,className:"capitalize"},X[t](r)))),Z[t](r))},V=(r(103),r(104),r(105),"map-container"),W=function(e){return n.a.createElement(G,e)},q=new URLSearchParams(window.location.search).get("gist");var K=function(){var e=n.a.useState(!0),t=Object(c.a)(e,2),r=t[0],a=t[1],i=n.a.useState(void 0),o=Object(c.a)(i,2),u=o[0],s=o[1],l=n.a.useState(void 0),m=Object(c.a)(l,2),p=m[0],d=m[1],y=k.useMap(V),f=k.usePopup(y),g=function(e,t){if(s(e),t||localStorage.setItem("previousJSON",JSON.stringify(e,null,"\t")),"LineString"===e.type){var r=new w.Line(e);N.plotLine(y,f,r,W)}else try{var a=e.summary,n=a.locations,i=a.markers,o=new w.Line(n),c=B.markersByType(i)("device_status");N.plotLine(y,f,o,W),N.plotMarkers(y,f,c,W)}catch(p){d(p)}};return n.a.useEffect((function(){if(q){var e=q.split("/").pop();fetch("https://api.github.com/gists/".concat(e)).then((function(e){return e.json()})).then((function(e){if(e.message)d(e.message);else{var t=JSON.parse(e.files["default.json"]?e.files["default.json"].content:Object.values(e.files)[0].content);s(t)}})).catch((function(e){return d(e)}))}else{var t=localStorage.getItem("previousJSON"),r=JSON.parse(t);r&&y.current.on("load",(function(){g(r,!0)}))}}),[]),n.a.createElement("div",{className:"app-container"},n.a.createElement("div",{id:V}),n.a.createElement(R,{fetchError:p,trip:u,showTripModal:r,showModal:function(){return a(!0)},hideModal:function(){return a(!1)},updateJson:g}))};o.a.render(n.a.createElement(K,null),document.getElementById("root"))},37:function(e,t,r){},50:function(e,t,r){e.exports=r(106)},55:function(e,t,r){},57:function(e){e.exports=JSON.parse('{"properties":{"trip_id":{"type":"string","format":"uuid"},"device_id":{"type":"string","format":"uuid"},"started_at":{"type":"string","format":"date-time"},"completed_at":{"type":"string","format":"date-time"},"status":{"type":"string"},"views":{"properties":{"embed_url":{"type":"string","format":"uri"},"share_url":{"type":"string","format":"uri"}}},"analytics":{"properties":{"total_duration":{"type":"number"},"active_count":{"type":"number"},"active_duration":{"type":"number"},"stop_count":{"type":"number"},"stop_duration":{"type":"number"},"active_distance":{"type":"number"},"walk_count":{"type":"number"},"walk_duration":{"type":"number"},"walk_distance":{"type":"number"},"drive_count":{"type":"number"},"drive_duration":{"type":"number"},"drive_distance":{"type":"number"},"inactive_count":{"type":"number"},"inactive_duration":{"type":"number"}}},"summary":{"properties":{"distance":{"type":"number"},"duration":{"type":"number"},"started_at":{"type":"string","format":"date-time"},"completed_at":{"type":"string","format":"date-time"},"device_id":{"type":"string","format":"uuid"},"locations":{"properties":{"type":{"type":"string"},"coordinates":{"type":"array","items":{"type":"array","maxItems":4,"minItems":2,"items":[{"type":"number","minimum":-179.999999,"maximum":179.999999},{"type":"number","minimum":-89.999999,"maximum":89.999999},{"type":["number","null"],"minimum":-12262,"maximum":11000},{"type":"string","format":"date-time"}]}}}},"markers":{"type":"array","items":[{"properties":{"type":{"type":"string"},"data":{"properties":{"activity":{"type":"string"},"duration":{"type":"number"},"value":{"type":"string"},"start":{"properties":{"recorded_at":{"type":"string","format":"date-time"},"location":{"properties":{"recorded_at":{"type":"string","format":"date-time"},"geometry":{"properties":{"type":{"type":"string"},"coordinates":{"type":"array","maxItems":4,"minItems":2,"items":[{"type":"number","minimum":-179.999999,"maximum":179.999999},{"type":"number","minimum":-89.999999,"maximum":89.999999},{"type":["number","null"],"minimum":-12262,"maximum":11000},{"type":"string","format":"date-time"}]}}}}}}},"end":{"properties":{"recorded_at":{"type":"string","format":"date-time"},"location":{"properties":{"recorded_at":{"type":"string","format":"date-time"},"geometry":{"properties":{"type":{"type":"string"},"coordinates":{"type":"array","maxItems":4,"minItems":2,"items":[{"type":"number","minimum":-179.999999,"maximum":179.999999},{"type":"number","minimum":-89.999999,"maximum":89.999999},{"type":["number","null"],"minimum":-12262,"maximum":11000},{"type":"string","format":"date-time"}]}}}}}}}}}}}]}}}}}')},58:function(e){e.exports=JSON.parse('{"properties":{"type":{"type":"string"},"coordinates":{"type":"array","items":{"type":"array","maxItems":4,"minItems":2,"items":[{"type":"number","minimum":-179.999999,"maximum":179.999999},{"type":"number","minimum":-89.999999,"maximum":89.999999},{"type":["number","null"],"minimum":-12262,"maximum":11000},{"type":"string","format":"date-time"}]}}}}')}},[[50,1,2]]]);
//# sourceMappingURL=main.bab3fd4a.chunk.js.map