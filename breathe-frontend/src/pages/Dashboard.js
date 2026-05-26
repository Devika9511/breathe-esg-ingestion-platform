import {
  useEffect,
  useState
} from "react";

import API from "../services/api";

function Dashboard() {

  const [records, setRecords] =
    useState([]);

  const [filterSource, setFilterSource] =
    useState("ALL");

  useEffect(() => {

    fetchRecords();

  }, []);

  const fetchRecords = async () => {

    try {

      const response = await API.get(
        "records/"
      );

      setRecords(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const approveRecord = async (id) => {

    try {

      await API.patch(
        `approve/${id}/`
      );

      fetchRecords();

    } catch (error) {

      console.log(error);
    }
  };

  const filteredRecords =
    filterSource === "ALL"

      ? records

      : records.filter(
          (record) =>
            record.source_type ===
            filterSource
        );

  const approvedCount =
    filteredRecords.filter(
      (r) =>
        r.status === "APPROVED"
    ).length;

  const pendingCount =
    filteredRecords.filter(
      (r) =>
        r.status === "PENDING"
    ).length;

  const flaggedCount =
    filteredRecords.filter(
      (r) => r.is_flagged
    ).length;

  const totalEmissions =
    filteredRecords.reduce(
      (sum, r) =>
        sum +
        Number(
          r.co2e_emissions || 0
        ),
      0
    );

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#eef5ff",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >

      <h1
        style={{
          color: "#173b7a",
          marginBottom: "30px",
        }}
      >
        ESG Analyst Dashboard
      </h1>

      {/* SUMMARY CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >

        <div
          style={cardStyle}
        >
          <h2>Total Records</h2>

          <p
            style={numberStyle}
          >
            {
              filteredRecords.length
            }
          </p>
        </div>

        <div
          style={cardStyle}
        >
          <h2>Approved</h2>

          <p
            style={numberStyle}
          >
            {approvedCount}
          </p>
        </div>

        <div
          style={cardStyle}
        >
          <h2>Pending</h2>

          <p
            style={numberStyle}
          >
            {pendingCount}
          </p>
        </div>

        <div
          style={cardStyle}
        >
          <h2>Flagged</h2>

          <p
            style={numberStyle}
          >
            {flaggedCount}
          </p>
        </div>

      </div>

      {/* TOTAL EMISSIONS */}

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "25px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >

        <h2
          style={{
            color: "#173b7a",
          }}
        >
          Total CO₂e Emissions
        </h2>

        <h1
          style={{
            color: "#2f65d9",
          }}
        >
          {totalEmissions.toFixed(2)} kg CO₂e
        </h1>

      </div>

      {/* FILTER */}

      <div
        style={{
          marginBottom: "20px",
        }}
      >

        <select
          value={filterSource}
          onChange={(e) =>
            setFilterSource(
              e.target.value
            )
          }
          style={{
            padding: "10px",
            borderRadius: "8px",
            border:
              "1px solid #ccc",
            fontSize: "16px",
          }}
        >

          <option value="ALL">
            All Sources
          </option>

          <option value="SAP">
            SAP
          </option>

          <option value="UTILITY">
            Utility
          </option>

          <option value="TRAVEL">
            Travel
          </option>

        </select>

      </div>

      {/* TABLE */}

      <div
        style={{
          overflowX: "auto",
        }}
      >

        <table
          style={{
            width: "100%",
            borderCollapse:
              "collapse",
            backgroundColor:
              "white",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >

          <thead
            style={{
              backgroundColor:
                "#2f65d9",
              color: "white",
            }}
          >

            <tr>

              <th style={thStyle}>
                Source
              </th>

              <th style={thStyle}>
                Category
              </th>

              <th style={thStyle}>
                Scope
              </th>

              <th style={thStyle}>
                Amount
              </th>

              <th style={thStyle}>
                Unit
              </th>

              <th style={thStyle}>
                Factor
              </th>

              <th style={thStyle}>
                CO₂e
              </th>

              <th style={thStyle}>
                Status
              </th>

              <th style={thStyle}>
                Validation
              </th>

              <th style={thStyle}>
                Analyst Note
              </th>

              <th style={thStyle}>
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredRecords.map(
              (record) => (

                <tr
                  key={record.id}
                  style={{
                    backgroundColor:
                      record.is_flagged
                        ? "#ffe5e5"
                        : "white",
                  }}
                >

                  <td style={tdStyle}>
                    {
                      record.source_type
                    }
                  </td>

                  <td style={tdStyle}>
                    {
                      record.category
                    }
                  </td>

                  <td style={tdStyle}>
                    {
                      record.scope
                    }
                  </td>

                  <td style={tdStyle}>
                    {
                      record.amount
                    }
                  </td>

                  <td style={tdStyle}>
                    {record.unit}
                  </td>

                  <td style={tdStyle}>
                    {
                      record.emission_factor
                    }
                  </td>

                  <td style={tdStyle}>
                    {
                      record.co2e_emissions
                    }
                  </td>

                  <td
                    style={{
                      ...tdStyle,
                      color:
                        record.status ===
                        "APPROVED"

                          ? "green"

                          : "orange",
                      fontWeight:
                        "bold",
                    }}
                  >
                    {
                      record.status
                    }
                  </td>

                  <td
                    style={{
                      ...tdStyle,
                      color:
                        record.is_flagged
                          ? "red"
                          : "green",
                      fontWeight:
                        "bold",
                    }}
                  >

                    {record.is_flagged
                      ? "Suspicious"
                      : "Valid"}

                  </td>

                  <td style={tdStyle}>
                    {record.analyst_note
                      || "-"}
                  </td>

                  <td style={tdStyle}>

                    {record.status ===
                    "PENDING" ? (

                      <button
                        onClick={() =>
                          approveRecord(
                            record.id
                          )
                        }
                        style={{
                          backgroundColor:
                            "#2f65d9",
                          color:
                            "white",
                          border: "none",
                          padding:
                            "10px 18px",
                          borderRadius:
                            "8px",
                          cursor:
                            "pointer",
                          fontWeight:
                            "bold",
                        }}
                      >
                        Approve
                      </button>

                    ) : (

                      <span
                        style={{
                          color:
                            "green",
                          fontWeight:
                            "bold",
                        }}
                      >
                        Approved
                      </span>

                    )}

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

const cardStyle = {

  background: "white",

  padding: "20px",

  borderRadius: "12px",

  textAlign: "center",

  boxShadow:
    "0 2px 10px rgba(0,0,0,0.08)",
};

const numberStyle = {

  fontSize: "32px",

  fontWeight: "bold",

  color: "#2f65d9",
};

const thStyle = {

  padding: "16px",

  textAlign: "left",
};

const tdStyle = {

  padding: "16px",

  borderBottom:
    "1px solid #ddd",
};

export default Dashboard;