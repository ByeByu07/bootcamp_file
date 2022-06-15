import "./App.css";
import React, { useState } from "react";
import Arsip from "./Arsip";
import Navbar from "./Navbar";
import AddNote from "./AddNote";
import ListNote from "./ListNote";
import ListNoteArsip from "./ListNoteArsip";
import { getInitialData, showFormattedDate } from "./data";
import Swal from "sweetalert2";

// const Note = getInitialData();

function App() {
  // const [load, setLoad] = useState(true);
  const [ArsipScreen, setArsipScreen] = useState(false);
  const [limit, setLimit] = useState(50);
  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [archivedInput, setArchivedInput] = useState(false);
  const [Note, setNote] = useState(getInitialData());
  const [search, setSearch] = useState("");
  const [readOnly, setReadOnly] = useState(false);

  const readOnlyFunction = () => {
    if (limit == 0) {
      setReadOnly(true);
    }
  };
  const submitForm = (e) => {
    e.preventDefault();
    const formData = {
      id: +new Date(),
      title: titleInput,
      body: bodyInput,
      archived: archivedInput,
      createdAt: new Date().toISOString(),
    };
    Note.push(formData);
    setTitleInput("");
    setBodyInput("");
    setLimit(50);
    setReadOnly(false);
    Swal.fire(
      "Data Berhasil Ditambahkan",
      `${titleInput} ditambahkan`,
      "success"
    );
  };

  const toggleArchived = (id) => {
    const index = Note.findIndex((note) => note.id === id);
    const find = Note.find((note) => note.id === id);

    let oldNote = [...Note];

    if (!find.archived) {
      oldNote[index].archived = true;
      setNote(oldNote);
    } else {
      oldNote[index].archived = false;
      setNote(oldNote);
    }
  };

  const deleteObject = (id) => {
    const filter = Note.filter((note) => note.id != id);
    setNote(filter);
  };

  const limiterInput = (lenght) => {
    if (lenght >= 50) {
      setLimit(0);
    } else {
      setLimit(50 - lenght);
    }
  };

  if (ArsipScreen) {
    return (
      <main>
        <Navbar
          valueNavbar={false}
          setArsipScreen={setArsipScreen}
          textNavbar={"Kembali"}
          setSearch={setSearch}
        />
        <Arsip />
        <section className="listnote__container">
          {Note.map((note) => (
            <ListNoteArsip
              key={note.id}
              {...note}
              toggleArchived={toggleArchived}
              deleteObject={deleteObject}
              search={search}
            />
          ))}
        </section>
      </main>
    );
  } else {
    return (
      <main>
        <Navbar
          setArsipScreen={setArsipScreen}
          valueNavbar={true}
          textNavbar={"Arsip"}
          setSearch={setSearch}
        />
        <AddNote
          titleInput={titleInput}
          bodyInput={bodyInput}
          setTitleInput={setTitleInput}
          setBodyInput={setBodyInput}
          submitForm={submitForm}
          limit={limit}
          limiterInput={limiterInput}
          readOnly={readOnly}
          readOnlyFunction={readOnlyFunction}
        />
        <section className="listnote__container">
          {Note.map((note) => (
            <ListNote
              key={note.id}
              {...note}
              toggleArchived={toggleArchived}
              deleteObject={deleteObject}
              search={search}
            />
          ))}
        </section>
      </main>
    );
  }
}

export default App;
