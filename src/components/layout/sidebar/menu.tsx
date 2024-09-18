import Dashboard from "../../../../public/svgs/dashboard.svg";
import DashboardActive from "../../../../public/svgs/Dashboard-active.svg";

import { SvgDiv } from "./index.styles";

export const MenuITEMS = [
  {
    title: "Dashboard",
    icon: (
      <SvgDiv>
        <Dashboard />
      </SvgDiv>
    ),
    icon1: (
      <SvgDiv>
        <DashboardActive />
      </SvgDiv>
    ),
    page: "dashboard",
    path: "/dashboard",
  },
];
