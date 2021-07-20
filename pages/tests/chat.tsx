import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layout";
import { MetaHead } from "../../components/meta-head";
import TextField from "@material-ui/core/TextField";
import resolveMessage, { IWitResponse } from "../../src/utils/wit-client";
import LinearProgress from "@material-ui/core/LinearProgress";

const Page: React.FC = () => {
  const [res, setRes] = useState<IWitResponse>(null);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const onKeyDown = async (event) => {
    if (event.code === "Enter") await resolveM();
  };

  const resolveM = async () => {
    if (message.length < 1) return;
    setSending(true);
    setMessage("");

    const r = await resolveMessage(message.trim());
    setSending(false);
    setRes(r);
    console.log(r);
  };

  return (
    <Layout>
      <MetaHead title="Test Chat | DeltaCraft" />
      <div className="container py-5">
        <TextField
          label="Chat field"
          variant="standard"
          helperText="Enter to send"
          fullWidth
          value={message}
          onKeyDown={onKeyDown}
          onChange={(event) => setMessage(event.target.value)}
        />
        {sending && <LinearProgress className="my-2" />}
        {res && (
          <div className="my-5 d-flex flex-column">
            <div>Text: {res.text}</div>
            {res.traits?.positivity?.length > 0 && (
              <div>
                Positivity: {res.traits?.positivity[0]?.value?.toString() ?? ""}{" "}
                (conf: {res.traits?.positivity[0]?.confidence?.toString() ?? ""}
                )
              </div>
            )}
            <div>
              Entities:{" "}
              {res.entities["blacklist:blacklist"]
                ?.map((x, i) => `${x?.value} (conf: ${x?.confidence})`)
                .join(", ")}{" "}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Page;
