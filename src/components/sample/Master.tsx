import React, { useEffect, useState } from "react";
import axios from "axios";
import { Quiz } from "./Quiz";
interface IProps {
  selectedValue: unknown;
}

export function Master(props: IProps) {
  if (props.selectedValue === "quiz") {
    return <Quiz />;
  } else {
    return <>Create todo</>;
  }
  //   console.log({ props });

  //   return <div>Master</div>;
}
