import { createGlobalStyle } from "styled-components";

export const colors = {
  white: "#F5F5F6",
  black: "#111",
  green: "#1A5D1A",
  greenLight: "#A1EEBD",
  gray: "#E3E3E3",
  grayDark: "#797B7E",
  purple: "#4f46e5",
  yellow: "#F1C93B",
  bege: "#FDFDFD",
  red: "#7D0A0A",
  redLight: "#DC8686",
};

export const breakpoints = {
  desktop: "1024px",
  tablet: "768px",
};

export const GlobalCss = createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: Roboto, sans-serif;
      list-style: none;
    }

    body {
      background-color:  ${colors.white};
     
    }

    .container {
      max-width: 1024px;
      width: 100%;
      margin: 0 auto;

      @media (max-width: ${breakpoints.desktop}) {
        max-width: 80%;
      }
    }
`;
