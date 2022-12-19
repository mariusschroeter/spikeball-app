import React from 'react'

const LeagueTableDropdown = ({onChange}) => {
    return (
        <>
        <div style={{ paddingTop: "20px" }}></div>
        {/* Dropdown for season */}
        Season{" "}
        <select id="season-select" onChange={() => onChange()}>
          <option value="1" key="1">
            1
          </option>
          <option value="2" key="2">
            2
          </option>
        </select>
        <div style={{ paddingTop: "10px" }}></div>
        </>
    )
}

export default LeagueTableDropdown
