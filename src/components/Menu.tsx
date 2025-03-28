import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "user"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin"],
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/signin",
        visible: ["admin", "user"],
      },
    ],
  },
];

const Menu = ({
  role,
  onNavigate,
}: {
  role: string;
  onNavigate: (url: string) => void;
}) => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  onClick={() => onNavigate(item.href)}
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
