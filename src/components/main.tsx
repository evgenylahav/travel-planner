import React from "react";
import { Configuration } from './pages/configuration'

export type MainProps = {
  currentTime: number;
};

export class Main extends React.Component<MainProps, {}> {
  constructor(props: MainProps, state: any) {
    super(props);
  }

  render() {
    const { currentTime } = this.props;
    return (
      <header className="App-header">
        <p>The current time is: {currentTime}</p>
        <Configuration />
      </header>
    );
  }
}
