import React, { Component } from "react";
import classnames from "classnames";
import Loading from "./Loading";
import Panel from "./Panel";
import axios from "axios";
import {
  getTotalInterviews,
  getLeastPopularTimeSlot,
  getMostPopularDay,
  getInterviewsPerDay
 } from "helpers/selectors";
const data = [
  {
    id: 1,
    label: "Total Interviews",
    getValue: getTotalInterviews
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    getValue: getLeastPopularTimeSlot
  },
  {
    id: 3,
    label: "Most Popular Day",
    getValue: getMostPopularDay
  },
  {
    id: 4,
    label: "Interviews Per Day",
    getValue: getInterviewsPerDay
  }
];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      focused: null,
      days: [],
      appointments: {},
      interviewers: {},
    };
    this.selectPanel = this.selectPanel.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(([days, appointments, interviewers]) => {
      this.setState({
        loading: false,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data
      });
      this.socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    });

    this.socket.onmessage = event => {
      const data = JSON.parse(event.data);
    
      if (typeof data === "object" && data.type === "SET_INTERVIEW") {
        this.setState(previousState =>
          setInterview(previousState, data.id, data.interview)
        );
      }
    };
  }

    componentWillUnmount() {
      if (this.socket) {
        this.socket.close();
      }
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
          value={panel.getValue(this.state)}
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
