import React, { useState } from "react";
import { getFromBetween } from './utils';

import "./styles.scss";
import EditablePathWithPoints from "./EditablePathWithPoints";

const testSvgData = `<svg enable-background="new 0 0 512 512" version="1.1" viewBox="0 0 512 512" xml: space="preserve" xmlns="http://www.w3.org/2000/svg">
  <path d="m503.47 494.93h-17.067c-4.719 0-8.533 3.823-8.533 8.533s3.814 8.534 8.533 8.534h17.067c4.719 0 8.533-3.823 8.533-8.533s-3.814-8.534-8.533-8.534z" />
  <path d="m290.13 247.47c0-14.114-11.486-25.6-25.6-25.6s-25.6 11.486-25.6 25.6 11.486 25.6 25.6 25.6 25.6-11.486 25.6-25.6zm-34.133 0c0-4.702 3.831-8.533 8.533-8.533 4.71 0 8.533 3.831 8.533 8.533s-3.823 8.533-8.533 8.533c-4.702 0-8.533-3.831-8.533-8.533z" />
  <path d="m221.87 384c0 14.114 11.486 25.6 25.6 25.6s25.6-11.486 25.6-25.6-11.486-25.6-25.6-25.6-25.6 11.486-25.6 25.6zm34.133 0c0 4.702-3.831 8.533-8.533 8.533s-8.533-3.831-8.533-8.533 3.831-8.533 8.533-8.533 8.533 3.831 8.533 8.533z" />
  <path d="m307.19 306.09c-0.171-4.719-4.224-8.508-8.858-8.201-13.338 0.512-27.58 0.777-42.334 0.777-55.364 0-89.028-3.661-105.36-6.118l41.6-64.452c2.551-3.959 1.417-9.242-2.543-11.802-3.968-2.552-9.242-1.408-11.802 2.543l-48.529 75.204c-1.493 2.313-1.775 5.197-0.768 7.765 1.007 2.551 3.191 4.471 5.862 5.137 1.442 0.358 36.139 8.789 121.54 8.789 14.976 0 29.44-0.265 43-0.794 4.712-0.178 8.381-4.146 8.193-8.848z" />
  <path d="m401.07 213.33c0 4.71 3.814 8.533 8.533 8.533 0 4.71 3.814 8.533 8.533 8.533s8.533-3.823 8.533-8.533c4.719 0 8.533-3.823 8.533-8.533s-3.814-8.533-8.533-8.533c0-4.71-3.814-8.533-8.533-8.533s-8.533 3.823-8.533 8.533c-4.719 0-8.533 3.823-8.533 8.533z" />
  <path d="m192.54 143.51c3.755 2.85 9.105 2.099 11.947-1.647l51.319-67.729 71.142 99.61c-5.888 1.101-13.969 2.364-24.252 3.388-2.953 0.29-5.547 2.091-6.835 4.762-1.289 2.662-1.118 5.811 0.478 8.311l65.101 102.31c-7.117 1.075-17.442 2.389-31.181 3.507-2.995 0.247-5.649 2.048-6.972 4.753-1.323 2.697-1.126 5.897 0.521 8.414l3.32 5.077c1.63 2.509 4.369 3.866 7.151 3.866 1.596 0 3.217-0.444 4.659-1.391 1.758-1.143 2.944-2.825 3.507-4.685 23.398-2.347 34.492-4.966 35.012-5.094 2.688-0.64 4.89-2.543 5.922-5.094 1.033-2.56 0.777-5.453-0.708-7.782l-64.649-101.59c16.887-2.372 25.429-5.018 25.873-5.154 2.603-0.819 4.668-2.833 5.53-5.436 0.87-2.586 0.444-5.436-1.152-7.663l-83.738-117.25v-8.073l9.37 5.41c1.34 0.777 2.807 1.135 4.258 1.135 2.944 0 5.811-1.527 7.398-4.267 2.355-4.079 0.956-9.293-3.123-11.657l-9.361-5.402 9.37-5.41c4.079-2.355 5.478-7.578 3.123-11.657-2.372-4.087-7.603-5.487-11.656-3.123l-9.378 5.41v-10.827c-1e-3 -4.71-3.824-8.533-8.534-8.533s-8.533 3.823-8.533 8.533v10.82l-9.37-5.41c-4.087-2.364-9.293-0.956-11.657 3.123-2.355 4.087-0.956 9.301 3.123 11.665l9.37 5.402-9.37 5.41c-4.079 2.355-5.478 7.569-3.123 11.657 1.587 2.739 4.454 4.267 7.398 4.267 1.451 0 2.918-0.367 4.258-1.143l9.37-5.402v7.945l-56.576 74.692c-2.849 3.754-2.107 9.113 1.648 11.955z" />
  <path d="m366.93 68.267h8.533v8.533c0 4.71 3.814 8.533 8.533 8.533s8.533-3.823 8.533-8.533v-8.533h8.533c4.719 0 8.533-3.823 8.533-8.533s-3.814-8.533-8.533-8.533h-8.533v-8.533c0-4.71-3.814-8.533-8.533-8.533s-8.533 3.823-8.533 8.533v8.532h-8.533c-4.719 0-8.533 3.823-8.533 8.533s3.814 8.534 8.533 8.534z" />
  <path d="m85.333 256h8.533c4.71 0 8.533-3.823 8.533-8.533s-3.823-8.533-8.533-8.533h-8.533v-8.534c0-4.71-3.823-8.533-8.533-8.533s-8.533 3.823-8.533 8.533v8.533h-8.533c-4.71 0-8.533 3.823-8.533 8.533s3.822 8.534 8.532 8.534h8.533v8.533c0 4.71 3.823 8.533 8.533 8.533s8.533-3.823 8.533-8.533v-8.533z" />
  <path d="m145.07 375.47c14.114 0 25.6-11.486 25.6-25.6s-11.486-25.6-25.6-25.6-25.6 11.486-25.6 25.6 11.486 25.6 25.6 25.6zm0-34.134c4.702 0 8.533 3.831 8.533 8.533s-3.831 8.533-8.533 8.533-8.533-3.831-8.533-8.533 3.831-8.533 8.533-8.533z" />
  <path d="m59.733 494.93h-51.2c-4.71 0-8.533 3.823-8.533 8.533s3.823 8.534 8.533 8.534h51.2c4.71 0 8.533-3.823 8.533-8.533s-3.822-8.534-8.533-8.534z" />
  <path d="m94.259 420.69c0.768 2.44 2.594 4.412 4.966 5.367 1.809 0.717 45.483 17.672 156.77 17.672 111.3 0 154.96-16.956 156.77-17.672 2.415-0.973 4.258-2.978 5.009-5.47 0.742-2.483 0.316-5.18-1.161-7.313l-31.479-45.449c4.565-4.625 7.398-10.965 7.398-17.963 0-14.114-11.486-25.6-25.6-25.6s-25.6 11.486-25.6 25.6 11.486 25.6 25.6 25.6c0.87 0 1.69-0.171 2.543-0.256l26.436 38.144c-18.483 4.787-62.31 13.312-139.91 13.312-78.029 0-121.91-8.619-140.2-13.38l12.663-19.268c2.594-3.934 1.493-9.225-2.441-11.81-3.934-2.586-9.225-1.493-11.819 2.441l-18.927 28.8c-1.404 2.142-1.78 4.796-1.012 7.245zm272.67-62.293c-4.71 0-8.533-3.831-8.533-8.533s3.823-8.533 8.533-8.533 8.533 3.831 8.533 8.533-3.822 8.533-8.533 8.533z" />
  <path d="m196.27 204.8c8.175 0 15.386-3.917 20.079-9.907 7.049 0.521 21.274 1.374 39.654 1.374 6.127 0 11.904-0.085 17.331-0.256 4.71-0.145 8.414-4.079 8.269-8.798-0.154-4.71-4.079-8.559-8.798-8.26-5.265 0.162-10.863 0.247-16.802 0.247-14.635 0-26.65-0.572-34.244-1.05-0.563-13.619-11.733-24.55-25.489-24.55-14.114 0-25.6 11.486-25.6 25.6s11.486 25.6 25.6 25.6zm0-34.133c4.702 0 8.533 3.831 8.533 8.533s-3.831 8.533-8.533 8.533-8.533-3.831-8.533-8.533c-1e-3 -4.702 3.831-8.533 8.533-8.533z" />
  <path d="m452.27 494.93h-162.13v-34.133c0-4.71-3.814-8.533-8.533-8.533s-8.533 3.823-8.533 8.533v34.133h-34.133v-34.133c0-4.71-3.823-8.533-8.533-8.533s-8.533 3.823-8.533 8.533v34.133h-128c-4.71 0-8.533 3.823-8.533 8.533s3.821 8.534 8.532 8.534h358.4c4.719 0 8.533-3.823 8.533-8.533s-3.814-8.534-8.533-8.534z" />
  <path d="m136.53 119.47c0 4.71 3.823 8.533 8.533 8.533s8.533-3.823 8.533-8.533c4.71 0 8.533-3.823 8.533-8.533s-3.823-8.533-8.533-8.533c0-4.71-3.823-8.533-8.533-8.533s-8.533 3.823-8.533 8.533c-4.71 0-8.533 3.823-8.533 8.533s3.823 8.533 8.533 8.533z" />
  <path d="m85.333 34.133c0 4.71 3.823 8.533 8.533 8.533s8.533-3.823 8.533-8.533c4.71 0 8.533-3.823 8.533-8.533s-3.823-8.533-8.533-8.533c0-4.71-3.823-8.533-8.533-8.533s-8.533 3.823-8.533 8.533c-4.71 0-8.533 3.823-8.533 8.533s3.823 8.533 8.533 8.533z" />
</svg>`;

const EditableSVGWithPoints = () => {
  const [svgData, setSvgData] = useState(testSvgData);
  const [arePointsVisible, setPointsVisibility] = useState(false);

  const getEditablePathsWithPoints = (svgData) => {
    console.log(svgData);
    const paths = getFromBetween.get(svgData, "<path", "/>");
    return paths.filter(path => path.includes('d=')).map(path => {
      const data = getFromBetween.get(path, "d=\"", "\"")
      return <EditablePathWithPoints data={data[0]} scaleX={1} scaleY={1} />
    });
  };

  const getPaths = (svgData) => {
    const paths = getFromBetween.get(svgData, "<path", "/>");
    return paths.filter(path => path.includes('d=')).map(path => {
      const data = getFromBetween.get(path, "d=\"", "\"")
      return <path d={data[0]} fill="none" stroke="black" />
    });
  }

  console.log(getEditablePathsWithPoints(svgData));

  return <div>
    <div className="container">
      <div className="visual">
        <svg width={"480px"} height={"600px"}>
          <g transform="translate(0)">
            {getPaths(svgData)}
          </g>
        </svg>
      </div>
      <div className="actions">
        <button className="button" onClick={() => setPointsVisibility(!arePointsVisible)}>
          {arePointsVisible ? "hide points" : "show points"}
        </button>
        <textarea class="textarea" rows={10} value={svgData} onChange={e => setSvgData(e.target.value)} placeholder="enter svg data :)"></textarea>
      </div>
    </div>
    {getEditablePathsWithPoints(svgData)}
  </div>;
  };
  
export default EditableSVGWithPoints;