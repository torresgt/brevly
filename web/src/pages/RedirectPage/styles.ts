import { Image, Layout } from "antd";
import { rem } from "polished";
import styled from "styled-components";

export const MainLayout = styled(Layout)`
  min-height: 100vh;
  background-color: #f0f2f5; 
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RedirectCard = styled.div`
  background-color: #ffffff;
  padding: ${rem(64)} ${rem(48)};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ErrorGraphic = styled(Image)`
  width: ${rem(177)} !important;
  margin-bottom: ${rem(32)} !important;
`;

export const LogoIcon = styled.img`
  width: 48px;
  height: 48px;
  margin-bottom: ${rem(24)};
`;

export const Title = styled.h1`
  font-size: ${rem(32)};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.title};
  margin: 0 0 ${rem(16)} 0;
`;

export const Subtitle = styled.p`
  font-size: ${rem(16)};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;

  a {
    color: ${({ theme }) => theme.colors.brand};
    font-weight: 500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const FallbackText = styled.p`
  font-size: ${rem(14)};
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${rem(32)};
`;

export const FallbackLink = styled.a`
  color: ${({ theme }) => theme.colors.brand};
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
