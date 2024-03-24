import { Helmet } from "react-helmet";

export default function CustomScripts({ children }) {
  return (
    <>
      <Helmet>{children}</Helmet>
    </>
  );
}
