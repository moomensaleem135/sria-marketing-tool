import Image from "next/image";
import React from "react";
import { Loader, StyledPreloader } from "./index.styles";

export const Loading = () => {
  return (
    <>
      <StyledPreloader>

          <Loader>
            <Image src={"/svgs/saving.svg"} width={300} height={200} />
          </Loader>

      </StyledPreloader>
    </>
  );
};
