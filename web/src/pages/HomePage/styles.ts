import { Image, Layout } from "antd";
import { rem } from "polished";
import styled from "styled-components";

export const MainLayout = styled(Layout)`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: transparent;
`;

export const Container = styled(Layout.Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  padding: ${rem(40)} 5%;

  @media (max-width: ${rem(768)}) {
    padding: ${rem(24)} ${rem(16)};
    justify-content: flex-start;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: ${rem(900)};
`;

export const Logo = styled(Image)`
  width: ${rem(100)} !important;
  margin-bottom: ${rem(40)} !important;
  @media (max-width: ${rem(768)}) {
    margin-bottom: ${rem(32)} !important;
    width: ${rem(80)} !important;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
  width: 100%;
  max-width: ${rem(900)};
  align-items: flex-start;

  @media (max-width: 992px) {
    flex-direction: column;
    align-items: center;
    gap: 24px;
    max-width: ${rem(440)};
  }
`;
