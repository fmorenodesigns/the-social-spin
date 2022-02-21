import "./styles.scss";

import { useMemo, useState } from "react";

import Entries from "../ui-elements/Entries";
import Header from "../ui-elements/Header";
import Instructions from "../ui-elements/Instructions";
import Roulette from "../ui-elements/Roulette";
import { cleanEntriesList, getUrlParam } from "../utils";
import Credits from "../ui-elements/Credits";

const defaultEntries = "Entry 1, Entry 2, Entry 3\nEntry 4, Entry 5, Entry 6";

export default function Page() {
  const entriesFromUrl = getUrlParam("entries") || defaultEntries;
  const [entries, setEntries] = useState<string>(entriesFromUrl);

  const parsedEntries = useMemo(() => {
    return cleanEntriesList(entries.replace(/\n/g, ",").split(","));
  }, [entries]);

  return (
    <div className="page-container">
      <Header />
      <Entries
        entries={entries}
        setEntries={setEntries}
        parsedEntries={parsedEntries}
      />
      <Instructions />
      <Roulette entries={parsedEntries} />
      <Credits />
    </div>
  );
}
