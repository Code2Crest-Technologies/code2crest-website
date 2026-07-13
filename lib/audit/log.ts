import type { AuditLogAction, Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";

type AuditInput = {
  action: AuditLogAction;
  actorId?: string | null;
  companyId?: string | null;
  entityType?: string | null;
  entityId?: string | null;
  metadata?: Prisma.InputJsonValue;
  ip?: string | null;
  userAgent?: string | null;
};

export async function createAuditLog(input: AuditInput) {
  return prisma.auditLog.create({
    data: {
      action: input.action,
      actorId: input.actorId ?? null,
      companyId: input.companyId ?? null,
      entityType: input.entityType ?? null,
      entityId: input.entityId ?? null,
      metadata: input.metadata ?? undefined,
      ip: input.ip ?? null,
      userAgent: input.userAgent ?? null,
    },
  });
}

