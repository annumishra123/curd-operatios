import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Button, Input, FormGroup } from "reactstrap";
import { Delete, update, updateData } from "../actions/transactionActions";

const UserList = ({
  users,
  Delete,
  setNewEditUserAction,
  update,
  newUsrEditAction,
  updateData,
}) => {
  const [process, setProcess] = useState(false);
  const [apiHitPoint, setApiHitPoint] = useState(100);
  const [pageNumber, setPageNumber] = useState(1);
  const [isEdit, setisEdit] = useState(false);

  const handleScroll = () => {
    if (apiHitPoint < window.pageYOffset) {
      setApiHitPoint(apiHitPoint + 630);
      setPageNumber(pageNumber + 1);
      updateData(pageNumber + 1);
    }
  };

  useEffect(() => {
    if (!process) {
      window.addEventListener("scroll", handleScroll, true);
      return () => {
        window.removeEventListener("scroll", handleScroll, true);
      };
    }
  }, [users, apiHitPoint, pageNumber]);

  const updateHandler = (e, i) => {
    console.log(i,"jj>>>>>>>>>>>>>>")
    if (e.target.value.length === 0) {
      setisEdit(true);
      update(e.target.value, i);
    } else {
      setisEdit(false);
      update(e.target.value, i);
    }
  };

  return (
    <ListGroup className="mt-4">
      {users.length > 0 ? (
        <>
          {users.map((user, i) => (
            <ListGroupItem className="d-flex" key={i}>
              {newUsrEditAction === i ? (
                <FormGroup>
                  <Input
                    type="text"
                    name="name"
                    value={user.name.first}
                    onChange={(e) => updateHandler(e, i)}
                    placeholder="Enter Name"
                    required
                    autoFocus
                  ></Input>
                </FormGroup>
              ) : (
                <strong>{user.name.first}</strong>
              )}

              <div className="ml-auto">
                {newUsrEditAction === i ? (
                  <Button
                    className="btn btn-warning mr-1"
                    disabled={isEdit}
                    onClick={(e) => {
                      setNewEditUserAction(false);
                    }}
                  >
                    Update
                  </Button>
                ) : (
                  <>
                    <Button
                      className="btn btn-warning mr-1"
                      onClick={() => {
                        setNewEditUserAction(i);
                        update(user.name.first, i);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => Delete(user.login.uuid)}
                      color="danger"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </ListGroupItem>
          ))}
        </>
      ) : (
        <h4 className="text-center">No User</h4>
      )}
    </ListGroup>
  );
};

const mapStateToProps = (state) => ({
  users: state.transactionReducer.users,
});

export default connect(mapStateToProps, { Delete, update, updateData })(
  UserList
);