import React, { useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import moment from "moment";
import { GetConsents_consents } from "../../src/gql/client/types/GetConsents";
import { useAppContext } from "../../src/hooks";
import Chip from "@material-ui/core/Chip";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {
  NormalComponents,
  SpecialComponents,
} from "react-markdown/src/ast-to-react";

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

  const components: Partial<NormalComponents & SpecialComponents> = {};

  return (
    <Accordion expanded={expanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="d-flex align-items-baseline">
          <Typography variant="body1">{title}</Typography>

          <Typography variant="body2">
            &nbsp; ({moment(created).format("DD.MM.YYYY")})
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
          <ReactMarkdown
            plugins={[gfm]}
            className="consent-markdown"
            components={components}
          >
            {content}
          </ReactMarkdown>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default ConsentCard;
