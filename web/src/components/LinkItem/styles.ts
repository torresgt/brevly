import { CheckCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { rem } from "polished";
import styled from "styled-components";

export const LinkItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${rem(16)} 0;
  width: 100%;
  
  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0; 
  }
`;

export const LinkDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ShortUrl = styled.a`
  font-size: ${rem(16)};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.brand};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const OriginalUrl = styled.p`
  font-size: ${rem(14)};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  opacity: 0.75;
`;

export const LinkActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${rem(8)};
`;

export const AccessCount = styled.span`
  font-size: ${rem(14)};
  color: ${({ theme }) => theme.colors.text};
  margin-right: ${rem(16)};
  opacity: 0.75;
`;

export const ActionButton = styled(Button)`
  border-radius: 6px;
  background-color: #f0f2f5;
  border-color: #d9d9d9;
`;

export const ToastContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const CircleOutlined = styled(CheckCircleOutlined)`
  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  width: ${rem(14)};
  height: ${rem(14)};
  border-radius: 99%;
  background-color: #80c343;
`;
