import { useState } from "react";
import { Icon2fa, IconDatabaseImport, IconSwitchHorizontal, IconLogout } from "@tabler/icons-react";
import classes from "./Navbar.module.css";
import Link from "next/link";

const data = [
  { link: "/", label: "Home", icon: IconDatabaseImport },
  { link: "/search", label: "Job Search", icon: Icon2fa },
];

export function Navbar() {
  const [active, setActive] = useState("Home");

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {data.map((item) => (
          <Link
            href={item.link}
            key={item.label}
            onClick={(event) => {
              setActive(item.label);
            }}
            className={classes.link}
            data-active={item.label === active || undefined}
          >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      {/** <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
          </div> **/}
    </nav>
  );
}

export default Navbar;
