import { useQuery } from "@apollo/client";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import { getConsentsQuery } from "../../src/gql/client/queries";
import { GetConsents } from "../../src/gql/client/types/GetConsents";

import { ConsentCard, ConsentReminderBox } from ".";
import { useAppContext } from "../../src/hooks";

const ConsentContainer: React.FC = () => {
  const { session } = useAppContext();

  const { data, loading, error, refetch } =
    useQuery<GetConsents>(getConsentsQuery);

  if (loading || error) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  const { consents, getUser } = data;

  return (
    <div className="mt-3">
      {session && (
        <div className="mb-4">
          <ConsentReminderBox
            onUpdate={refetch}
            lastConsent={consents[0]?.created}
            lastConsentAccepted={getUser?.userConnections[0]?.consent}
          />
        </div>
      )}
      {consents.map((x, i) => (
        <ConsentCard
          index={i}
          key={x.id}
          consent={x}
          lastConsentAccepted={getUser?.userConnections[0]?.consent}
        />
      ))}
    </div>
  );
};

export default ConsentContainer;
