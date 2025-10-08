export const RequestStatus = {
  IDLE: "idle",
  PENDING: "pending",
  SUCCESSFULL: "successfull",
  FAILED: "failed",
} as const;

export type RequestStatusType =
  (typeof RequestStatus)[keyof typeof RequestStatus];
