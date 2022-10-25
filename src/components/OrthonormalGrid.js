import React, { Component } from "react";
import { split, mergeTiles } from "geo-splitter";

import * as d3 from "d3";
import Grid from "./Orthonormal/Grid";
import { randomColor } from "../utils/randomColor";

class OrthonormalGrid extends Component {
  constructor(props) {
    super(props);
    if (props.type === "splitted") {
      const splitted = split(
        props.data,
        props.xMin,
        props.xMax,
        props.yMin,
        props.yMax,
        props.gridSize
      );
      const builtBack = mergeTiles(splitted, 10);
      this.state = {
        splitted,
        builtBack,
      };
    }
  }

  renderFullSamplePolygons() {
    const { zoom } = this.props;
    return this.props.data.features.map((feature) => {
      return feature.geometry.coordinates.map((polygon) => {
        const path = d3.line()(
          polygon.map((coord) => [
            coord[0] * 10 * zoom,
            (this.props.yMax - coord[1]) * 10 * zoom,
          ])
        );
        return <path d={path} stroke="none" fill="#e2980c" />;
      });
    });
  }

  renderFullSamplePoints() {
    const { zoom } = this.props;
    return this.props.data.features.map((feature) => {
      return feature.geometry.coordinates.map((polygon) =>
        polygon.map((coord) => (
          <circle
            cx={coord[0] * 10 * zoom}
            cy={(this.props.yMax - coord[1]) * 10 * zoom}
            r="4"
            stroke="none"
            fill="white"
          />
        ))
      );
    });
  }

  renderSplittedPolygons() {
    const { zoom } = this.props;
    return this.state.splitted.map((file) => {
      const color = randomColor();
      return file.features.map((feature) => {
        return feature.geometry.coordinates.map((polygon) => {
          const path = d3.line()(
            polygon.map((coord) => [
              coord[0] * 10 * zoom,
              (this.props.yMax - coord[1]) * 10 * zoom,
            ])
          );
          return <path d={path} stroke="none" fill={color} />;
        });
      });
    });
  }

  renderSplittedPoints() {
    const { zoom } = this.props;
    return this.state.splitted.map((file) => {
      return file.features.map((feature) => {
        return feature.geometry.coordinates.map((polygon) =>
          polygon.map((coord) => (
            <circle
              cx={coord[0] * 10 * zoom}
              cy={(this.props.yMax - coord[1]) * 10 * zoom}
              r="4"
              stroke="none"
              fill="white"
            />
          ))
        );
      });
    });
  }

  renderMergedSamplePolygons() {
    const { zoom } = this.props;
    return this.state.builtBack.features.map((feature) => {
      return feature.geometry.coordinates.map((polygon) => {
        const path = d3.line()(
          polygon.map((coord) => [
            coord[0] * 10 * zoom,
            (this.props.yMax - coord[1]) * 10 * zoom,
          ])
        );
        return <path d={path} stroke="none" fill="#e2980c" />;
      });
    });
  }

  renderMergedSamplePoints() {
    const { zoom } = this.props;
    return this.state.builtBack.features.map((feature) => {
      return feature.geometry.coordinates.map((polygon) =>
        polygon.map((coord) => (
          <circle
            cx={coord[0] * 10 * zoom}
            cy={(this.props.yMax - coord[1]) * 10 * zoom}
            r="4"
            stroke="none"
            fill="white"
          />
        ))
      );
    });
  }

  renderPolygons() {
    switch (this.props.type) {
      case "original":
        return this.renderFullSamplePolygons();
      case "splitted":
        return this.renderSplittedPolygons();
      case "built-back":
        return this.renderMergedSamplePolygons();
      default:
        return null;
    }
  }

  renderPoints() {
    switch (this.props.type) {
      case "original":
        return this.renderFullSamplePoints();
      case "splitted":
        return this.renderSplittedPoints();
      case "built-back":
        return this.renderMergedSamplePoints();
      default:
        return null;
    }
  }

  renderZone() {
    const origin = this.props.highlight;
    const { gridSize, zoom } = this.props;
    if (!origin) {
      return null;
    } else {
      const line = [
        [origin.minX, origin.minY],
        [origin.minX, origin.minY + gridSize],
        [origin.minX + gridSize, origin.minY + gridSize],
        [origin.minX + gridSize, origin.minY],
        [origin.minX, origin.minY],
      ];
      const path = d3.line()(
        line.map((coord) => [
          coord[0] * 10 * zoom,
          (this.props.yMax - coord[1]) * 10 * zoom,
        ])
      );
      return (
        <path d={path} stroke="rgb(31, 185, 108)" strokeWidth="2" fill="none" />
      );
    }
  }

  renderExtraPoints() {
    const { zoom } = this.props;
    if (!this.props.extraPoints) {
      return null;
    } else {
      return this.props.extraPoints.map((coord) => (
        <circle
          cx={coord[0] * 10 * zoom}
          cy={(this.props.yMax - coord[1]) * 10 * zoom}
          r="6"
          stroke="white"
          fill="rgb(226, 152, 12)"
        />
      ));
    }
  }

  renderExtraLines() {
    const { zoom } = this.props;
    if (!this.props.extraLines) {
      return null;
    } else {
      return this.props.extraLines.map((line) => {
        const path = d3.line()(
          line.map((coord) => [
            coord[0] * 10 * zoom,
            (this.props.yMax - coord[1]) * 10 * zoom,
          ])
        );
        return <path d={path} stroke="red" fill="none" />;
      });
    }
  }

  renderExtraLinesPoints() {
    const { zoom } = this.props;
    if (!this.props.extraLines) {
      return null;
    } else {
      return this.props.extraLines.map((line) =>
        line.map((coord) => (
          <circle
            cx={coord[0] * 10 * zoom}
            cy={(this.props.yMax - coord[1]) * 10 * zoom}
            r="4"
            stroke="none"
            fill="white"
          />
        ))
      );
    }
  }

  render() {
    const {
      xMin,
      xMax,
      yMin,
      yMax,
      data,
      extraLines,
      renderPoints,
      renderExtraLinePoints,
      zoom,
      gridSize,
    } = this.props;
    return (
      <svg height={(yMax - yMin) * 10 * zoom} width={(xMax - xMin) * 10 * zoom}>
        {data && this.renderPolygons()}
        <Grid
          xMin={xMin}
          xMax={xMax}
          yMin={yMin}
          yMax={yMax}
          gridSize={gridSize}
          zoom={zoom}
        />
        {this.renderZone()}
        {data && !extraLines && renderPoints && this.renderPoints()}
        {this.renderExtraLines()}
        {renderExtraLinePoints && this.renderExtraLinesPoints()}
        {this.renderExtraPoints()}
      </svg>
    );
  }
}

OrthonormalGrid.defaultProps = {
  gridLines: true,
  zoom: 1,
  renderPoints: true,
  renderExtraLinePoints: true,
};

export default OrthonormalGrid;
