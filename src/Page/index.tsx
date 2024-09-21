import "./styles.scss";

import { useMemo, useState } from "react";
import React from "react";

import Credits from "../ui-elements/Credits";
import Entries from "../ui-elements/Entries";
import Header from "../ui-elements/Header";
import Instructions from "../ui-elements/Instructions";
import Presets from "../ui-elements/Presets";
import Roulette from "../ui-elements/Roulette";
import {
  parseEntriesText,
  getEntriesFromUrl,
  saveEntriesToUrl,
} from "../utils";

const defaultEntries = "Entry 1, Entry 2, Entry 3\nEntry 4, Entry 5, Entry 6";

export default function Page() {
  const entriesFromUrl = getEntriesFromUrl() || defaultEntries;
  const [entries, setEntries] = useState<string>(entriesFromUrl);

  const parsedEntries = useMemo(() => {
    const result = parseEntriesText(entries);
    saveEntriesToUrl(result);

    return result;
  }, [entries]);

  return (
    <div className="page-container">
      <Header />
      <Entries entries={entries} setEntries={setEntries} />
      <Presets setEntries={setEntries} />
      <Instructions />
      <Roulette entries={parsedEntries} />
      <Credits />
    </div>
  );
}
