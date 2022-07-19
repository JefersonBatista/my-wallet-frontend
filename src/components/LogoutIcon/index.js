import { LogoutIconStyle } from "./style";
import logoutIcon from "../../icons/logout.svg";

export default function LogoutIcon({ onClick: logout }) {
  return <LogoutIconStyle src={logoutIcon} alt="logout" onClick={logout} />;
}
