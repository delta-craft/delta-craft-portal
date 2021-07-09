import React, { useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import moment from "moment";
import { GetConsents_consents } from "../../src/gql/client/types/GetConsents";
import Badge from "@material-ui/core/Badge";
import { useAppContext } from "../../src/hooks";
import Chip from "@material-ui/core/Chip";

interface IProps {
  consent: GetConsents_consents;
  lastConsentAccepted?: number;
  index?: number;
}

const ConsentCard: React.FC<IProps> = ({
  consent,
  lastConsentAccepted,
  index,
}) => {
  const last = lastConsentAccepted
    ? new Date(lastConsentAccepted)
    : new Date(2020, 1, 1);

  const [expanded, setExpanded] = useState(index === 0);

  const { session } = useAppContext();

  const { title, created, content } = consent;

  const consented = new Date(created) < last;

  return (
    <Accordion expanded={expanded} onClick={() => setExpanded(!expanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div className="d-flex">
          <Typography variant="body1">
            {title} ({moment(created).format("DD.MM.YYYY HH:mm")})
          </Typography>
          {session && (
            <Chip
              className="mx-2"
              label={consented ? "Přijato" : "Nepřijato"}
              color={consented ? "success" : "error"}
              size="small"
            />
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2">
          {content.replace(/(?:\r\n|\r|\n)/g, "\r\n")}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default ConsentCard;
