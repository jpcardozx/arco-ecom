/**
 * ARCO Audit Log Service
 * For tracking admin actions within the application
 */

import { mongodbService } from './mongodb';
import { AuthUser } from './auth';

export type AuditAction = 
  | 'CREATE_PRODUCT'
  | 'UPDATE_PRODUCT'
  | 'DELETE_PRODUCT'
  | 'IMPORT_PRODUCT';

export interface LogDetails {
  user: AuthUser;
  action: AuditAction;
  target: {
    id: string;
    type: 'product';
  };
  changes?: any;
}

class AuditLogService {
  /**
   * Logs an administrative action to the database.
   * @param details - The details of the action to log.
   */
  async logAction(details: LogDetails): Promise<void> {
    try {
      const auditLogsCollection = await mongodbService.getAuditLogsCollection();
      
      const logEntry = {
        timestamp: new Date(),
        userId: details.user.userId,
        userName: details.user.name || details.user.email, // Fallback to email if name is not present
        action: details.action,
        targetId: details.target.id,
        targetType: details.target.type,
        changes: details.changes,
      };

      await auditLogsCollection.insertOne(logEntry);
    } catch (error) {
      console.error('❌ Failed to write to audit log:', error);
      // We don't re-throw the error because logging failure should not
      // break the primary user-facing operation.
    }
  }
}

export const auditLogService = new AuditLogService();
