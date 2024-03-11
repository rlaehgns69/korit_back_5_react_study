/** @jsxImportSource @emotion/react */
import * as S from "./style";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

import { useMemo, useState } from 'react';
import { Link } from "react-router-dom";
import { MENUS } from "../../constants/menu";


function SideBarTop(props) {
  const [ isShow, setShow ] = useState(false);

// const menus = useMemo(() => MENUS, []);

  return (
    <aside css={S.layout(isShow)} >
      <button css={S.toggleButton} onClick={() => setShow(!isShow)}>
        {isShow ? <FaCaretUp /> : <FaCaretDown />}
      </button>
      <ul css={S.menuList}>
        {MENUS.map(menu=>
          <Link css={S.menuItem} to={`${menu.path}${!menu.params ? "": "?" + Object.entries(menu.params).map(([key, value]) => key + "=" + value).join("&")}`} key={menu.id} onClick={() => setShow(false)}>
          <li>{menu.name}</li>
          </Link>
          )
          }
      </ul>
    </aside>
  );
}

export default SideBarTop;