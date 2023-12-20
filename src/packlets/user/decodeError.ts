import { ErrorCode } from '$bank/constants'

export const decodeError = (error: ErrorCode) => {
  switch (error) {
    case ErrorCode.InsufficientFunds:
      return 'Insufficient funds'
    case ErrorCode.InsufficientBanknotes:
      return 'Not enough banknotes to withdraw'
    case ErrorCode.CombinationNotFound:
      return 'No possible combinations'
  }
}
