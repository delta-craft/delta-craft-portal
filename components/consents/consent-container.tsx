import { useQuery } from "@apollo/client";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import { getConsentsQuery } from "../../src/gql/client/queries";
import { GetConsents } from "../../src/gql/client/types/GetConsents";

import { ConsentCard, ConsentReminderBox } from ".";
import { useAppContext } from "../../src/hooks";
import Paper from "@material-ui/core/Paper";
import Skeleton from "@material-ui/core/Skeleton";

const ConsentContainer: React.FC = () => {
  const { session } = useAppContext();

  const { data, loading, error, refetch } =
    useQuery<GetConsents>(getConsentsQuery);

  if (loading) {
    return (
      <div>
        {new Array(5).fill(0).map((x, i) => (
          <Paper className="px-4 py-3 my-3" key={i}>
            <Skeleton style={{ width: "25%" }} />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Paper>
        ))}
      </div>
    );
  }

  if (error) return null;

  const { consents, user } = data;

  return (
    <div className="my-3">
      {session && (
        <div className="mb-4">
          <ConsentReminderBox
            onUpdate={refetch}
            lastConsent={consents[0]?.created}
            lastConsentAccepted={user?.userConnection?.consent}
          />
        </div>
      )}
      {consents.map((x, i) => (
        <ConsentCard
          index={i}
          key={x.id}
          consent={x}
          lastConsentAccepted={user?.userConnection?.consent}
        />
      ))}
    </div>
  );
};

export default ConsentContainer;
