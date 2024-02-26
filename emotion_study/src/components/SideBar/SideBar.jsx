/** @jsxImportSource @emotion/react */
import * as S from "./style";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MENUS } from "../../constants/menu";
// import { layout, toggleButton } from "./style";



function SideBar(props) {
  const [ isShow, setShow ] = useState(false);
  
  // const menus = useMemo(() => MENUS, []);
  // useMemo MENUS 들고올 필요가 없다.

  return (
    <aside css={S.layout(isShow)}>
        <button css={S.toggleButton} onClick={() => setShow(!isShow)}>
          {isShow ? <FaCaretLeft /> : <FaCaretRight />}
        </button>
        <ul css={S.menuList} >
            {MENUS.map(menu =>
               <Link css={S.menuItem} to={menu.path} key={menu.id} onClick={() => setShow(false)}>
               <li>{menu.name}</li>
               </Link>)
            }
        </ul>
    </aside>
  );
}

export default SideBar;