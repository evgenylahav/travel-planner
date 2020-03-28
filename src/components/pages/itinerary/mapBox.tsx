import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

export interface MapBoxProps {}

export interface MapBoxState {}

export class MapBox extends React.Component<
  MapBoxProps,
  MapBoxState
> {
  constructor(props: MapBoxProps, state: MapBoxState) {
    super(props, state);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Typography
            component="div"
            style={{ backgroundColor: "red", height: "100vh" }}
          />
        </Container>
      </React.Fragment>
    );
  }
}
