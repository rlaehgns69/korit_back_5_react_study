/** @jsxImportSource @emotion/react */
import { FaCaretRight } from "react-icons/fa";
import { layout } from "./style";



function SideBar(props) {
  return (
    <aside css={layout}>
        <button><FaCaretRight /></button>
    </aside>
  );
}

export default SideBar;