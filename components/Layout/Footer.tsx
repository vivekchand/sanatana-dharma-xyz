import ReactGA from "react-ga";

export const initGA = () => {
  ReactGA.initialize("G-916S3MSTVF");
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
