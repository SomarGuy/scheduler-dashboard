import React, { Component } from "react";
import classnames from "classnames";
import Loading from "./Loading";
import Panel from "./Panel";

const data = [
  {
    id: 1,
    label: "Total Interviews",
    value: 6
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    value: "1pm"
  },
  {
    id: 3,
    label: "Most Popular Day",
    value: "Wednesday"
  },
  {
    id: 4,
    label: "Interviews Per Day",
    value: "2.3"
  }
];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      focused: null
    };
    this.selectPanel = this.selectPanel.bind(this);
  }

  componentDidMount() {
    //code
  }

  componentDidUpdate() {
    //code
  }

  selectPanel(id) {
    this.setState(prevState => ({
      focused: prevState.focused === id ? null : id
    }));
  }

  render() {
    const dashboardClasses = classnames("dashboard", {
      focused: this.state.focused !== null
    });

    if (this.state.loading) {
      return <Loading />;
    }

    const filteredData = this.state.focused
      ? data.filter(panel => panel.id === this.state.focused)
      : data;

      const panels = filteredData.map(panel => (
        <Panel
          key={panel.id}
          label={panel.label}
          value={panel.value}
          onSelect={() => this.selectPanel(panel.id)}
        />
      ));

    return (
      <main className={dashboardClasses}>
        {panels}
      </main>
    );
  }
}

export default Dashboard;
