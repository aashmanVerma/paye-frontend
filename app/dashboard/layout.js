import Top from "../components/dashboard/Top";

export default function Layout({ children }) {
    return (
      <>
      <Top />
      {children}
      </>
    )
  }