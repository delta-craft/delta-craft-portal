import React from "react";
import { GetPlayerDetail_player_points } from "../../src/gql/client/types/GetPlayerDetail";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import moment from "moment";
import { PointType } from "../../src/models/enums";
import styles from "../../styles/PointsTable.module.scss";

interface IRowData {
  point: GetPlayerDetail_player_points;
}

const Row: React.FC<IRowData> = ({ point }) => {
  const { points, pointType, id, created, description, pointTags } = point;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow className={styles.row}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {id}
        </TableCell>
        <TableCell align="right">{points}</TableCell>
        <TableCell align="right">{PointType[pointType]}</TableCell>
        <TableCell align="right">
          {moment(created).format("DD.MM.YYYY HH:mm")}
        </TableCell>
        <TableCell align="right">{description}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Detail
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Key</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pointTags.map((pointTag) => {
                    const { key, value } = pointTag;
                    return (
                      <TableRow key={pointTag.id}>
                        <TableCell component="th" scope="row">
                          {pointTag.id}
                        </TableCell>
                        <TableCell>{key}</TableCell>
                        <TableCell>{value}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

interface IProps {
  points: GetPlayerDetail_player_points[];
}

const PointsTable: React.FC<IProps> = ({ points }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID</TableCell>
            <TableCell align="right">Počet bodů</TableCell>
            <TableCell align="right">Kategorie</TableCell>
            <TableCell align="right">Získáno</TableCell>
            <TableCell align="right">Popis</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {points.map((point) => (
            <Row key={point.id} point={point} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PointsTable;
