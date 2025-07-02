import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";

const page = async () => {
  const token = await getCookie("token", { cookies });
  console.log(token, "tokentoken");
  return <div>this is a protected page</div>;
};

export default page;
