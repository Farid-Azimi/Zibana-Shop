import Icon from "../Icon/Icon";

export default function Successful({ login }: { login: boolean }) {
  return (
    <div className="flex flex-col items-center h-full justify-center gap-10">
      <Icon
        name={"IoIosCheckmarkCircle"}
        className="w-32 h-32 text-green-600"
      />
      <h2 className="text-xl font-bold">
        {login ? "با موفقیت وارد شدید" : "ثبت نام با موفقیت انجام شد"}
      </h2>
    </div>
  );
}
