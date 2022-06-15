import React from "react";
import Form from "./Form";

const AddNote = ({
  setTitleInput,
  setBodyInput,
  submitForm,
  titleInput,
  bodyInput,
  limit,
  limiterInput,
  readOnly,
  readOnlyFunction,
}) => {
  return (
    <div className="add__container">
      <div className="add__wrap__container">
        <header>
          <h2>Buat Catatan</h2>
        </header>
        <Form
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
      </div>
    </div>
  );
};

export default AddNote;
