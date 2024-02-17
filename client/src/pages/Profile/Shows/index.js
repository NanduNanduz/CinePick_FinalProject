import { Button, Modal, modal } from "antd";
import React from "react";

function Shows({ openShowsModal, setOpenShowsModal, theatre }) {
  const [view, setView] = React.useState("table");
  return (
    <Modal
      title=" "
      open={openShowsModal}
      onCancel={() => setOpenShowsModal(false)}
      width={1000}
      footer={null}
    >
      <h1 className="text-primary text-md uppercase">
        Theatre : {theatre.name}
      </h1>
      <hr />
      <div className="flex justify-end mt-1">
        <Button
          varient="outlined"
          title="Add Show"
          onClick={() => {
            setView("form");
          }}
        />
      </div>
    </Modal>
  );
}

export default Shows;
