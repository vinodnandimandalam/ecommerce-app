import { Provider } from "react-redux";
import type { ReactNode } from "react";
import type { IProduct } from "../types/product";
import { createMockStore } from "./test-store";
import { RequestStatus } from "../types/request-status";
import type { RequestStatusType } from "../types/request-status";

// Wrapper component for testing with Redux store
interface TestWrapperProps {
  children: ReactNode;
  products?: IProduct[];
  status?: RequestStatusType;
}

export const TestWrapper = ({
  children,
  products = [],
  status = RequestStatus.SUCCESSFULL,
}: TestWrapperProps) => {
  const store = createMockStore(products, status);
  return <Provider store={store}>{children}</Provider>;
};
