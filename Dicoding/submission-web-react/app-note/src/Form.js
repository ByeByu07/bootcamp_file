import React from "react";

const Form = ({
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
    <section className="form__container">
      <form onSubmit={submitForm}>
        <article>
          <label htmlFor="titleInput" className="float-left">
            Sisa karakter : {limit}
          </label>
          <input
            type="text"
            name="titleInput"
            id="titleInput"
            className="padding-10"
            onChange={(e) => {
              setTitleInput(e.target.value);
              limiterInput(e.target.value.length);
              readOnlyFunction();
            }}
            value={titleInput}
            readOnly={readOnly}
            required
          />
        </article>
        <article>
          <label htmlFor="bodyInput"></label>
          <textarea
            name="bodyInput"
            id="bodyInput"
            onChange={(e) => setBodyInput(e.target.value)}
            value={bodyInput}
            required
          ></textarea>
        </article>
        <input
          type="submit"
          value="Buat"
          id="buttonInput"
          className="bg-yellow padding-10"
        />
      </form>
    </section>
  );
};

export default Form;
