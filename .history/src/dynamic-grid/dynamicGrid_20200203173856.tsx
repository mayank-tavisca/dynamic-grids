import React, { FC } from "react";

interface IProps {
  data: any;
}

const DynamicGrid: React.FC<IProps> = ({ data }) => {
  return (
    <div>
      Dynamic Grid
      {/* {Object.keys(data).forEach(key => {
        return (
          <div>
            {key} {data[key]}
          </div>
        );
      })} */}
    </div>
  );
};

export default DynamicGrid;
