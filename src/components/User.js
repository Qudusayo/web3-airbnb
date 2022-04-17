import React from "react";
import { Icon, Modal, Card } from "web3uikit";
import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";

function User({ account }) {
  // This handles the modal visibility
  const [isVisible, setVisible] = useState(false);
  const { Moralis } = useMoralis();
  const [userRentals, setUserRentals] = useState();

  useEffect(() => {
    async function fetchRentals() {
      // This queries our database to get bookings based on the account prop
      const Rentals = Moralis.Object.extend("newBookings");
      const query = new Moralis.Query(Rentals);
      query.equalTo("booker", account);
      const result = await query.find();

      // This sets the result from the db to the userRentals state
      setUserRentals(result);
    }

    fetchRentals();
  }, [isVisible]);

  return (
    <>
      {/* This triggers the modal to open */}
      <div onClick={() => setVisible(true)}>
        <Icon fill="#000000" size={24} svg="user" />
      </div>
      {/* This is our modal. We need to get it filled */}
      <Modal
        onCloseButtonPressed={() => setVisible(false)}
        hasFooter={false}
        title="Your Stays"
        isVisible={isVisible}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {/* The content here conditionally renders if we have userRentals */}
          {userRentals &&
            userRentals.map((e) => {
              return (
                <div style={{ width: "200px" }}>
                  <Card
                    isDisabled
                    title={e.attributes.city}
                    description={`${e.attributes.datesBooked[0]} for ${e.attributes.datesBooked.length} Days`}
                  >
                    <div>
                      <img width="180px" src={e.attributes.imgUrl} />
                    </div>
                  </Card>
                </div>
              );
            })}
        </div>
      </Modal>
    </>
  );
}

export default User;
