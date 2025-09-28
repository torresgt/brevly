import { LinkOutlined } from "@ant-design/icons";
import { Button, Card, Divider } from "antd";
import { rem } from "polished";
import styled from "styled-components";

export const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  min-width: ${rem(580)};
  min-height: ${rem(234)};
  flex-grow: 1;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  border: none;
  
  .ant-card-body {
    padding: ${rem(24)} ${rem(32)};
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  
  @media (max-width: ${rem(768)}) {
    min-width: ${rem(306)} ;
    .ant-card-body {
        padding: ${rem(20)} ${rem(24)};
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: ${rem(24)};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.title};
  margin: 0;
`;

export const DownloadButton = styled(Button)`
  background-color: #f0f2f5;
  border: 1px solid #D9D9D9;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  border-radius: 6px;

  &:hover, &:focus {
    background-color: #e6e8eb !important;
    border-color: #c0c0c0 !important;
    color: ${({ theme }) => theme.colors.text} !important;
  }
  &:disabled:hover {
    background-color: #f5f5f5 !important;
    color: rgba(0, 0, 0, 0.25) !important;
    border-color: #d9d9d9 !important;
  }
`;

export const StyledDivider = styled(Divider)`
  margin: ${rem(16)} 0 ${rem(24)} 0;
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${rem(16)};
`;

export const LinkListingContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: ${rem(450)};
  overflow-y: auto;
  padding-right: ${rem(16)};
`;

export const EmptyStateIcon = styled(LinkOutlined)`
  font-size: ${rem(48)};
  color: #c0c0c0;
`;

export const EmptyStateText = styled.p`
  font-size: ${rem(14)};
  color: #a0a0a0;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin: 0;
`;
