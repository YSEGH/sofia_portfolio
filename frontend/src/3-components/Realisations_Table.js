import React from "react";
import MaterialTable from "material-table";

const data = [
  {
    title: "Mehmet",
    type: "Baran",
    statut: "Terminé",
  },
  {
    title: "Mehmet",
    type: "Baran",
    statut: "Terminé",
  },
  {
    title: "Mehmet",
    type: "Baran",
    statut: "Terminé",
  },
  {
    title: "Mehmet",
    type: "Baran",
    statut: "Terminé",
  },
  {
    title: "Mehmet",
    type: "Baran",
    statut: "Terminé",
  },
  {
    title: "Mehmet",
    type: "Baran",
    statut: "Terminé",
  },
];

export default function Realisations_Table() {
  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        title="Mes réalisations"
        options={{
          exportButton: false,
          pageSize: 5,
        }}
        style={{ boxShadow: "none", margin: "3rem auto", fontWeight: "200" }}
        columns={[
          { title: "Titre", field: "title" },
          { title: "Type", field: "type" },
          { title: "Statut", field: "statut" },
        ]}
        data={data}
      />
    </div>
  );
}
