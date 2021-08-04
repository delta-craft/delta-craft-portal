import React from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
} from "@material-ui/data-grid";
import { GetPlayerPoints_player_points } from "../../src/gql/client/types/GetPlayerPoints";
import moment from "moment";
import { PointsModal } from "./points";
import { PointType } from "../../src/models/enums";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number", width: 150 },
  {
    field: "points",
    headerName: "Počet bodů",
    type: "number",
    width: 200,
  },
  {
    field: "category",
    headerName: "Kategorie",
    width: 200,
    // eslint-disable-next-line react/display-name
    renderCell: (params: GridValueGetterParams) => {
      const pointType = params.getValue(params.id, "category").toString();
      return <>{PointType[pointType]}</>;
    },
  },
  {
    field: "created",
    headerName: "Získáno",
    flex: 1,
    minWidth: 150,
    // eslint-disable-next-line react/display-name
    renderCell: (params: GridValueGetterParams) => {
      const a = params.getValue(params.id, "created").toString();
      return <>{moment(a).format("DD.MM.YYYY HH:mm")}</>;
    },
  },
  {
    field: "description",
    headerName: "Popis",
    minWidth: 300,
    flex: 2,
  },
  {
    field: "action",
    headerName: " ",
    sortable: false,
    filterable: false,
    minWidth: 150,
    flex: 0.8,
    disableColumnMenu: true,

    // eslint-disable-next-line react/display-name
    renderCell: (params: GridValueGetterParams) => {
      const id = params.getValue(params.id, "id").toString();
      return (
        <>
          <PointsModal pointId={id} />
        </>
      );
    },
  },
  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params: GridValueGetterParams) =>
  //       `${params.getValue(params.id, "firstName") || ""} ${
  //         params.getValue(params.id, "lastName") || ""
  //       }`,
  //   },
];

interface IProps {
  points: GetPlayerPoints_player_points[];
}

const PointsTable: React.FC<IProps> = ({ points }) => {
  const rows = points.map((x, i) => {
    return {
      id: x.id,
      points: x.points,
      category: x.pointType,
      created: x.created,
      description: x.description,
    };
  });

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={25}
        disableSelectionOnClick
        rowsPerPageOptions={[25, 50, 100, 200]}
      />
    </div>
  );
};

export default PointsTable;
