import Icon from "../Icon/Icon";

export default function LoginSignupError() {
  return (
    <div className="flex flex-col items-center h-full justify-center gap-10">
      <Icon name={"MdErrorOutline"} className="w-32 h-32 text-red-600" />
      <h2 className="text-xl font-bold">خطایی رخ داده است</h2>
    </div>
  );
}
