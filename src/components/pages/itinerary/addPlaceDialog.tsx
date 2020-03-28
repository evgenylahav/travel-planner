import React from "react";


export interface AddPlaceProps {}

export interface AddPlaceState {}

export class AddPlace extends React.Component<
  AddPlaceProps,
  AddPlaceState
> {
  constructor(props: AddPlaceProps, state: AddPlaceState) {
    super(props, state);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        Add place
      </React.Fragment>
    );
  }
}
