import { PropsWithChildren } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

export default async function BaseLayout(props: PropsWithChildren) {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}
