import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Card, Input } from "antd";
import { rem } from "polished";
import styled from "styled-components";

export const CardContainer = styled(Card)`
  width: 100%;
  min-height: ${rem(360)};
  min-width: ${rem(350)};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  border: none; 

  .ant-card-body {
    padding: ${rem(24)} ${rem(32)}; 
  }

  .ant-form-item {
    margin-bottom: ${rem(24)};
  }
 
  .ant-form-item-label > label {
    font-size: ${rem(12)};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

 
  .ant-input {
    border-radius: 6px;
    padding: ${rem(8)} ${rem(12)};
    font-size: ${rem(14)};
  }

 
  @media (max-width: ${rem(768)}) {
    max-width: 90%;
    .ant-card-body {
      padding: ${rem(20)} ${rem(24)};
    }
  }
`;

export const CardTitle = styled.h2`
  font-size: ${rem(24)};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.title};
  margin-bottom: ${rem(28)};
  text-align: left;
`;

export const StyledButton = styled(Button)`
  width: 100%;
  height: ${rem(44)};
  border-radius: 6px;
  font-size: ${rem(16)};
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.brand};
  border-color: #8C9EFF;

  &:hover, &:focus {
    background-color: #7A8CFE !important;
    border-color: #7A8CFE !important;
  }
  &:disabled:hover {
    background-color: #f5f5f5 !important;
    border-color: #d9d9d9 !important;
  }
`;

export const ShortenerInput = styled(Input)`
  height: ${rem(40)} !important;
  .ant-input-outlined, .ant-input-prefix { 
    color: rgba(0, 0, 0, 0.25);
    font-weight: 400;
  }
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
