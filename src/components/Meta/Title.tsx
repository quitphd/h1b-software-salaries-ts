import * as d3 from "d3";
import React, { Component } from "react";
import { IFilter, ISalary } from "../../interfaces";
import USStatesMap from "./USStatesMap";

interface IProps {
  readonly data: ISalary[];
  readonly filteredBy: IFilter;
}

class Title extends Component<IProps> {
  get yearsFragment() {
    const year = this.props.filteredBy.year;
    return year === "*" ? "" : `in ${year}`;
  }

  get stateFragment() {
    const USstate = this.props.filteredBy.USstate;
    return USstate === "*" ? "" : USStatesMap[USstate.toUpperCase()];
  }

  get jobTitleFragment () {
    const { jobTitle, year } = this.props.filteredBy;
    let title = "";
    // Did a first pass refactoring of the IF tree vs the original example, room to improve.
    if (jobTitle === '*') {
      title = "The average H1B in tech";
      const verb = (year === "*") ? "pays" : "paid";
      title = `${title} ${verb}`;
    } else {
      title = `Software ${jobTitle}s on an H1B`;
      const verb = (year === '*') ? 'make' : 'made';
      title = `${title} ${verb}`
    }

    return title;
  }

  get format() {
    const salaryExtent = d3.extent(this.props.data, d => d.base_salary) as [number, number];
    return d3
      .scaleLinear()
      .domain(salaryExtent)
      .tickFormat();
  }

  public render() {
    const mean = this.format(d3.mean(this.props.data, d => d.base_salary) as number);

    


    return <h1>Title</h1>;
  }
}

export default Title;
