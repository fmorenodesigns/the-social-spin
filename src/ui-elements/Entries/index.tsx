import "./styles.scss";

import React, { useState } from "react";

import { setUrlParam } from "../../utils";
import Tooltip from "../Tooltip";

import { copyToClipboard } from "./utils";

interface Props {
  entries: string;
  setEntries: React.Dispatch<React.SetStateAction<string>>;
  parsedEntries: string[];
}

export default function Entries({ entries, setEntries, parsedEntries }: Props) {
  const [copied, setCopied] = useState<boolean>(false);

  const saveLink = async () => {
    setUrlParam("entries", parsedEntries.join(","));

    const copySuccess = await copyToClipboard(window.location.href);
    setCopied(copySuccess);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="entries">
      <p className="entries-title">Entries</p>
      <div className="textarea-container">
        <textarea
          name="entries"
          cols={30}
          rows={3}
          value={entries}
          onChange={(event) => setEntries(event.currentTarget.value)}
        />
        <Tooltip
          placement="left"
          content={
            copied
              ? "Link copied to clipboard."
              : "Save a link with these entries."
          }
          className="share-button"
          onClick={saveLink}
        >
          <i className="far fa-copy"></i>
        </Tooltip>
      </div>
    </div>
  );
}
