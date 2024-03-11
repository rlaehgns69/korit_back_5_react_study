import { css } from "@emotion/react";

export const albumLayout = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin: 16px;
`;

export const noPhotosText = css`
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
  color: #777;
`;