/**
 * Using string enums instead of numeric enums offers several advantages:
 * Readability, Maintainability, Debugging,
 * Type Safety, Integration, Avoiding Magic Numbers and
 * Better tooling
 */
export enum OrderStatus {
    AWAITING_PAYMENT = 'AWAITING_PAYMENT',
    AWAITIN_DELIVERY = 'AWAITIN_DELIVERY',
    IN_TRANSIT = 'IN_TRANSIT',
    DELIVERED = 'DELIVERED',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
  }