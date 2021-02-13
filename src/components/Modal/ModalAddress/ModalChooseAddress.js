import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../../assets/colors.module.css";
import text from "../../../assets/text.module.css";
import classname from "../../../helpers/classJoiner";
import "./ModalChooseAddress.css";
import { API } from "../../../utility/Auth";
import axios from "axios";

const ModalChooseAddress = (props) => {
  const [changeAddress, setChangeAddress] = useState([]);
  const [idAddress, setIdAddress] = useState([]);

  const token = useSelector((state) => state.auth.data.token);

  const getAddressUser = async () => {
    await axios
      .get(`${API}/address`, {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      })
      .then((res) => {
        const address = res.data.data;
        setChangeAddress(address);
        const id = res.data.data.id_address;
        setIdAddress(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAddressUser(idAddress);
  }, [idAddress]);

  return (
    <Modal
      {...props}
      size="lg"

      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="no-border" />
      <Modal.Body className="no-border">
        <div className="container-modal">
          <div>
            <h4 className="text-top">Choose another address</h4>
          </div>
          <div className="add-address" onClick={props.showAddAddress} closeButton>
            <h4 className={classname(colors.grayText, "text-add-addres")}>
              Add new address
            </h4>
          </div>
          {changeAddress &&
            changeAddress.map(
              ({
                id_address,
                fullname,
                address,
                city,
                region,
                zip_code,
                country,
              }) => {
                return (
                  <div className="container-address-list" key={id_address}>
                    <p className={classname(text.text, "text-title")}>
                      {fullname}
                    </p>
                    <p className="text-addres mb-4">{`${address}, ${city}, ${region}, ${zip_code}, ${country}`}</p>
                    <Link to={{
                      pathname: `/checkout/${id_address}`,
                      changeAddress
                    }}>
                      <button
                        className={classname(
                          colors.primaryText,
                          text.text,
                          "text-title"
                        )}
                      >
                        Change address
                      </button>
                    </Link>
                  </div>
                );
              }
            )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalChooseAddress;
