import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import Swal from "sweetalert2";

const ListNoteArsip = ({
  id,
  title,
  body,
  createdAt,
  archived,
  toggleArchived,
  deleteObject,
  search,
}) => {
  if (archived) {
    if (title.toLowerCase().search(search) != -1) {
      return (
        <article id={id} className="note__wrap">
          <div>
            <h3>{title}</h3>
            <h5>{createdAt}</h5>
            <p>{body}</p>
          </div>
          <div className="note__button__wrap">
            <button
              className="padding-10 bg-red"
              onClick={(e) => {
                Swal.fire("Hapus Berhasil", `${title}dihapus`, "success");
                deleteObject(id);
              }}
            >
              <DeleteOutlineOutlinedIcon /> &nbsp;Hapus
            </button>
            <button
              className="padding-10"
              onClick={() => {
                Swal.fire(
                  "Buka Arsip Berhasil",
                  `${title} dibuka dari arsip`,
                  "info"
                );
                toggleArchived(id);
              }}
            >
              <BookmarkRemoveOutlinedIcon />
              &nbsp;Buka Arsip
            </button>
          </div>
        </article>
      );
    }
  }
};

export default ListNoteArsip;
