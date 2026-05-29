import { formatRoleText } from "../utils/typography";

/** Роль: строчные + аббревиатуры; шрифт Alumni Sans, не SC */
function RoleText({ children, className = "" }) {
  const text =
    children == null || children === ""
      ? ""
      : formatRoleText(String(children));
  return <span className={`role-text ${className}`.trim()}>{text}</span>;
}

export default RoleText;
