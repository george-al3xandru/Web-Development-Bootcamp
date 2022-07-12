import React from "react";
import Entry from "./Entry";
import emojis from "../emojipedia";

function CreateEntry(emoji) {
  return (
    <Entry
      key={emoji.id}
      icon={emoji.emoji}
      name={emoji.name}
      description={emoji.meaning}
    />
  );
}

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>
      <dl className="dictionary">{emojis.map(CreateEntry)}</dl>
    </div>
  );
}

export default App;
