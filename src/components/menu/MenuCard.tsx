import React from "react";
// COMMENT: Uncomment below import statement
import { TDishes } from "../../types";

// COMMENT: Replace any[] with TDishes[]
const MenuCard: React.FC<{ data: TDishes[] }> = ({ data }) => {
  return (
    <div className="menu-card">
      {data ? (
        // COMMENT: Replace any with TDishes
        data.map((menuItem: TDishes) => (
          <div className="menu-card-item">
            <div
              style={{
                background: `url(${menuItem.image.url}) lightgray 50% / cover no-repeat`,
                height: "320px",
                alignSelf: "stretch",
              }}
            ></div>
            <div className="item-content">
              <div className="item-content-text">
                <span className="price">${menuItem.price}</span>
                <p>{menuItem.title}</p>
                <span className="description">{menuItem.description}</span>
              </div>
              <hr
                style={{
                  width: "80px",
                  height: "2px",
                  backgroundColor: "#2D00FF",
                  border: "none",
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default MenuCard;
